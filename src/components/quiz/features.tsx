import { motion } from "framer-motion";
import { BarChart3, ListChecks, Palette, Share2, Sparkles, Users } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/i18n";

const featureKeys = [
  { key: "ai", icon: Sparkles },
  { key: "questionTypes", icon: ListChecks },
  { key: "sharing", icon: Share2 },
  { key: "analytics", icon: BarChart3 },
  { key: "collaboration", icon: Users },
  { key: "customization", icon: Palette },
] as const;

export function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary/80">
          {t("features.eyebrow")}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {t("features.title")}
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{t("features.subtitle")}</p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {featureKeys.map((item, index) => {
          const Icon = item.icon;
          const titleKey = `features.items.${item.key}.title`;
          const descriptionKey = `features.items.${item.key}.description`;
          return (
            <Reveal key={item.key} delay={index * 0.05}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="glass group h-full rounded-[1.75rem] p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{t(titleKey)}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{t(descriptionKey)}</p>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
