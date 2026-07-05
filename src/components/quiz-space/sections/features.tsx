import { MousePointerClick, Wand2, CheckCircle2, Palette, Users, Share2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "../reveal";

const FEATURES = [
  { icon: MousePointerClick, title: "features.f1.title", desc: "features.f1.desc" },
  { icon: Wand2, title: "features.f2.title", desc: "features.f2.desc" },
  { icon: CheckCircle2, title: "features.f3.title", desc: "features.f3.desc" },
  { icon: Palette, title: "features.f4.title", desc: "features.f4.desc" },
  { icon: Users, title: "features.f5.title", desc: "features.f5.desc" },
  { icon: Share2, title: "features.f6.title", desc: "features.f6.desc" },
] as const;

export function Features() {
  const { t } = useI18n();
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">{t("features.title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("features.subtitle")}</p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal
              as="article"
              key={f.title}
              delay={i * 0.06}
              className="glass group rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{t(f.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(f.desc)}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
