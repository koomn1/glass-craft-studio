import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import portrait from "@/assets/photos/photo-sun.jpg.asset.json";
import sitting from "@/assets/photos/photo-sitting.webp.asset.json";

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.4]);

  return (
    <motion.section
      style={{ y, opacity }}
      className="relative mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-16 sm:pt-24 sm:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
    >
      <div className="text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          Aspiring Perfect Doctor · Marketing &amp; AI Enthusiast
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-6 text-5xl font-semibold leading-[1.05] sm:text-7xl"
        >
          Dr. Youssef <span className="text-gradient-teal">Badawy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0"
        >
          Bridging the gap between healthcare innovation and cutting-edge technology — veterinary practice, applied AI, and visual storytelling.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onExplore}
          className="glass mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.03]"
        >
          Scroll to explore
          <ArrowDown className="h-4 w-4" />
        </motion.button>
      </div>

      {/* Portrait collage */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative mx-auto h-[360px] w-full max-w-md sm:h-[440px]"
      >
        <div
          className="absolute inset-0 -z-10 rounded-[2.5rem] blur-3xl opacity-50"
          style={{ background: "radial-gradient(60% 60% at 50% 50%, var(--teal-bright), transparent 70%)" }}
          aria-hidden="true"
        />
        <motion.figure
          whileHover={{ rotate: -1.5, y: -4 }}
          className="glass-strong absolute left-0 top-0 h-[78%] w-[68%] overflow-hidden rounded-[2rem] p-1.5"
        >
          <img
            src={portrait.url}
            alt="Dr. Youssef Badawy portrait"
            className="h-full w-full rounded-[1.6rem] object-cover"
            loading="eager"
            decoding="async"
          />
        </motion.figure>
        <motion.figure
          whileHover={{ rotate: 1.5, y: -4 }}
          className="glass-strong absolute bottom-0 right-0 h-[58%] w-[56%] overflow-hidden rounded-[2rem] p-1.5"
        >
          <img
            src={sitting.url}
            alt="Dr. Youssef Badawy candid"
            className="h-full w-full rounded-[1.6rem] object-cover"
            loading="lazy"
            decoding="async"
          />
        </motion.figure>
      </motion.div>
    </motion.section>
  );
}
