import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

export function Hero() {
  const { t, dir } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="top" className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:pb-28 sm:pt-16 lg:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <Reveal className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/50 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur dark:bg-white/5">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>{t("hero.badge")}</span>
          </div>

          <div className="space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary/80">
              {t("hero.eyebrow")}
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">{t("hero.title")}</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <a href="#templates">
                {t("hero.primaryCta")}
                <ArrowUpRight className={cn("h-4 w-4", dir === "rtl" && "-scale-x-100")} />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-6 bg-white/50 backdrop-blur dark:bg-white/5"
            >
              <a href="#how-it-works">{t("hero.secondaryCta")}</a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="glass rounded-full px-4 py-2">
              <span className="font-medium text-foreground">{t("hero.statValue")}</span>{" "}
              {t("hero.statLabel")}
            </div>
            <div className="glass rounded-full px-4 py-2">{t("hero.tags")}</div>
          </div>
        </Reveal>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={
            prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mx-auto w-full max-w-[42rem]"
        >
          <div
            className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl"
            aria-hidden="true"
          />
          <motion.img
            src="/hero-illustration.svg"
            alt="Quiz Space product illustration"
            className="relative z-10 w-full drop-shadow-[0_32px_48px_rgba(0,0,0,0.14)]"
            animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
