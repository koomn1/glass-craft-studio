import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", key: "nav.features" },
  { href: "#how-it-works", key: "nav.howItWorks" },
  { href: "#templates", key: "nav.templates" },
  { href: "#stats", key: "nav.stats" },
];

export function Navbar() {
  const { t, dir } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none sticky top-3 z-50 mx-auto max-w-7xl px-4 pt-2 sm:top-4">
      <div className="glass-strong pointer-events-auto overflow-hidden rounded-[1.5rem] border-white/10 px-3 py-2 backdrop-blur-2xl sm:px-4">
        <div className="flex items-center justify-between gap-3">
          <a
            href="#top"
            className="flex items-center gap-3 rounded-full text-sm font-semibold text-foreground"
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/70 p-1 shadow-sm dark:bg-white/10">
              <img src="/quiz-space-logo.svg" alt="" aria-hidden="true" className="h-8 w-8" />
            </span>
            <span className="hidden sm:block">
              <span className="block text-[0.65rem] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                {t("nav.brand")}
              </span>
              <span className="block text-base font-semibold tracking-tight">{t("nav.brand")}</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(link.key)}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageToggle />
            <ThemeToggle />
            <Button asChild className="shadow-sm">
              <a href="#cta">
                {t("nav.getStarted")}
                <ArrowUpRight className={cn("h-4 w-4", dir === "rtl" && "-scale-x-100")} />
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              aria-label={open ? t("nav.menuClose") : t("nav.menuOpen")}
              className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-background/40 text-foreground backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="mt-3 space-y-2 border-t border-border/60 pt-3">
                {navLinks.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/50 hover:text-foreground dark:hover:bg-white/5"
                  >
                    {t(link.key)}
                  </a>
                ))}
                <Button asChild className="mt-2 w-full">
                  <a href="#cta" onClick={() => setOpen(false)}>
                    {t("nav.getStarted")}
                    <ArrowUpRight className={cn("h-4 w-4", dir === "rtl" && "-scale-x-100")} />
                  </a>
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
