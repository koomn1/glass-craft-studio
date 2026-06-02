import { TiltCard } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";
import { Stethoscope, Microscope, HeartPulse, Syringe, Award, BookOpen } from "lucide-react";

const cases = [
  { icon: Stethoscope, title: "Small Animal Clinic", desc: "Hands-on diagnostics, soft-tissue surgery, and preventive care across 200+ cases." },
  { icon: Microscope, title: "Diagnostic Imaging", desc: "Interpretation of radiographs, ultrasound, and lab panels for complex cases." },
  { icon: HeartPulse, title: "Emergency & ICU", desc: "Triage and critical care rotations with monitored anesthesia recoveries." },
  { icon: Syringe, title: "Preventive Medicine", desc: "Vaccination protocols and herd-health planning for companion and farm animals." },
  { icon: Award, title: "Research", desc: "Co-authored work on antimicrobial resistance in companion animals." },
  { icon: BookOpen, title: "Education", desc: "Bilingual case write-ups and public-health outreach in Arabic & English." },
];

export function VetSection() {
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
                <article className="glass group h-full rounded-3xl p-6">
                  <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-2xl" style={{ background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </article>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
