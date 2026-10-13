// Shared rate limit for "Ask about the work". The in-memory limiter in
// askHandler.ts is per warm instance, so a script can spread across instances
// and past it. This one keeps its counters in Redis over HTTP (Upstash, or
// Vercel KV, which is Upstash underneath), so every instance sees the same
// numbers. It also enforces one daily request budget across all visitors, the
// real ceiling on OpenAI spend.
//
// No Redis configured, or Redis unreachable: it returns "ok" and the
// per-instance limiter remains the only guard. Ask never goes down because the
// limiter did.

import { createHash } from "node:crypto";
import { RATE_LIMIT } from "./askHandler";

export type SharedVerdict = "ok" | "client" | "budget";

const MINUTE_S = 60;
const DAY_S = 86_400;
const DEFAULT_DAILY_BUDGET = 500;
const TIMEOUT_MS = 1500;

type Env = Record<string, string | undefined>;

export type SharedLimitOptions = {
  env?: Env;
  fetchImpl?: typeof fetch;
  now?: () => number;
  log?: (line: string) => void;
};

/** One-way, so raw visitor IPs never sit in Redis. */
function clientKey(ip: string, salt: string): string {
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 24);
}

export function createSharedLimiter(opts: SharedLimitOptions = {}) {
  const env = opts.env ?? process.env;
  const url = (env.UPSTASH_REDIS_REST_URL ?? env.KV_REST_API_URL)?.replace(/\/$/, "");
  const token = env.UPSTASH_REDIS_REST_TOKEN ?? env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  const salt = env.ASK_HASH_SALT ?? "ask";
  const budget = Number(env.ASK_DAILY_BUDGET) > 0 ? Number(env.ASK_DAILY_BUDGET) : DEFAULT_DAILY_BUDGET;
  const doFetch = opts.fetchImpl ?? fetch;
  const now = opts.now ?? (() => Date.now());
  const log = opts.log ?? ((line: string) => console.log(line));

  return async function check(ip: string): Promise<SharedVerdict> {
    const seconds = Math.floor(now() / 1000);
    const who = clientKey(ip, salt);
    const minuteKey = `ask:m:${who}:${Math.floor(seconds / MINUTE_S)}`;
    const dayKey = `ask:d:${who}:${Math.floor(seconds / DAY_S)}`;
    const globalKey = `ask:g:${Math.floor(seconds / DAY_S)}`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await doFetch(`${url}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        // No "NX" on EXPIRE: it needs Redis 7, and on an older server the
        // option errors while INCR still succeeds, so keys would never expire.
        // Key names already change every window, so re-setting a TTL is harmless.
        body: JSON.stringify([
          ["INCR", minuteKey],
          ["EXPIRE", minuteKey, String(MINUTE_S * 2)],
          ["INCR", dayKey],
          ["EXPIRE", dayKey, String(DAY_S * 2)],
          ["INCR", globalKey],
          ["EXPIRE", globalKey, String(DAY_S * 2)],
        ]),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const out = (await res.json()) as Array<{ result?: unknown }>;
      const minuteCount = Number(out[0]?.result);
      const dayCount = Number(out[2]?.result);
      const globalCount = Number(out[4]?.result);
      if (![minuteCount, dayCount, globalCount].every(Number.isFinite)) throw new Error("bad reply");

      if (globalCount > budget) return "budget";
      if (minuteCount > RATE_LIMIT.perMinute || dayCount > RATE_LIMIT.perDay) return "client";
      return "ok";
    } catch {
      log("ask shared_limit_unavailable");
      return "ok";
    } finally {
      clearTimeout(timer);
    }
  };
}
