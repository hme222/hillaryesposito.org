// Vercel Node function for "Ask about the work". Thin adapter: everything
// testable lives in src/ask/server/askHandler.ts. The API key is read by the
// SDK from ANTHROPIC_API_KEY (a Vercel environment variable) and never leaves
// this process.
import type { IncomingMessage, ServerResponse } from "node:http";
import Anthropic from "@anthropic-ai/sdk";
import { createAskHandler } from "../src/ask/server/askHandler";

let client: Anthropic | null = null;

const handle = createAskHandler({
  getClient: () => {
    if (!process.env.ANTHROPIC_API_KEY) return null;
    if (!client) client = new Anthropic({ timeout: 15_000, maxRetries: 1 });
    return client;
  },
});

type VercelRequest = IncomingMessage & { body?: unknown };

async function readBody(req: VercelRequest): Promise<unknown> {
  if (req.body !== undefined) return req.body;
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw || undefined;
}

function clientIp(req: IncomingMessage): string {
  const forwarded = req.headers["x-forwarded-for"];
  const first = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(",")[0]?.trim();
  return first || req.socket?.remoteAddress || "unknown";
}

export default async function handler(req: VercelRequest, res: ServerResponse): Promise<void> {
  const result = await handle({
    method: req.method ?? "GET",
    body: req.method === "POST" ? await readBody(req) : undefined,
    ip: clientIp(req),
  });
  res.statusCode = result.status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(result.body));
}
