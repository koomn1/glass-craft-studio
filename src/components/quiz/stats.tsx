import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/i18n";

const statKeys = [
  "quizzesCreated",
  "questionsAnswered",
  "creatorSatisfaction",
  "averageRating",
] as const;

export function Stats() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion) {
      valueRefs.current.forEach((node, index) => {
        if (!node) return;
        const item = statKeys[index];
        const value = t(`stats.items.${item}.value`);
        const suffix = t(`stats.items.${item}.suffix`);
        node.textContent = `${value}${suffix}`;
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      valueRefs.current.forEach((node, index) => {
        if (!node) return;
        const item = statKeys[index];
        const target = Number(t(`stats.items.${item}.value`));
        const suffix = t(`stats.items.${item}.suffix`);
        const state = { value: 0 };
        const decimals = Number.isInteger(target) ? 0 : 1;
        gsap.to(state, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
          onUpdate: () => {
            node.textContent = `${new Intl.NumberFormat(lang, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }).format(state.value)}${suffix}`;
          },
        });
      });
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, prefersReducedMotion, t]);

  return (
    <section ref={sectionRef} id="stats" className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary/80">
          {t("stats.eyebrow")}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {t("stats.title")}
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{t("stats.subtitle")}</p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statKeys.map((key, index) => (
          <Reveal key={key} delay={index * 0.05}>
            <motion.article
              whileHover={{ y: -4 }}
              className="glass rounded-[1.75rem] p-6 text-center shadow-sm"
            >
              <div className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                <span
                  ref={(node) => {
                    valueRefs.current[index] = node;
                  }}
                >
                  0
                </span>
              </div>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                {t(`stats.items.${key}.label`)}
              </p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
