import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to);
    let raf = 0; const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref} className="tabular-nums">{n}{suffix}</span>;
}

export function StatsCounters() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const stats = [
    { v: year - 2022, s: "+", l: t.statVolunteer },
    { v: year - 2023, s: "+", l: t.statFreelance },
    { v: 6, s: "", l: t.statSkills },
    { v: 5, s: "+", l: t.statTools },
  ];
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{t.statsTitle}</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="glass-subtle rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-gradient-teal sm:text-4xl"><Counter to={s.v} suffix={s.s} /></p>
            <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
