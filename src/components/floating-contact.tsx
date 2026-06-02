import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Send, Instagram, Music2, X, Plus } from "lucide-react";

const links = [
  { label: "WhatsApp", href: "https://wa.me/2001018995002", icon: MessageCircle, color: "oklch(0.72 0.18 150)" },
  { label: "Email", href: "mailto:yo01009950871@gmail.com", icon: Mail, color: "oklch(0.65 0.18 25)" },
  { label: "Telegram", href: "https://t.me/DR_Youssef_Badawy", icon: Send, color: "oklch(0.70 0.15 230)" },
  { label: "Instagram", href: "https://instagram.com/youssef_mo7ammed_02", icon: Instagram, color: "oklch(0.65 0.20 350)" },
  { label: "TikTok", href: "https://tiktok.com/@youssef_m_badawy", icon: Music2, color: "oklch(0.30 0.04 200)" },
];

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="glass-strong flex flex-col gap-1 rounded-3xl p-2"
          >
            {links.map((l, i) => {
              const Icon = l.icon;
              return (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={l.label}
                    className="group flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span
                      className="grid h-9 w-9 place-items-center rounded-xl"
                      style={{ background: l.color, color: "white" }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="pr-2 text-sm font-medium">{l.label}</span>
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        className="glass-strong grid h-14 w-14 place-items-center rounded-full"
        style={{ background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }}
      >
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
          {open ? <X className="h-6 w-6 text-white" /> : <Plus className="h-6 w-6 text-white" />}
        </motion.span>
      </motion.button>
    </div>
  );
}
