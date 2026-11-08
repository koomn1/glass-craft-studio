import { Bot, Brain, Code2, Palette, BarChart3, Megaphone, Camera, Stethoscope, Sparkles, Globe, Video, PenTool } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const items = [
  { icon: Bot, label: "ChatGPT" }, { icon: Brain, label: "Claude" }, { icon: Sparkles, label: "MidJourney" },
  { icon: Palette, label: "DALL·E" }, { icon: PenTool, label: "Canva AI" }, { icon: Code2, label: "Python" },
  { icon: Globe, label: "HTML / CSS" }, { icon: Megaphone, label: "Social Media" }, { icon: BarChart3, label: "Data Analytics" },
  { icon: Video, label: "Video Editing" }, { icon: Camera, label: "Storytelling" }, { icon: Stethoscope, label: "Veterinary Medicine" },
];

export function Marquee() {
  const { t } = useI18n();
  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="glass-subtle inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
          <Icon className="h-4 w-4 text-primary" aria-hidden="true" />{label}
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label={t.toolbelt} className="marquee my-6" dir="ltr">
      <div className="marquee-track">{row(false)}{row(true)}</div>
    </section>
  );
}
