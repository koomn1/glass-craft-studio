import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import heroArt from "@/assets/quiz-space/hero.svg";

const STATS = [
  { key: "hero.stat1" as const, value: 120, suffix: "K+" },
  { key: "hero.stat2" as const, value: 48, suffix: "K+" },
  { key: "hero.stat3" as const, value: 3, suffix: " min" },
];

function useCountUp(target: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = String(target);
      return;
    }
    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: target,
      duration: 1.6,
      ease: "power2.out",
      delay: 0.4,
      onUpdate: () => {
        el.textContent = String(Math.round(obj.n));
      },
    });
    return () => {
      tween.kill();
    };
  }, [target, reduce]);
  return ref;
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useCountUp(value);
  return (
    <div className="text-center sm:text-start">
      <div className="text-2xl font-semibold text-gradient-teal sm:text-3xl">
        <span ref={ref}>0</span>
        {suffix}
      </div>
      <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</div>
    </div>
  );
}

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative mx-auto grid max-w-6xl gap-10 px-6 pt-28 pb-16 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
    >
      <div className="text-center lg:text-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          {t("hero.badge")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-6xl"
        >
          {t("hero.title1")} <span className="text-gradient-teal">{t("hero.titleAccent")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
        >
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              boxShadow: "0 12px 30px -10px color-mix(in oklab, var(--teal) 60%, transparent)",
            }}
          >
            {t("hero.ctaPrimary")}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </a>
          <a
            href="#how"
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Play className="h-4 w-4" />
            {t("hero.ctaSecondary")}
          </a>
        </motion.div>

        <div className="mt-12 grid max-w-md grid-cols-3 gap-4 lg:mx-0">
          {STATS.map((s) => (
            <Stat key={s.key} value={s.value} suffix={s.suffix} label={t(s.key)} />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative mx-auto w-full max-w-lg"
      >
        <motion.img
          src={heroArt}
          alt=""
          aria-hidden="true"
          className="w-full drop-shadow-2xl"
          animate={reduce ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
