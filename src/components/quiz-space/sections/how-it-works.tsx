import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PenLine, SlidersHorizontal, BarChart3 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { icon: PenLine, title: "how.s1.title", desc: "how.s1.desc" },
  { icon: SlidersHorizontal, title: "how.s2.title", desc: "how.s2.desc" },
  { icon: BarChart3, title: "how.s3.title", desc: "how.s3.desc" },
] as const;

export function HowItWorks() {
  const { t } = useI18n();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".qs-step");
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
      gsap.fromTo(
        ".qs-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 60%", scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how" className="scroll-mt-24 py-20">
      <div ref={root} className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">{t("how.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("how.subtitle")}</p>
        </div>

        <div className="relative mt-16">
          <div className="absolute inset-x-8 top-8 hidden h-1 rounded-full bg-border/70 md:block">
            <div
              className="qs-progress h-full origin-left rounded-full rtl:origin-right"
              style={{ background: "linear-gradient(90deg, var(--teal), var(--teal-bright))" }}
            />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="qs-step relative text-center">
                  <div
                    className="glass-strong relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-2xl text-primary-foreground"
                    style={{
                      background: "linear-gradient(135deg, var(--teal), var(--teal-bright))",
                    }}
                  >
                    <Icon className="h-7 w-7" />
                    <span className="absolute -top-2 -end-2 grid h-6 w-6 place-items-center rounded-full bg-background text-xs font-bold text-primary ring-1 ring-border">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{t(s.title)}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {t(s.desc)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
