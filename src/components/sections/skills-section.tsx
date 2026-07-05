import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { TEAL_GRADIENT } from "@/lib/styles";

const technical = [
  { label: "Marketing & Digital Strategy", value: 85 },
  { label: "AI Tools (ChatGPT, MidJourney)", value: 90 },
  { label: "Python Programming", value: 60 },
  { label: "HTML / CSS", value: 70 },
  { label: "Social Media Marketing", value: 80 },
  { label: "Data Analytics", value: 55 },
];

const soft = ["Communication", "Problem Solving", "Creativity", "Leadership", "Adaptability", "Time Management"];
const ai = ["ChatGPT", "MidJourney", "Claude", "DALL·E", "Canva AI"];

export function SkillsSection() {
  return (
    <div className="space-y-8">
      <SectionHeader
        label="Section 05"
        title={<span className="text-gradient-teal">Skills</span>}
        description="A practical toolkit across marketing, AI, and engineering — kept sharp through daily work."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="glass h-full rounded-3xl p-6">
            <h3 className="mb-5 text-lg font-semibold">Technical Skills</h3>
            <ul className="space-y-4">
              {technical.map((s) => (
                <li key={s.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">{s.label}</span>
                    <span className="text-primary">{s.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-foreground/10">
                    <div
                      className="h-full rounded-full transition-[width] duration-700"
                      style={{
                        width: `${s.value}%`,
                        background: "linear-gradient(90deg, var(--teal), var(--teal-bright))",
                      }}
                      role="progressbar"
                      aria-valuenow={s.value}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={s.label}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-4">
            <div className="glass rounded-3xl p-6">
              <h3 className="mb-4 text-lg font-semibold">Soft Skills</h3>
              <ul className="flex flex-wrap gap-2">
                {soft.map((s) => (
                  <li
                    key={s}
                    className="glass-subtle rounded-full px-3 py-1.5 text-sm"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-3xl p-6">
              <h3 className="mb-4 text-lg font-semibold">AI Tools Proficiency</h3>
              <ul className="flex flex-wrap gap-2">
                {ai.map((s) => (
                  <li
                    key={s}
                    className="rounded-full px-3 py-1.5 text-sm text-primary-foreground"
                    style={{ background: TEAL_GRADIENT }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
