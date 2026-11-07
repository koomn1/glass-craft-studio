import { useEffect, type RefObject } from "react";
import { useSpatialMotion } from "@/hooks/use-spatial-motion";

/**
 * Writes smoothed pointer position (-1..1) to `--px` / `--py` on the element.
 * Only runs on fine pointers, respects reduced motion, and idles when the
 * element is off-screen or the pointer is still. Scoped to the element so the
 * style invalidation never touches the rest of the page.
 */
export function usePointerParallax(ref: RefObject<HTMLElement | null>, ease = 0.08) {
  const enabled = useSpatialMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!enabled) {
      el.style.removeProperty("--px");
      el.style.removeProperty("--py");
      return;
    }

    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    let visible = true;

    const tick = () => {
      cx += (tx - cx) * ease;
      cy += (ty - cy) * ease;
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));
      raf = visible && (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) { cancelAnimationFrame(raf); raf = 0; }
    });
    io.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
      cancelAnimationFrame(raf);
      el.style.removeProperty("--px");
      el.style.removeProperty("--py");
    };
  }, [ref, ease, enabled]);
}
