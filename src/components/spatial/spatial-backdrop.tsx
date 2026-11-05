import { useRef } from "react";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";

/**
 * Fixed "room" behind every window: ambient light, a perspective floor grid and
 * a horizon line where a heartbeat trace turns into a neural network (Vet → AI).
 * Pure CSS/SVG on its own compositor layer — nothing here repaints on scroll.
 */
export function SpatialBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  usePointerParallax(ref, 0.05);

  return (
    <div ref={ref} className="spatial-backdrop" aria-hidden="true">
      <div className="spatial-aurora" />
      <div className="spatial-floor-wrap">
        <div className="spatial-floor" />
      </div>
      <svg className="spatial-horizon" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="vital-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--coral)" stopOpacity="0" />
            <stop offset="0.25" stopColor="var(--coral)" />
            <stop offset="0.55" stopColor="var(--teal-bright)" />
            <stop offset="1" stopColor="var(--teal-bright)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Heartbeat → neural mesh */}
        <path
          className="spatial-vital"
          stroke="url(#vital-grad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          d="M0 70 H160 l12 0 8 -22 10 44 12 -78 12 64 8 -8 h120 l10 -16 10 32 10 -16 H560 L640 40 L720 92 L800 30 L880 78 L960 46 L1040 70 H1200"
        />
        {[[640, 40], [720, 92], [800, 30], [880, 78], [960, 46], [1040, 70]].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="3.5" fill="var(--teal-bright)" className="spatial-node" />
        ))}
        <path
          stroke="var(--teal-bright)"
          strokeOpacity="0.35"
          strokeWidth="1"
          d="M640 40 L800 30 M720 92 L880 78 M800 30 L960 46 M880 78 L1040 70 M640 40 L720 92"
        />
      </svg>
    </div>
  );
}
