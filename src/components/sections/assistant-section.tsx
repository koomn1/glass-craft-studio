import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Sparkles, ArrowUp, Loader2 } from "lucide-react";
import { Reveal } from "@/components/reveal";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What does Youssef work on?",
  "Tell me about the AI projects.",
  "How can I get in touch?",
];

export function AssistantSection() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: value }];
    setMessages(next);
    setLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!resp.ok || !resp.body) {
        if (resp.status === 429) throw new Error("Rate limit reached — please try again in a moment.");
        if (resp.status === 402) throw new Error("AI credits exhausted. Add credits to continue.");
        throw new Error("Assistant is unavailable right now.");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let assistant = "";
      setMessages([...next, { role: "assistant", content: "" }]);
      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistant += delta;
              setMessages((cur) => {
                const copy = [...cur];
                copy[copy.length - 1] = { role: "assistant", content: assistant };
                return copy;
              });
            }
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      setMessages((cur) => [...cur, { role: "assistant", content: `⚠️ ${(e as Error).message}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Section 04</span>
          <h2 className="text-4xl font-semibold sm:text-5xl">
            AI <span className="text-gradient-teal">Assistant</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Ask anything about the work, the research, or how to collaborate.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="glass-strong relative overflow-hidden rounded-3xl">
          <div ref={scrollRef} className="max-h-[480px] min-h-[340px] space-y-4 overflow-y-auto p-6">
            {messages.length === 0 && (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-5 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }}>
                  <Sparkles className="h-6 w-6 text-white" />
                </span>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Hi — I'm trained on Youssef's portfolio. Try one of these:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="glass rounded-full px-4 py-2 text-sm transition-transform hover:scale-[1.03]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "text-primary-foreground"
                        : "glass"
                    }`}
                    style={
                      m.role === "user"
                        ? { background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }
                        : undefined
                    }
                  >
                    {m.role === "assistant" ? (
                      <div className="space-y-2 [&_a]:text-primary [&_a]:underline [&_code]:rounded [&_code]:bg-foreground/10 [&_code]:px-1 [&_code]:py-0.5 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5">
                        <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                      </div>
                    ) : (
                      m.content
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="glass flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 border-t border-border/60 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the assistant…"
              aria-label="Message"
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="grid h-10 w-10 place-items-center rounded-full text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </Reveal>
    </div>
  );
}
