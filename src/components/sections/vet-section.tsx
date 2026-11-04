import { useState } from "react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";
import { ProjectModal, type ProjectDetail } from "@/components/project-modal";
import {
  Stethoscope, Microscope, HeartPulse, Syringe, Award, BookOpen,
  MapPin, Languages, Compass, Coffee,
} from "lucide-react";
import photoSchool from "@/assets/photos/photo-school.webp.asset.json";
import photoWalk from "@/assets/photos/photo-walk.webp.asset.json";
import photoStreet from "@/assets/photos/photo-street.webp.asset.json";

const cases: ProjectDetail[] = [
  {
    icon: Stethoscope,
    title: "Small Animal Clinic",
    tag: "Clinic",
    desc: "Hands-on diagnostics, soft-tissue surgery, and preventive care across 200+ cases.",
    longDesc:
      "Daily small-animal practice spanning diagnostics, soft-tissue surgery, and preventive medicine. 200+ documented cases with structured follow-up.",
    highlights: ["Structured intake protocol", "Surgical follow-up tracking", "Pet-owner education kits", "Bilingual records"],
  },
  {
    icon: Microscope,
    title: "Diagnostic Imaging",
    tag: "Imaging",
    desc: "Interpretation of radiographs, ultrasound, and lab panels for complex cases.",
    longDesc:
      "Reading radiographs and ultrasound for referring colleagues, with structured reports that double as teaching material for interns.",
    highlights: ["Structured reporting", "Teaching annotations", "Cross-modality correlation"],
  },
  {
    icon: HeartPulse,
    title: "Emergency & ICU",
    tag: "Critical Care",
    desc: "Triage and critical care rotations with monitored anesthesia recoveries.",
    longDesc: "Triage, stabilization, and post-op monitoring with calm, checklist-driven protocols that scale under pressure.",
    highlights: ["Checklist-driven triage", "Multi-parameter monitoring", "Family-side updates"],
  },
  {
    icon: Syringe,
    title: "Preventive Medicine",
    tag: "Public Health",
    desc: "Vaccination protocols and herd-health planning for companion and farm animals.",
    longDesc:
      "Designing vaccination schedules and herd-health plans for both companion and small-farm settings, with reminders sent via the workflow automations.",
    highlights: ["Tailored schedules", "Compliance dashboards", "Outbreak playbooks"],
  },
  {
    icon: Award,
    title: "Research",
    tag: "AMR",
    desc: "Co-authored work on antimicrobial resistance in companion animals.",
    longDesc:
      "Contributing author on regional studies of antimicrobial resistance patterns in companion-animal isolates. Open data where licensing allows.",
    highlights: ["Peer-reviewed", "Open datasets", "Reproducible notebooks"],
  },
  {
    icon: BookOpen,
    title: "Education",
    tag: "Outreach",
    desc: "Bilingual case write-ups and public-health outreach in Arabic & English.",
    longDesc:
      "Case write-ups, talks, and short videos in Arabic and English aimed at general practitioners and pet owners alike.",
    highlights: ["Bilingual case files", "Workshops & talks", "Plain-language explainers"],
  },
];

export function VetSection() {
  const [active, setActive] = useState<ProjectDetail | null>(null);

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Section 01</span>
          <h2 className="text-4xl font-semibold sm:text-5xl">
            Veterinary <span className="text-gradient-teal">Medicine</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Clinical practice grounded in evidence, compassion, and meticulous follow-up.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c, i) => {
          const Icon = c.icon;
          return (
            <Reveal key={c.title} delay={i * 0.05}>
              <TiltCard>
                <button
                  type="button"
                  onClick={() => setActive(c)}
                  aria-label={`Open case: ${c.title}`}
                  className="group block h-full w-full text-left rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <article className="glass h-full rounded-3xl p-6">
                    <div
                      className="mb-4 inline-grid h-11 w-11 place-items-center rounded-2xl"
                      style={{ background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }}
                    >
                      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold">{c.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                  </article>
                </button>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          {/* Animated photo collage — no captions */}
          <div className="relative h-[360px] sm:h-[420px]">
            <div
              className="absolute inset-0 -z-10 rounded-[2rem] blur-3xl opacity-40"
              style={{ background: "radial-gradient(60% 60% at 50% 50%, var(--teal-bright), transparent 70%)" }}
              aria-hidden="true"
            />
            {[
              { src: photoSchool.url, alt: "Academic moment", cls: "left-0 top-0 h-[58%] w-[52%]", float: { y: [0, -8, 0] }, dur: 6, rot: -2 },
              { src: photoWalk.url, alt: "Daily walk", cls: "right-0 top-[8%] h-[48%] w-[42%]", float: { y: [0, 10, 0] }, dur: 7, rot: 2 },
              { src: photoStreet.url, alt: "Field walk", cls: "left-[16%] bottom-0 h-[52%] w-[60%]", float: { y: [0, -6, 0] }, dur: 8, rot: -1 },
            ].map((p, i) => (
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
                    style={{ background: "linear-gradient(180deg, transparent 50%, color-mix(in oklab, var(--teal) 50%, transparent))" }}
                  />
                </motion.div>
              </motion.figure>
            ))}
          </div>

          {/* About-me mini cards — same family as the grid above, lighter rhythm */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">A bit about me</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: MapPin, label: "Based in", value: "Kafr El-Sheikh, EG" },
                { icon: Languages, label: "Languages", value: "Arabic · English" },
                { icon: Compass, label: "Focus", value: "Vet · AI · Storytelling" },
                { icon: Coffee, label: "Currently", value: "Building & learning" },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.article
                    key={c.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    whileHover={{ y: -3 }}
                    className="glass relative overflow-hidden rounded-2xl p-4"
                  >
                    <div className="mb-2 inline-grid h-9 w-9 place-items-center rounded-xl glass-subtle">
                      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-primary/70">{c.label}</p>
                    <p className="mt-0.5 text-sm font-semibold leading-snug">{c.value}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
