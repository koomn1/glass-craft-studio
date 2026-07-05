import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, ArrowUp, Loader2, Square, RotateCcw, AlertCircle } from "lucide-react";
import { Reveal } from "@/components/reveal";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What does Youssef work on?",
  "Tell me about the AI projects.",
  "How can I get in touch?",
];

const markdownComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="text-primary underline underline-offset-2 hover:opacity-80"
    />
  ),
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isBlock = /language-/.test(className ?? "");
    if (!isBlock) {
      return (
        <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-[0.85em]" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className={`block font-mono text-xs leading-relaxed ${className ?? ""}`} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="my-2 overflow-x-auto rounded-xl border border-border/60 bg-foreground/[0.06] p-3"
    >
      {children}
    </pre>
  ),
};

function StreamingSkeleton() {
  return (
    <div className="glass max-w-[85%] space-y-2 rounded-2xl px-4 py-3">
      <div className="h-3 w-44 animate-pulse rounded bg-foreground/10" />
      <div className="h-3 w-32 animate-pulse rounded bg-foreground/10" />
      <div className="h-3 w-24 animate-pulse rounded bg-foreground/10" />
    </div>
  );
}

export function AssistantSection() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastUserRef = useRef<string>("");

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function runChat(history: Msg[]) {
    setError(null);
    setLoading(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: ctrl.signal,
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
      setMessages([...history, { role: "assistant", content: "" }]);
      setStreaming(true);
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

      if (!assistant) {
        throw new Error("The assistant returned an empty response. Please try again.");
      }
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setError((e as Error).message);
      // Remove empty assistant placeholder if present
      setMessages((cur) => {
        if (cur.length && cur[cur.length - 1].role === "assistant" && !cur[cur.length - 1].content) {
          return cur.slice(0, -1);
        }
        return cur;
      });
    } finally {
      setLoading(false);
      setStreaming(false);
      abortRef.current = null;
    }
  }

  async function send(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    setInput("");
    lastUserRef.current = value;
    const next: Msg[] = [...messages, { role: "user", content: value }];
    setMessages(next);
    await runChat(next);
  }

  function stop() {
    abortRef.current?.abort();
  }

  function regenerate() {
    // Find last user message and re-run from there
    const lastUserIdx = [...messages].map((m) => m.role).lastIndexOf("user");
    if (lastUserIdx === -1) return;
    const trimmed = messages.slice(0, lastUserIdx + 1);
    setMessages(trimmed);
    runChat(trimmed);
  }

  function retry() {
    if (lastUserRef.current) {
      send(lastUserRef.current);
    }
  }

  const lastIsAssistant = messages[messages.length - 1]?.role === "assistant";

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
          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-busy={loading}
            aria-label="Conversation"
            className="max-h-[480px] min-h-[340px] space-y-4 overflow-y-auto p-6"
          >
            {messages.length === 0 && (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-5 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }}>
                  <Sparkles className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Hi — I'm trained on Youssef's portfolio. Try one of these:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="glass rounded-full px-4 py-2 text-sm transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                      m.role === "user" ? "text-primary-foreground" : "glass"
                    }`}
                    style={
                      m.role === "user"
                        ? { background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }
                        : undefined
                    }
                  >
                    {m.role === "assistant" ? (
                      m.content ? (
                        <div className="space-y-2 [&_p]:m-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold">
                          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-muted-foreground">
                          <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
                          <span className="sr-only">Assistant is typing</span>
                          …
                        </span>
                      )
                    ) : (
                      m.content
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && !lastIsAssistant && (
              <div className="flex justify-start">
                <StreamingSkeleton />
              </div>
            )}

            {error && (
              <div role="alert" className="flex items-start gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-3 text-sm">
                <AlertCircle className="mt-0.5 h-4 w-4 text-destructive" aria-hidden="true" />
                <div className="flex-1">
                  <p className="font-medium">Something went wrong</p>
                  <p className="text-muted-foreground">{error}</p>
                </div>
                <button
                  type="button"
                  onClick={retry}
                  className="glass shrink-0 rounded-full px-3 py-1.5 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          {messages.length > 0 && !loading && lastIsAssistant && (
            <div className="flex items-center justify-end gap-2 border-t border-border/60 px-4 py-2">
              <button
                type="button"
                onClick={regenerate}
                className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" /> Regenerate
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 border-t border-border/60 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the assistant…"
              aria-label="Message"
              disabled={loading}
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-60"
            />
            {streaming ? (
              <button
                type="button"
                onClick={stop}
                aria-label="Stop generating"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-foreground transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Square className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="grid h-10 w-10 place-items-center rounded-full text-primary-foreground transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowUp className="h-4 w-4" aria-hidden="true" />}
              </button>
            )}
          </form>
        </div>
      </Reveal>
    </div>
  );
}
