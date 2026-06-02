import { useState } from "react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";
import { ProjectModal, type ProjectDetail } from "@/components/project-modal";
import {
  Stethoscope, Microscope, HeartPulse, Syringe, Award, BookOpen,
  MapPin, Languages, Compass, Coffee,
} from "lucide-react";
import photoSchool from "@/assets/photos/photo-school.jpg.asset.json";
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

      <PhotoStrip
        title="On the ground"
        items={[
          { src: photoSchool.url, alt: "At Regent British School", caption: "Academic roots", aspect: "square" },
          { src: photoWalk.url, alt: "Outside the campus", caption: "Daily reflection", aspect: "portrait" },
          { src: photoStreet.url, alt: "Walking through Sky compound", caption: "Field walks", aspect: "portrait" },
        ]}
      />

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
