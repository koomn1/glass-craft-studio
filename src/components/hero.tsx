import { useRef, type CSSProperties } from "react";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { motion } from "framer-motion";
import { FadeImg } from "@/components/fade-img";
import { ArrowDown, Mail, MapPin, PawPrint, BrainCircuit, Clapperboard } from "lucide-react";
import portrait from "@/assets/photos/photo-sun.webp.asset.json";
import sitting from "@/assets/photos/photo-sitting.webp.asset.json";

interface HeroProps {
  onExplore: () => void;
}

const ease = [0.2, 0.8, 0.2, 1] as const;

const pillars = [
  { icon: PawPrint, label: "Veterinary Medicine" },
  { icon: BrainCircuit, label: "Applied AI" },
  { icon: Clapperboard, label: "Storytelling" },
];

export function Hero({ onExplore }: HeroProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  usePointerParallax(stageRef);

  return (
    <section
      className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-14 pb-16 sm:pt-20 sm:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
    >
      <div className="text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Aspiring Perfect Doctor · Marketing &amp; AI Enthusiast
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="mt-6 text-[clamp(2.75rem,1.8rem+4.5vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.04em]"
        >
          Dr. Youssef
          <br className="hidden sm:block" /> <span className="text-gradient-teal">Badawy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
        >
          Bridging the gap between healthcare innovation and cutting-edge technology — veterinary practice, applied AI, and visual storytelling.
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start"
        >
          {pillars.map(({ icon: Icon, label }) => (
            <li key={label} className="glass-subtle inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium">
              <Icon className="h-4 w-4 text-primary" strokeWidth={2.2} aria-hidden="true" />
              {label}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
        >
          <button
            type="button"
            onClick={onExplore}
            className="tab-indicator inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Explore my work
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </button>
          <a
            href="mailto:yo01009950871@gmail.com"
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
            Get in touch
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Kafr El-Sheikh, Egypt
        </motion.p>
      </div>

      {/* Spatial stage: floating windows at different depths, tilting with the pointer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease }}
        className="relative mx-auto h-[380px] w-full max-w-md sm:h-[460px]"
      >
        <div ref={stageRef} className="hero-stage absolute inset-0">
          <div className="hero-tilt">
            <div
              className="absolute inset-0 rounded-[2.5rem] opacity-60 blur-3xl"
              style={{
                translate: "0 0 -120px",
                background:
                  "radial-gradient(55% 55% at 35% 40%, var(--teal-bright), transparent 70%), radial-gradient(45% 45% at 75% 75%, var(--coral), transparent 70%)",
              }}
              aria-hidden="true"
            />
            <figure
              className="photo-frame photo-float absolute left-0 top-0 h-[78%] w-[66%] overflow-hidden rounded-[2.25rem] p-1.5"
              style={{ translate: "0 0 -30px", "--float-y": "-8px", "--float-dur": "7s" } as CSSProperties}
            >
              <img
                src={portrait.url}
                alt="Dr. Youssef Badawy portrait"
                width={670}
                height={1400}
                className="h-full w-full rounded-[1.85rem] object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </figure>
            <figure
              className="photo-frame photo-float absolute bottom-0 right-0 h-[58%] w-[56%] overflow-hidden rounded-[2.25rem] p-1.5"
              style={{ translate: "0 0 50px", "--float-y": "8px", "--float-dur": "8s", animationDelay: "0.6s" } as CSSProperties}
            >
              <FadeImg
                src={sitting.url}
                alt="Dr. Youssef Badawy candid"
                width={800}
                height={800}
                className="h-full w-full rounded-[1.85rem] object-cover"
                loading="lazy"
              />
            </figure>

            {/* Vitals → Neural mini window */}
            <div className="absolute right-0 top-4 w-[44%] sm:right-[-4%]" style={{ translate: "0 0 90px" }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6, ease }}
              className="spatial-ornament rounded-2xl p-3"
            >
              <span className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Vitals <span className="text-primary">→ Neural</span>
              </span>
              <svg viewBox="0 0 160 44" className="mt-1.5 h-9 w-full" fill="none" aria-hidden="true">
                <path
                  className="spatial-vital"
                  pathLength={1}
                  d="M0 26 H30 l6 -14 6 26 6 -34 6 30 4 -8 H90 L104 12 L118 34 L132 10 L146 28 L160 20"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {[[104, 12], [118, 34], [132, 10], [146, 28]].map(([x, y]) => (
                  <circle key={x} cx={x} cy={y} r="2.6" fill="var(--coral)" className="spatial-node" />
                ))}
              </svg>
            </motion.div>
            </div>

            {/* Floating status widget */}
            <div className="absolute bottom-6 left-2 sm:left-4" style={{ translate: "0 0 120px" }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease }}
              className="spatial-ornament flex items-center gap-3 rounded-2xl px-4 py-3"
            >
              <span className="tab-indicator grid h-9 w-9 place-items-center rounded-xl text-primary-foreground">
                <PawPrint className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-sm font-semibold">Vet + AI</span>
                <span className="block text-[11px] text-muted-foreground">Healthcare meets tech</span>
              </span>
            </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
