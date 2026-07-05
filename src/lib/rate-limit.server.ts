// Simple in-memory rate limiter for Cloudflare Workers.
// Uses a sliding-window counter keyed by client IP.
// Limits reset naturally as entries expire from the map.

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 20; // max requests per window per IP

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

// Periodically prune expired entries to prevent unbounded growth
let lastPrune = Date.now();
const PRUNE_INTERVAL_MS = 300_000; // 5 minutes

function prune() {
  const now = Date.now();
  if (now - lastPrune < PRUNE_INTERVAL_MS) return;
  lastPrune = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

/**
 * Returns null if the request is within limits, or a Response (429) if over.
 */
export function checkRateLimit(ip: string): Response | null {
  prune();
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return null;
  }

  entry.count++;
  if (entry.count > MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfter),
      },
    });
  }

  return null;
}
