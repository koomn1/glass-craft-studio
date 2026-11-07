import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpatialMotion } from "@/hooks/use-spatial-motion";

const SoundContext = createContext({ enabled: false, toggle: () => {} });

export function SpatialInteractions({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const spatial = useSpatialMotion();
  useEffect(() => {
    const click = (event: MouseEvent) => {
      if (!enabled || !(event.target instanceof Element)) return;
      if (!event.target.closest("button:not(:disabled), a[href], [role='tab'], [role='checkbox']")) return;
      try {
        const context = audio.current ?? new AudioContext();
        audio.current = context;
        void context.resume();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(880, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(440, context.currentTime + 0.07);
        gain.gain.setValueAtTime(0.0001, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.09);
        oscillator.connect(gain); gain.connect(context.destination);
        oscillator.start(); oscillator.stop(context.currentTime + 0.1);
      } catch { /* Sound is optional on browsers without Web Audio. */ }
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, [enabled]);
  useEffect(() => {
    if (!spatial) return;
    let current: HTMLElement | null = null;
    const reset = () => { current?.style.removeProperty("translate"); current = null; };
    const move = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("button:not(:disabled):not([role='checkbox']):not([role='slider']), a[href]") : null;
      if (current !== target) reset();
      if (!target) return;
      current = target;
      const rect = target.getBoundingClientRect();
      target.style.translate = `${Math.max(-5, Math.min(5, (event.clientX - rect.left - rect.width / 2) * 0.1))}px ${Math.max(-4, Math.min(4, (event.clientY - rect.top - rect.height / 2) * 0.1))}px`;
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", reset);
    document.addEventListener("pointerout", reset);
    window.addEventListener("blur", reset);
    return () => { reset(); document.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", reset); document.removeEventListener("pointerout", reset); window.removeEventListener("blur", reset); };
  }, [spatial]);
  useEffect(() => () => { void audio.current?.close(); }, []);
  return <SoundContext.Provider value={{ enabled, toggle: () => setEnabled(value => !value) }}>{children}</SoundContext.Provider>;
}

export function SoundToggle() {
  const { enabled, toggle } = useContext(SoundContext);
  const Icon = enabled ? Volume2 : VolumeX;
  return <Button variant="ghost" size="icon" onClick={toggle} aria-label={enabled ? "Mute sound" : "Enable sound"} aria-pressed={enabled} title={enabled ? "Mute sound" : "Enable sound"} className="glass-strong rounded-full"><Icon aria-hidden="true" /></Button>;
}