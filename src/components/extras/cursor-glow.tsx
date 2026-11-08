import { useEffect, useRef } from "react";
import { useSpatialMotion } from "@/hooks/use-spatial-motion";

/** Soft ambient glow following pointer/touch — transform-only, no blur filter. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useSpatialMotion();
  useEffect(() => {
    if (!enabled) return;
    let raf = 0, x = 0, y = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (el) { el.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`; el.style.opacity = "1"; }
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, [enabled]);
  if (!enabled) return null;
  return <div ref={ref} aria-hidden="true" className="cursor-glow" />;
}
