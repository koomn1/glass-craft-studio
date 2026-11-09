import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "@/components/material-icons";
import { useI18n } from "@/lib/i18n";
import portrait from "@/assets/photos/photo-sun.webp.asset.json";
import logo from "@/assets/yb-logo.webp.asset.json";

type Slide = { kicker: string; body: ReactNode };

function useSlides(ar: boolean): Slide[] {
  const chip = "glass rounded-2xl px-5 py-4";
  return [
    { kicker: ar ? "مرحباً" : "Hello", body: (
      <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <h1 className="text-4xl font-bold leading-tight md:text-7xl">Dr. Youssef <span className="text-gradient-teal">Badawy</span></h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-2xl">Aspiring Perfect Doctor | Marketing & AI Enthusiast</p>
          <p className="mt-3 text-base md:text-xl">{ar ? "بربط ابتكار الرعاية الصحية بأحدث التقنيات." : "Bridging healthcare innovation and cutting-edge technology."}</p>
        </div>
        <img src={portrait.url} alt="Youssef Badawy" className="mx-auto max-h-[55vh] rounded-[2.5rem] object-cover shadow-2xl" />
      </div>) },
    { kicker: ar ? "اللي بقدمه" : "What I offer", body: (
      <div className="grid gap-4 md:grid-cols-2">
        {(ar ? ["استراتيجية تسويق رقمي", "محتوى وأتمتة بالذكاء الاصطناعي", "مواقع وصفحات هبوط", "محتوى وتوعية بيطرية"] : ["Digital marketing strategy", "AI content & automation", "Websites & landing pages", "Veterinary content & awareness"]).map((s, i) => (
          <div key={s} className={chip}><span className="text-sm text-muted-foreground">0{i + 1}</span><p className="mt-1 text-xl font-semibold md:text-3xl">{s}</p></div>
        ))}
      </div>) },
    { kicker: ar ? "الخبرة" : "Experience", body: (
      <div className="space-y-4">
        {[["Zaghdan Co. — Marketing & Operations Specialist", ar ? "حتى الآن" : "Present"], [ar ? "تسويق رقمي حر" : "Freelance digital marketing", "2023 —"], [ar ? "متطوع طبي" : "Medical volunteer", "2022 —"]].map(([t, d]) => (
          <div key={t} className={`${chip} flex items-center justify-between gap-4`}><p className="text-lg font-semibold md:text-2xl">{t}</p><span className="text-muted-foreground">{d}</span></div>
        ))}
      </div>) },
    { kicker: ar ? "المهارات" : "Skills", body: (
      <div className="grid gap-5 md:grid-cols-2">
        {[["AI Tools", 90], ["Marketing & Digital Strategy", 85], ["Social Media Marketing", 80], ["HTML/CSS", 70], ["Python", 60], ["Data Analytics", 55]].map(([n, v]) => (
          <div key={n as string}><div className="mb-2 flex justify-between text-lg"><span>{n}</span><span>{v}%</span></div>
            <div className="h-3 overflow-hidden rounded-full bg-foreground/10"><div className="h-full rounded-full bg-primary" style={{ width: `${v}%` }} /></div></div>
        ))}
      </div>) },
    { kicker: ar ? "طريقة الشغل" : "How we work", body: (
      <div className="grid gap-4 md:grid-cols-4">
        {(ar ? ["مكالمة تعارف", "عرض وسعر مخصص", "تنفيذ بمراجعات دورية", "تسليم ومتابعة"] : ["Discovery call", "Tailored proposal", "Build with previews", "Delivery & follow-up"]).map((s, i) => (
          <div key={s} className={chip}><p className="text-4xl font-bold text-primary">{i + 1}</p><p className="mt-2 text-lg font-semibold">{s}</p></div>
        ))}
      </div>) },
    { kicker: ar ? "يلا نبدأ" : "Let's talk", body: (
      <div className="text-center">
        <img src={logo.url} alt="" className="mx-auto h-24 w-24 rounded-full bg-card p-2" />
        <h2 className="mt-6 text-4xl font-bold md:text-6xl">{ar ? "جاهز لمشروعك الجاي" : "Ready for your next project"}</h2>
        <p className="mt-6 text-lg md:text-2xl">WhatsApp +20 101 899 5002 · yo01009950871@gmail.com</p>
      </div>) },
  ];
}

export function PitchButton() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={ar ? "وضع العرض للعملاء" : "Pitch mode"}
        className="glass-strong rounded-full px-3 py-2 text-xs font-semibold ring-1 ring-border/60">
        {ar ? "عرض" : "Pitch"}
      </button>
      {open && <PitchDeck onClose={() => setOpen(false)} />}
    </>
  );
}

function PitchDeck({ onClose }: { onClose: () => void }) {
  const { lang } = useI18n();
  const slides = useSlides(lang === "ar");
  const [[i, dir], set] = useState<[number, number]>([0, 0]);
  const ref = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);
  const go = useCallback((d: number) => set(([c]) => [Math.min(slides.length - 1, Math.max(0, c + d)), d]), [slides.length]);
  const close = useCallback(() => { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); onClose(); }, [onClose]);

  useEffect(() => {
    ref.current?.requestFullscreen?.().catch(() => {});
    const onFs = () => { if (!document.fullscreenElement) onClose(); };
    const rtl = document.documentElement.dir === "rtl";
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (["ArrowRight", " ", "PageDown"].includes(e.key)) { e.preventDefault(); go(rtl && e.key === "ArrowRight" ? -1 : 1); }
      else if (["ArrowLeft", "PageUp"].includes(e.key)) go(rtl && e.key === "ArrowLeft" ? 1 : -1);
    };
    document.addEventListener("fullscreenchange", onFs);
    window.addEventListener("keydown", k);
    return () => { document.removeEventListener("fullscreenchange", onFs); window.removeEventListener("keydown", k); };
  }, [go, close, onClose]);

  return (
    <div ref={ref} role="dialog" aria-label="Pitch deck" className="fixed inset-0 z-[100] flex flex-col bg-background"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => { if (touch.current == null) return; const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); touch.current = null; }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 50% at 20% 10%, color-mix(in oklab, var(--teal) 25%, transparent), transparent), radial-gradient(50% 40% at 90% 90%, color-mix(in oklab, var(--teal-bright) 20%, transparent), transparent)" }} />
      <div className="relative flex items-center justify-between p-4 md:p-6">
        <span className="eyebrow">{slides[i].kicker}</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{i + 1} / {slides.length}</span>
          <button type="button" onClick={close} aria-label="Exit pitch mode" className="glass grid h-10 w-10 place-items-center rounded-full"><X className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 md:px-16" style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={i} custom={dir} className="glass-strong w-full max-w-6xl rounded-[2.5rem] p-8 md:p-14"
            initial={{ opacity: 0, x: dir * 60, rotateY: dir * -8, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, x: dir * -60, rotateY: dir * 8, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 0.9, 0.24, 1] }}>
            {slides[i].body}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative flex items-center justify-center gap-4 p-5">
        <button type="button" onClick={() => go(-1)} disabled={i === 0} aria-label="Previous slide" className="glass grid h-11 w-11 place-items-center rounded-full disabled:opacity-40"><ChevronLeft className="h-6 w-6 rtl:rotate-180" /></button>
        <div className="flex gap-2">{slides.map((_, n) => <button key={n} type="button" aria-label={`Slide ${n + 1}`} onClick={() => set([n, n > i ? 1 : -1])} className={`h-2 rounded-full transition-all ${n === i ? "w-8 bg-primary" : "w-2 bg-foreground/30"}`} />)}</div>
        <button type="button" onClick={() => go(1)} disabled={i === slides.length - 1} aria-label="Next slide" className="glass grid h-11 w-11 place-items-center rounded-full disabled:opacity-40"><ChevronRight className="h-6 w-6 rtl:rotate-180" /></button>
      </div>
    </div>
  );
}
