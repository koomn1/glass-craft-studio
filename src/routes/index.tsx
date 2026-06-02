import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Stethoscope, Cpu, Film, Sparkles } from "lucide-react";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { GlassTabs, type TabItem } from "@/components/glass-tabs";
import { FloatingContact } from "@/components/floating-contact";
import { Hero } from "@/components/hero";
import { VetSection } from "@/components/sections/vet-section";
import { DevSection } from "@/components/sections/dev-section";
import { VideoSection } from "@/components/sections/video-section";
import { AssistantSection } from "@/components/sections/assistant-section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Youssef Badawy — Veterinary Medicine, AI & Storytelling" },
      { name: "description", content: "Portfolio of Dr. Youssef Badawy: veterinary practice, applied AI projects, and visual storytelling — wrapped in an iOS-inspired glassmorphism interface." },
      { property: "og:title", content: "Dr. Youssef Badawy — Portfolio" },
      { property: "og:description", content: "Veterinary medicine, applied AI, and visual storytelling — one quiet portfolio." },
    ],
  }),
  component: () => (
    <ThemeProvider>
      <Index />
    </ThemeProvider>
  ),
});

const TABS: TabItem[] = [
  { id: "vet", label: "Veterinary", icon: Stethoscope },
  { id: "dev", label: "AI & Dev", icon: Cpu },
  { id: "video", label: "Video", icon: Film },
  { id: "assistant", label: "Assistant", icon: Sparkles },
];

function Index() {
  const [active, setActive] = useState("vet");
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollToTabs = () => {
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen">
      <header className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between">
        <a href="#" className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold">
          <span className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-primary-foreground" style={{ background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }}>YB</span>
          <span className="hidden sm:inline">Youssef Badawy</span>
        </a>
        <ThemeToggle />
      </header>

      <main className="pt-24">
        <Hero onExplore={scrollToTabs} />

        <div ref={tabsRef} className="mx-auto max-w-6xl px-4 pt-6">
          <GlassTabs items={TABS} active={active} onChange={setActive} />

          <section className="relative mt-10 pb-24" id={`panel-${active}`} role="tabpanel" aria-labelledby={`tab-${active}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {active === "vet" && <VetSection />}
                {active === "dev" && <DevSection />}
                {active === "video" && <VideoSection />}
                {active === "assistant" && <AssistantSection />}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>

        <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Dr. Youssef Badawy. Crafted with care.
        </footer>
      </main>

      <FloatingContact />
    </div>
  );
}
