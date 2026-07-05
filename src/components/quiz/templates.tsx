import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

const cardImages = ["/quiz-card-1.svg", "/quiz-card-2.svg", "/quiz-card-3.svg"];
const cardKeys = ["generalKnowledge", "scienceSprint", "languageLab"] as const;

export function Templates() {
  const { t, dir } = useLanguage();

  return (
    <section id="templates" className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary/80">
          {t("templates.eyebrow")}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {t("templates.title")}
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{t("templates.subtitle")}</p>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {cardKeys.map((cardKey, index) => (
          <Reveal key={cardKey} delay={index * 0.06}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className="glass overflow-hidden rounded-[1.75rem] p-4 shadow-sm"
            >
              <div className="rounded-[1.5rem] bg-white/60 p-3 dark:bg-white/5">
                <img
                  src={cardImages[index]}
                  alt={t(`templates.cards.${cardKey}.title`)}
                  className="w-full rounded-[1.1rem]"
                />
              </div>
              <div className="px-2 pb-2 pt-5">
                <h3 className="text-xl font-semibold tracking-tight">
                  {t(`templates.cards.${cardKey}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {t(`templates.cards.${cardKey}.description`)}
                </p>
                <div className="mt-5">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full bg-white/50 backdrop-blur dark:bg-white/5"
                  >
                    <a href="#cta">
                      {t(`templates.cards.${cardKey}.cta`)}
                      <ArrowUpRight className={cn("h-4 w-4", dir === "rtl" && "-scale-x-100")} />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
