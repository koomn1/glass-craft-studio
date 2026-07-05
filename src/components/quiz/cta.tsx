import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

export function Cta() {
  const { t, dir } = useLanguage();

  return (
    <section id="cta" className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
      <Reveal>
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-strong relative overflow-hidden rounded-[2rem] p-8 sm:p-10 lg:p-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,126,202,0.16),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(103,173,161,0.16),transparent_45%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary/80">
                {t("cta.eyebrow")}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {t("cta.title")}
              </h2>
              <p className="text-lg leading-8 text-muted-foreground">{t("cta.subtitle")}</p>
            </div>
            <Button asChild size="lg" className="rounded-full px-6">
              <a href="#top">
                {t("cta.button")}
                <ArrowUpRight className={cn("h-4 w-4", dir === "rtl" && "-scale-x-100")} />
              </a>
            </Button>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
