import { ListChecks, ToggleLeft, TextCursorInput, Image, Vote, Timer } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "../reveal";

const TYPES = [
  { icon: ListChecks, key: "types.t1" },
  { icon: ToggleLeft, key: "types.t2" },
  { icon: TextCursorInput, key: "types.t3" },
  { icon: Image, key: "types.t4" },
  { icon: Vote, key: "types.t5" },
  { icon: Timer, key: "types.t6" },
] as const;

export function QuizTypes() {
  const { t } = useI18n();
  return (
    <section id="types" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">{t("types.title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("types.subtitle")}</p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {TYPES.map((ty, i) => {
          const Icon = ty.icon;
          return (
            <Reveal
              key={ty.key}
              delay={i * 0.05}
              className="glass flex items-center gap-3 rounded-2xl px-5 py-4 transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/70 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium sm:text-base">{t(ty.key)}</span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
