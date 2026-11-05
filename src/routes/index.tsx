import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type ComponentType } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Stethoscope, Cpu, Film, Sparkles, Wrench, Briefcase, Mail } from "lucide-react";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SpatialDock, type DockItem } from "@/components/spatial/spatial-dock";
import { SpatialWindow } from "@/components/spatial/spatial-window";
import { SpatialBackdrop } from "@/components/spatial/spatial-backdrop";
import { FloatingContact } from "@/components/floating-contact";
import { Hero } from "@/components/hero";
import { VetSection } from "@/components/sections/vet-section";
import { DevSection } from "@/components/sections/dev-section";
import { VideoSection } from "@/components/sections/video-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";
import { AssistantSection } from "@/components/sections/assistant-section";
import logo from "@/assets/yb-logo.webp.asset.json";

const SITE_TITLE = "Dr. Youssef Badawy — Veterinary Medicine, AI & Storytelling";
const SITE_DESC =
  "Portfolio of Dr. Youssef Badawy: veterinary practice, applied AI projects, and visual storytelling — presented as a spatial, visionOS-inspired glass experience.";

const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Youssef Badawy",
  jobTitle: "Veterinarian & AI Developer",
  description: SITE_DESC,
  url: "/",
  email: "mailto:yo01009950871@gmail.com",
  telephone: "+201018995002",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kafr El-Sheikh",
    addressCountry: "EG",
  },
  knowsAbout: ["Veterinary Medicine", "Artificial Intelligence", "Software Development", "Visual Storytelling"],
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_TITLE,
  url: "/",
  inLanguage: ["en", "ar"],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { name: "theme-color", content: "#007979" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Youssef Badawy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(PERSON_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(WEBSITE_JSONLD) },
    ],
  }),
  component: () => (
    <ThemeProvider>
      <Index />
    </ThemeProvider>
  ),
});

// Order: Vet → Experience → AI/Dev → Skills → Video → Assistant → Contact
const TABS: DockItem[] = [
  { id: "vet", label: "Vet", icon: Stethoscope },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "dev", label: "AI & Dev", icon: Cpu },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "video", label: "Video", icon: Film },
  { id: "assistant", label: "Assistant", icon: Sparkles },
  { id: "contact", label: "Contact", icon: Mail },
];

const SECTIONS: Record<string, ComponentType> = {
  vet: VetSection,
  experience: ExperienceSection,
  dev: DevSection,
  skills: SkillsSection,
  video: VideoSection,
  assistant: AssistantSection,
  contact: ContactSection,
};

const spatialEase = [0.22, 0.9, 0.24, 1] as const;

function Index() {
  const [[active, dir], setState] = useState<[string, number]>(["vet", 0]);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const idx = TABS.findIndex((t) => t.id === active);
  const current = TABS[idx];
  const Section = SECTIONS[active];

  const scrollToStage = () => {
    stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const open = (id: string) => {
    if (id === active) return scrollToStage();
    const next = TABS.findIndex((t) => t.id === id);
    setState([id, next > idx ? 1 : -1]);
    const top = stageRef.current?.getBoundingClientRect().top ?? 0;
    if (top > window.innerHeight * 0.6 || top < -40) scrollToStage();
  };

  const variants = {
    enter: (d: number) =>
      reduce ? { opacity: 0 } : { opacity: 0, x: d * 90, z: -260, rotateY: d * -16, scale: 0.94 },
    center: { opacity: 1, x: 0, z: 0, rotateY: 0, scale: 1 },
    exit: (d: number) =>
      reduce ? { opacity: 0 } : { opacity: 0, x: d * -90, z: -260, rotateY: d * 16, scale: 0.94 },
  };

  const prevTab = idx > 0 ? TABS[idx - 1] : undefined;
  const nextTab = idx < TABS.length - 1 ? TABS[idx + 1] : undefined;

  return (
    <div className="relative min-h-screen">
      <SpatialBackdrop />

      {/* Header: logo + theme toggle only (navigation lives in the dock) */}
      <header className="pointer-events-none fixed top-3 left-3 right-3 z-50 flex items-center justify-between gap-2 sm:top-4 sm:left-4 sm:right-4">
        <a
          href="#"
          className="glass-strong pointer-events-auto inline-flex shrink-0 items-center gap-2 rounded-full p-1 pr-2 text-sm font-semibold shadow-lg ring-1 ring-border/60 sm:gap-2.5 sm:pr-3"
          aria-label="Youssef Badawy — home"
          style={{ boxShadow: "0 6px 24px -8px color-mix(in oklab, var(--teal) 35%, transparent)" }}
        >
          <span
            className="grid h-8 w-8 place-items-center rounded-full bg-white ring-2 ring-primary/70 sm:h-9 sm:w-9"
            style={{ boxShadow: "0 2px 10px color-mix(in oklab, var(--teal) 35%, transparent)" }}
          >
            <img src={logo.url} alt="" aria-hidden="true" width={32} height={32} className="h-6 w-6 object-contain sm:h-7 sm:w-7" />
          </span>
          <span className="hidden sm:inline">Youssef Badawy</span>
        </a>

        <div className="pointer-events-auto shrink-0">
          <ThemeToggle />
        </div>
      </header>

      <main className="pt-20 sm:pt-24">
        <Hero onExplore={scrollToStage} />

        <div ref={stageRef} className="mx-auto max-w-6xl scroll-mt-6 px-3 pt-4 sm:px-4">
          <section className="spatial-stage relative pb-16" id={`panel-${active}`} role="tabpanel" aria-labelledby={`tab-${active}`}>
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={active}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduce ? 0.2 : 0.55, ease: spatialEase }}
                style={{ transformOrigin: "50% 30%" }}
              >
                <SpatialWindow
                  title={current.label}
                  icon={current.icon}
                  index={idx}
                  total={TABS.length}
                  prev={prevTab && { label: prevTab.label, onClick: () => open(prevTab.id) }}
                  next={nextTab && { label: nextTab.label, onClick: () => open(nextTab.id) }}
                >
                  <Section />
                </SpatialWindow>
              </motion.div>
            </AnimatePresence>
          </section>
        </div>

        <footer className="mx-auto max-w-6xl px-4 pb-32 sm:pb-36">
          <div className="glass flex flex-col items-center justify-between gap-3 rounded-3xl px-6 py-5 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="" aria-hidden="true" width={28} height={28} loading="lazy" className="h-7 w-7 rounded-full bg-card object-contain p-0.5" />
              <p className="text-sm font-semibold">Designed with passion for medicine and technology</p>
            </div>
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Dr. Youssef Badawy</p>
          </div>
        </footer>
      </main>

      <SpatialDock items={TABS} active={active} onChange={open} />
      <FloatingContact />
    </div>
  );
}
