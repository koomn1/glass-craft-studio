import { motion } from "framer-motion";
import { TEAL_GLOW_RADIAL } from "@/lib/styles";

export interface CollagePhoto {
  src: string;
  alt: string;
  /** Absolute-position utility classes controlling placement + size. */
  cls: string;
  /** Idle float animation (e.g. `{ y: [0, -8, 0] }`). */
  float: { y: number[] };
  /** Float animation duration in seconds. */
  dur: number;
  /** Resting rotation in degrees. */
  rot: number;
}

interface PhotoCollageProps {
  items: CollagePhoto[];
  /** Container classes; defaults to a fixed-height relative box. */
  className?: string;
}

export function PhotoCollage({
  items,
  className = "relative h-[360px] sm:h-[420px]",
}: PhotoCollageProps) {
  return (
    <div className={className}>
      <div
        className="absolute inset-0 -z-10 rounded-[2rem] opacity-40 blur-3xl"
        style={{ background: TEAL_GLOW_RADIAL }}
        aria-hidden="true"
      />
      {items.map((p, i) => (
        <motion.figure
          key={p.src}
          initial={{ opacity: 0, scale: 0.9, rotate: p.rot * 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: p.rot }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
          whileHover={{ scale: 1.04, rotate: 0, zIndex: 5 }}
          className={`glass-strong group absolute overflow-hidden rounded-[1.75rem] p-1.5 shadow-xl ${p.cls}`}
        >
          <motion.div
            animate={p.float}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-full w-full overflow-hidden rounded-[1.4rem]"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(180deg, transparent 50%, color-mix(in oklab, var(--teal) 50%, transparent))",
              }}
            />
          </motion.div>
        </motion.figure>
      ))}
    </div>
  );
}
