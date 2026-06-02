import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are the AI assistant for Dr. Youssef Badawy's portfolio website.
Youssef is a veterinary doctor and developer working at the intersection of veterinary medicine and AI/software.
His portfolio covers three areas:
1. Veterinary Medicine — small animal clinic work, diagnostic imaging, emergency care, preventive medicine, research, and bilingual (Arabic/English) education.
2. AI & Development — LLM/RAG clinical assistants, a React/TanStack practice dashboard, an ONNX image triage model, n8n workflow automation, a Neo4j knowledge graph, and WebGPU edge-inference demos.
3. Video & Interactive — short clinical videos, a "behind the surgery" film series, a Vet × Tech podcast, and field notes.

Contact: WhatsApp +20 101 899 5002, email yo01009950871@gmail.com, Telegram @DR_Youssef_Badawy, Instagram @youssef_mo7ammed_02, TikTok @youssef_m_badawy.

Be warm, concise, and helpful. Use light markdown. Keep answers under 120 words unless asked for detail.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return new Response(JSON.stringify({ error: "AI is not configured" }), { status: 500 });
        }

        let body: { messages?: Array<{ role: string; content: string }> };
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
        }
        const messages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];

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
          return new Response(text || "AI gateway error", { status: upstream.status });
        }

        return new Response(upstream.body, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
          },
        });
      },
    },
  },
});
