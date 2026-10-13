import { createSharedLimiter } from "./sharedRateLimit";
import { createRateLimiter } from "./askHandler";

const env = { UPSTASH_REDIS_REST_URL: "https://redis.example/", UPSTASH_REDIS_REST_TOKEN: "t" };

/** A fake Redis pipeline reply: [minute, _, day, _, global, _]. */
function reply(minute: number, day: number, global: number) {
  return {
    ok: true,
    json: async () => [{ result: minute }, { result: 1 }, { result: day }, { result: 1 }, { result: global }, { result: 1 }],
  } as unknown as Response;
}

describe("createSharedLimiter", () => {
  it("is off when no Redis is configured", () => {
    expect(createSharedLimiter({ env: {} })).toBeNull();
  });

  it("allows a visitor under every limit", async () => {
    const check = createSharedLimiter({ env, fetchImpl: async () => reply(1, 1, 1) })!;
    expect(await check("1.2.3.4")).toBe("ok");
  });

  it("blocks a visitor over the per-minute or per-day limit", async () => {
    const minute = createSharedLimiter({ env, fetchImpl: async () => reply(11, 1, 1) })!;
    const day = createSharedLimiter({ env, fetchImpl: async () => reply(1, 61, 1) })!;
    expect(await minute("1.2.3.4")).toBe("client");
    expect(await day("1.2.3.4")).toBe("client");
  });

  it("stops everyone once the daily budget is spent", async () => {
    const check = createSharedLimiter({ env: { ...env, ASK_DAILY_BUDGET: "100" }, fetchImpl: async () => reply(1, 1, 101) })!;
    expect(await check("1.2.3.4")).toBe("budget");
  });

  it("keeps raw IPs out of Redis", async () => {
    let body = "";
    const check = createSharedLimiter({
      env,
      fetchImpl: async (_url, init) => {
        body = String((init as RequestInit).body);
        return reply(1, 1, 1);
      },
    })!;
    await check("203.0.113.9");
    expect(body).not.toContain("203.0.113.9");
  });

  it("fails open and logs when Redis errors or times out", async () => {
    const lines: string[] = [];
    const down = createSharedLimiter({ env, log: (l) => lines.push(l), fetchImpl: async () => { throw new Error("down"); } })!;
    const bad = createSharedLimiter({ env, log: (l) => lines.push(l), fetchImpl: async () => ({ ok: false, status: 500 }) as Response })!;
    expect(await down("a")).toBe("ok");
    expect(await bad("a")).toBe("ok");
    expect(lines).toEqual(["ask shared_limit_unavailable", "ask shared_limit_unavailable"]);
  });
});

describe("createRateLimiter memory guard", () => {
  it("keeps live limits when more than 5000 keys arrive", () => {
    let t = 0;
    const allow = createRateLimiter(() => t, { perMinute: 100, perDay: 2 });
    allow("victim");
    allow("victim"); // at the day limit
    for (let i = 0; i < 5100; i++) allow(`flood-${i}`);
    expect(allow("victim")).toBe(false);
  });
});
