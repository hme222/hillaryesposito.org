// Vercel Node function for "Ask about the work". Thin adapter: everything
// testable lives in src/ask/server/askHandler.ts. The API key is read by the
// SDK from OPENAI_API_KEY (a Vercel environment variable) and never leaves
// this process.
import type { IncomingMessage, ServerResponse } from "node:http";
import OpenAI from "openai";
import { createAskHandler } from "../src/ask/server/askHandler";
import { createSharedLimiter } from "../src/ask/server/sharedRateLimit";

let client: OpenAI | null = null;

const sharedLimit = createSharedLimiter() ?? undefined;

const handle = createAskHandler({
  sharedLimit,
  getClient: () => {
    if (!process.env.OPENAI_API_KEY) return null;
    if (!client) client = new OpenAI({ timeout: 15_000, maxRetries: 1 });
    return client;
  },
});

type VercelRequest = IncomingMessage & { body?: unknown };

// A valid request is a 300-character question plus up to 8 ids, so anything
// near this size is not a real one.
const MAX_BODY_BYTES = 8 * 1024;

class BodyTooLargeError extends Error {}

async function readBody(req: VercelRequest): Promise<unknown> {
  if (req.body !== undefined) return req.body;
  const chunks: Buffer[] = [];
  let total = 0;
  for await (const chunk of req) {
    const buf = typeof chunk === "string" ? Buffer.from(chunk) : chunk;
    total += buf.length;
    if (total > MAX_BODY_BYTES) throw new BodyTooLargeError();
    chunks.push(buf);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw || undefined;
}

function clientIp(req: IncomingMessage): string {
  const forwarded = req.headers["x-forwarded-for"];
  const first = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(",")[0]?.trim();
  return first || req.socket?.remoteAddress || "unknown";
}

export default async function handler(req: VercelRequest, res: ServerResponse): Promise<void> {
  let result: { status: number; body: unknown };
  try {
    result = await handle({
      method: req.method ?? "GET",
      body: req.method === "POST" ? await readBody(req) : undefined,
      ip: clientIp(req),
    });
  } catch (error) {
    // An aborted upload or an oversized body: answer in the same shape as every
    // other failure so the client falls back to passages.
    result =
      error instanceof BodyTooLargeError
        ? { status: 413, body: { fallback: true, reason: "bad_request" } }
        : { status: 500, body: { fallback: true, reason: "unexpected" } };
  }
  res.statusCode = result.status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.end(JSON.stringify(result.body));
}
