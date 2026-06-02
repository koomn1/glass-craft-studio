import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Send, Instagram, Music2, X, Share2 } from "lucide-react";

const links = [
  { label: "WhatsApp", href: "https://wa.me/2001018995002", icon: MessageCircle, color: "oklch(0.72 0.18 150)" },
  { label: "Email", href: "mailto:yo01009950871@gmail.com", icon: Mail, color: "oklch(0.65 0.18 25)" },
  { label: "Telegram", href: "https://t.me/DR_Youssef_Badawy", icon: Send, color: "oklch(0.70 0.15 230)" },
  { label: "Instagram", href: "https://instagram.com/youssef_mo7ammed_02", icon: Instagram, color: "oklch(0.65 0.20 350)" },
  { label: "TikTok", href: "https://tiktok.com/@youssef_m_badawy", icon: Music2, color: "oklch(0.30 0.04 200)" },
];

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on outside click + Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (triggerRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Side-anchored trigger tab */}
      <motion.button
        ref={triggerRef}
        whileTap={{ scale: 0.94 }}
        whileHover={{ x: -3 }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="contact-rail"
        aria-label={open ? "Close contact rail" : "Open contact rail"}
        className="fixed right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-2xl px-2.5 py-4 shadow-[0_10px_40px_-10px_color-mix(in_oklab,var(--teal)_60%,transparent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }}
      >
        <motion.span
          key={open ? "x" : "share"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="block text-white"
        >
          {open ? <X className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
        </motion.span>
      </motion.button>

      {/* Sliding rail panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="contact-rail"
            ref={panelRef}
            role="dialog"
            aria-label="Contact channels"
            initial={{ x: "110%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "110%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="glass-strong fixed right-12 top-1/2 z-50 w-[min(86vw,260px)] -translate-y-1/2 rounded-3xl p-3"
          >
            <p className="px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
              Get in touch
            </p>
            <ul className="flex flex-col gap-1">
              {links.map((l, i) => {
                const Icon = l.icon;
                return (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04 }}
                  >
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span
                        className="grid h-9 w-9 place-items-center rounded-xl shadow-md transition-transform group-hover:scale-105"
                        style={{ background: l.color, color: "white" }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium">{l.label}</span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
