import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/i18n";

const stepKeys = ["create", "customize", "share", "analyze"] as const;

export function HowItWorks() {
  const { t, dir } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const line = lineRef.current;
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: dir === "rtl" ? "top right" : "top left" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 35%",
              scrub: true,
            },
          },
        );
      }

      stepRefs.current.forEach((step, index) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 78%",
              end: "bottom 62%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.04,
          },
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [dir, prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary/80">
          {t("howItWorks.eyebrow")}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {t("howItWorks.title")}
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{t("howItWorks.subtitle")}</p>
      </Reveal>

      <div className="relative mx-auto mt-14 max-w-4xl">
        <div
          className="absolute start-6 top-6 h-[calc(100%-3rem)] w-px origin-top bg-gradient-to-b from-primary/60 via-primary/20 to-transparent"
          ref={lineRef}
        />
        <div className="space-y-5">
          {stepKeys.map((stepKey, index) => (
            <motion.article
              key={stepKey}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
              className="glass relative rounded-[1.75rem] ps-16 pe-5 py-6 sm:ps-20 sm:pe-6"
            >
              <span className="absolute start-4 top-6 grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm sm:start-5">
                {index + 1}
              </span>
              <h3 className="text-xl font-semibold tracking-tight">
                {t(`howItWorks.steps.${stepKey}.title`)}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                {t(`howItWorks.steps.${stepKey}.description`)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
