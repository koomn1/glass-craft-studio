import { createFileRoute } from "@tanstack/react-router";

import { checkRateLimit, getClientIp } from "../../lib/rate-limit.server";

const SYSTEM_PROMPT = `You are the AI assistant for Dr. Youssef Badawy's portfolio website.
Youssef is a veterinary doctor and developer working at the intersection of veterinary medicine and AI/software.
His portfolio covers three areas:
1. Veterinary Medicine — small animal clinic work, diagnostic imaging, emergency care, preventive medicine, research, and bilingual (Arabic/English) education.
2. AI & Development — LLM/RAG clinical assistants, a React/TanStack practice dashboard, an ONNX image triage model, n8n workflow automation, a Neo4j knowledge graph, and WebGPU edge-inference demos.
3. Video & Interactive — short clinical videos, a "behind the surgery" film series, a Vet × Tech podcast, and field notes.

Contact: WhatsApp +20 101 899 5002, email yo01009950871@gmail.com, Telegram @DR_Youssef_Badawy, Instagram @youssef_mo7ammed_02, TikTok @youssef_m_badawy.

Be warm, concise, and helpful. Use light markdown. Keep answers under 120 words unless asked for detail.`;

// Validation constants
const MAX_MESSAGE_LENGTH = 2000; // max chars per individual message
const MAX_MESSAGES = 20; // max messages in conversation history
const ALLOWED_ROLES = new Set(["user", "assistant"]);

function isValidMessage(msg: unknown): msg is { role: string; content: string } {
  if (typeof msg !== "object" || msg === null) return false;
  const m = msg as Record<string, unknown>;
  return (
    typeof m.role === "string" &&
    ALLOWED_ROLES.has(m.role) &&
    typeof m.content === "string" &&
    m.content.length <= MAX_MESSAGE_LENGTH
  );
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Rate limiting
        const ip = getClientIp(request);
        const rateLimitResponse = checkRateLimit(ip);
        if (rateLimitResponse) return rateLimitResponse;

        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return new Response(JSON.stringify({ error: "AI is not configured" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Validate Content-Type
        const contentType = request.headers.get("content-type") ?? "";
        if (!contentType.includes("application/json")) {
          return new Response(JSON.stringify({ error: "Content-Type must be application/json" }), {
            status: 415,
            headers: { "Content-Type": "application/json" },
          });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (typeof body !== "object" || body === null) {
          return new Response(JSON.stringify({ error: "Invalid request body" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const { messages: rawMessages } = body as { messages?: unknown };

        if (!Array.isArray(rawMessages)) {
          return new Response(JSON.stringify({ error: "messages must be an array" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Validate and sanitize each message
        const messages = rawMessages.slice(-MAX_MESSAGES).filter(isValidMessage);

        if (messages.length === 0) {
          return new Response(JSON.stringify({ error: "No valid messages provided" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            stream: true,
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          }),
        });

        if (!upstream.ok || !upstream.body) {
          const text = await upstream.text().catch(() => "");
          return new Response(JSON.stringify({ error: "AI gateway error" }), {
            status: upstream.status >= 400 ? upstream.status : 502,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(upstream.body, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-store",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});
