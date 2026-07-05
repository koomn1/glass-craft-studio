import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "../reveal";

export function CTA() {
  const { t } = useI18n();
  return (
    <section id="cta" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20">
      <Reveal className="glass-strong relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(50% 60% at 30% 20%, color-mix(in oklab, var(--teal-bright) 40%, transparent), transparent 70%), radial-gradient(50% 60% at 80% 90%, color-mix(in oklab, var(--peach) 60%, transparent), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold sm:text-4xl">{t("cta.title")}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t("cta.subtitle")}</p>
        <a
          href="#top"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{
            boxShadow: "0 14px 34px -10px color-mix(in oklab, var(--teal) 60%, transparent)",
          }}
        >
          {t("cta.button")}
          <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
        </a>
      </Reveal>
    </section>
  );
}
