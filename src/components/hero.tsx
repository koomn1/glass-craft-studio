import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.4]);

  return (
    <motion.section style={{ y, opacity }} className="relative mx-auto max-w-5xl px-6 pt-20 pb-16 text-center sm:pt-32 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
        Veterinary medicine · AI · Storytelling
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
        className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
      >
        A portfolio across veterinary practice, applied AI, and visual storytelling — built with intention and a quiet sense of craft.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onExplore}
        className="glass mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.03]"
      >
        Explore the work
        <ArrowDown className="h-4 w-4" />
      </motion.button>
    </motion.section>
  );
}
