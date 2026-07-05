import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandLogo } from "./logo";
import { LangToggle } from "./lang-toggle";

const NAV = [
  { href: "#features", key: "nav.features" },
  { href: "#how", key: "nav.how" },
  { href: "#types", key: "nav.types" },
] as const;

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="glass-strong mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-3 py-2 pe-2 ps-3 shadow-lg ring-1 ring-border/50">
        <BrandLogo />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.key}
              href={n.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {t(n.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LangToggle />
          </div>
          <ThemeToggle />
          <a
            href="#cta"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            {t("nav.start")}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="glass-strong mx-auto mt-2 max-w-6xl rounded-3xl p-3 md:hidden"
          >
            <div className="flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.key}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5"
                >
                  {t(n.key)}
                </a>
              ))}
              <div className="mt-2 flex items-center justify-between gap-2 px-1">
                <LangToggle />
                <a
                  href="#cta"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  {t("nav.start")}
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
