import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "@/components/material-icons";
import { AssistantChat } from "@/components/sections/assistant-section";
import { useI18n } from "@/lib/i18n";
import { buildLeadLinks, type Lead } from "@/lib/lead";

export function AssistantWidget() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"chat" | "lead">("chat");
  const [lead, setLead] = useState<Lead>({ name: "", contact: "", need: "" });

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const ready = lead.name.trim() && lead.contact.trim() && lead.need.trim();
  const links = buildLeadLinks(lead);
  const field = "w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={ar ? "افتح مساعد يوسف" : "Open Youssef's AI assistant"}
        aria-expanded={open}
        className="fixed bottom-24 left-3 z-50 grid h-14 w-14 place-items-center rounded-full text-primary-foreground shadow-xl ring-2 ring-background/60 sm:bottom-6 sm:left-5"
        style={{ background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={ar ? "مساعد يوسف بدوي" : "Youssef Badawy AI assistant"}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="glass-strong fixed bottom-40 left-3 z-50 flex h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl sm:bottom-24 sm:left-5"
          >
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold text-primary-foreground" style={{ background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }}>YB</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{ar ? "مساعد يوسف بدوي" : "Youssef's AI assistant"}</p>
                <p className="text-xs text-muted-foreground">{ar ? "خدمات · أسعار تقريبية · طريقة الشغل" : "Services · pricing · how I work"}</p>
              </div>
            </div>
            <div className="flex gap-1 p-2">
              {(["chat", "lead"] as const).map((v) => (
                <button key={v} type="button" onClick={() => setView(v)}
                  className={`flex-1 rounded-full px-3 py-1.5 text-xs font-medium ${view === v ? "bg-primary text-primary-foreground" : "glass"}`}>
                  {v === "chat" ? (ar ? "دردشة" : "Chat") : (ar ? "ابعت ليوسف" : "Send to Youssef")}
                </button>
              ))}
            </div>
            {view === "chat" ? (
              <AssistantChat compact />
            ) : (
              <form className="flex-1 space-y-3 overflow-y-auto p-4" onSubmit={(e) => e.preventDefault()}>
                <p className="text-sm text-muted-foreground">{ar ? "سيب بياناتك ويوسف هيرد عليك بعرض سعر مخصص." : "Leave your details and Youssef will reply with a tailored quote."}</p>
                <input className={field} placeholder={ar ? "اسمك" : "Your name"} value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
                <input className={field} placeholder={ar ? "واتساب أو إيميل" : "WhatsApp or email"} value={lead.contact} onChange={(e) => setLead({ ...lead, contact: e.target.value })} />
                <textarea className={`${field} min-h-24`} placeholder={ar ? "محتاج إيه؟ (نوع المشروع، الميزانية، الوقت)" : "What do you need? (project, budget, timeline)"} value={lead.need} onChange={(e) => setLead({ ...lead, need: e.target.value })} />
                <div className="grid grid-cols-2 gap-2">
                  <a aria-disabled={!ready} href={ready ? links.whatsapp : undefined} target="_blank" rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground ${ready ? "" : "pointer-events-none opacity-50"}`}>
                    <Send className="h-4 w-4" /> WhatsApp
                  </a>
                  <a aria-disabled={!ready} href={ready ? links.email : undefined}
                    className={`glass inline-flex items-center justify-center rounded-full px-3 py-2 text-xs font-semibold ${ready ? "" : "pointer-events-none opacity-50"}`}>
                    Email
                  </a>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
