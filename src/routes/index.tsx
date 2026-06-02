import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Stethoscope, Cpu, Film, Sparkles, Wrench, Briefcase, Mail } from "lucide-react";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { GlassTabs, type TabItem } from "@/components/glass-tabs";
import { FloatingContact } from "@/components/floating-contact";
import { Hero } from "@/components/hero";
import { VetSection } from "@/components/sections/vet-section";
import { DevSection } from "@/components/sections/dev-section";
import { VideoSection } from "@/components/sections/video-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";
import { AssistantSection } from "@/components/sections/assistant-section";
import logo from "@/assets/yb-logo.png.asset.json";

const SITE_TITLE = "Dr. Youssef Badawy — Veterinary Medicine, AI & Storytelling";
const SITE_DESC =
  "Portfolio of Dr. Youssef Badawy: veterinary practice, applied AI projects, and visual storytelling — wrapped in an iOS-inspired glassmorphism interface.";

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

// Reordered: Vet → Experience → AI/Dev → Skills → Video → Assistant → Contact
const TABS: TabItem[] = [
  { id: "vet", label: "Vet", icon: Stethoscope },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "dev", label: "AI", icon: Cpu },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "video", label: "Video", icon: Film },
  { id: "assistant", label: "Assistant", icon: Sparkles },
  { id: "contact", label: "Contact", icon: Mail },
];

function Index() {
  const [active, setActive] = useState("vet");
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollToTabs = () => {
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen">
      {/* Sticky header: logo + responsive center tab rail + theme toggle */}
      <header className="pointer-events-none fixed top-3 left-3 right-3 z-50 flex items-center gap-2 sm:top-4 sm:left-4 sm:right-4 sm:gap-3">
        <a
          href="#"
          className="glass pointer-events-auto inline-flex shrink-0 items-center gap-2 rounded-full px-2 py-1.5 text-sm font-semibold"
          aria-label="Youssef Badawy — home"
        >
          <img
            src={logo.url}
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-contain"
          />
          <span className="hidden pr-1 sm:inline">Youssef Badawy</span>
        </a>

        {/* Center: tabs rail that flexes to fill the space between logo and toggle */}
        <div className="pointer-events-auto min-w-0 flex-1">
          <div className="mx-auto w-full max-w-full">
            <GlassTabs items={TABS} active={active} onChange={setActive} compact />
          </div>
        </div>

        <div className="pointer-events-auto shrink-0">
          <ThemeToggle />
        </div>
      </header>

      <main className="pt-24">
        <Hero onExplore={scrollToTabs} />

        <div ref={tabsRef} className="mx-auto max-w-6xl px-4 pt-6">
          <section className="relative mt-2 pb-24" id={`panel-${active}`} role="tabpanel" aria-labelledby={`tab-${active}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {active === "vet" && <VetSection />}
                {active === "experience" && <ExperienceSection />}
                {active === "dev" && <DevSection />}
                {active === "skills" && <SkillsSection />}
                {active === "video" && <VideoSection />}
                {active === "assistant" && <AssistantSection />}
                {active === "contact" && <ContactSection />}
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
