// Vercel serverless function: proxies requests to the Anthropic API using a
// server-side API key, so the key is never exposed to the browser.
//
// Required environment variable (set in Vercel project settings):
//   ANTHROPIC_API_KEY = sk-ant-...
//
// Basic per-IP rate limit below is a guardrail against runaway/looping
// requests, not a substitute for a real access gate. It resets whenever this
// function cold-starts, so treat it as a soft safety net, not a hard cap.

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_PER_WINDOW = 12; // generous for classroom use

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const now = Date.now();
  globalThis.__rateLimit = globalThis.__rateLimit || new Map();
  const entry = globalThis.__rateLimit.get(ip) || { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  globalThis.__rateLimit.set(ip, entry);
  if (entry.count > MAX_PER_WINDOW) {
    res.status(429).json({ error: "Too many requests, please wait a minute and try again." });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server is missing ANTHROPIC_API_KEY. Set it in Vercel project settings." });
    return;
  }

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });
    const data = await anthropicRes.json();
    res.status(anthropicRes.status).json(data);
  } catch (e) {
    res.status(500).json({ error: "Could not reach the Anthropic API." });
  }
}
