import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { FadeImg } from "@/components/fade-img";
import { useSpatialMotion } from "@/hooks/use-spatial-motion";

export interface PhotoItem {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "portrait" | "square" | "landscape";
}

interface PhotoStripProps {
  items: PhotoItem[];
  title?: string;
  variant?: "row" | "mosaic" | "duo";
}

const aspectClass = (a?: PhotoItem["aspect"]) =>
  a === "portrait" ? "aspect-[3/4]" : a === "landscape" ? "aspect-[4/3]" : "aspect-square";

export function PhotoStrip({ items, title, variant = "row" }: PhotoStripProps) {
  const spatialMotion = useSpatialMotion();
  return (
    <Reveal>
      <div className="space-y-3">
        {title && (
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{title}</h3>
        )}
        <div
          className={
            variant === "mosaic"
              ? "grid grid-cols-2 gap-3 sm:grid-cols-4"
              : variant === "duo"
                ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
                : "grid grid-cols-2 gap-3 sm:grid-cols-3"
          }
        >
          {items.map((p, i) => (
            <motion.figure
              key={p.src + i}
              whileHover={spatialMotion ? { y: -2, scale: 1.01 } : undefined}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="photo-frame group relative overflow-hidden rounded-3xl p-1.5"
            >
              <div className={`relative overflow-hidden rounded-2xl ${aspectClass(p.aspect)}`}>
                <FadeImg
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.06]"
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--teal) 55%, transparent))",
                  }}
                />
              </div>
              {p.caption && (
                <figcaption className="px-2 pb-2 pt-2 text-xs text-muted-foreground">
                  {p.caption}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
