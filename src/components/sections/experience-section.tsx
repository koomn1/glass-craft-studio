import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { PhotoCollage } from "@/components/photo-collage";
import { TEAL_GRADIENT, TEAL_GLOW_CIRCLE } from "@/lib/styles";
import { Briefcase, Megaphone, Bot, Truck, Sparkles, HeartHandshake } from "lucide-react";
import photoCafe from "@/assets/photos/photo-cafe.jpg.asset.json";
import photoMoto from "@/assets/photos/photo-moto.jpg.asset.json";
import photoMirror from "@/assets/photos/photo-mirror.jpg.asset.json";

const current = {
  company: "Zaghdan Company for Import and Export of Perfumes",
  role: "Marketing & Operations Specialist",
  pillars: [
    {
      icon: Megaphone,
      title: "Marketing Strategy",
      desc: "Developing comprehensive marketing campaigns to expand brand reach and customer engagement.",
    },
    {
      icon: Bot,
      title: "AI-Powered Promotion",
      desc: "Utilizing cutting-edge AI tools for digital content creation and targeted advertising.",
    },
    {
      icon: Truck,
      title: "Operations Coordination",
      desc: "Streamlining import / export logistics and supplier relationships.",
    },
  ],
};

const additional = [
  {
    icon: Sparkles,
    title: "Freelance Digital Marketing",
    period: "2023 — Present",
    desc: "Digital marketing consultation and AI tool implementation for small businesses.",
  },
  {
    icon: HeartHandshake,
    title: "Medical Volunteer",
    period: "2022 — Present",
    desc: "Active participation in local health awareness campaigns and community medical events.",
  },
];

export function ExperienceSection() {
  return (
    <div className="space-y-8">
      <SectionHeader
        label="Section 06"
        title={<span className="text-gradient-teal">Experience</span>}
        description="Blending technology with creativity across marketing, operations, and community work."
      />

      <Reveal delay={0.05}>
        <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-50 blur-3xl"
            style={{ background: TEAL_GLOW_CIRCLE }}
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="grid h-11 w-11 place-items-center rounded-2xl"
                style={{ background: TEAL_GRADIENT }}
              >
                <Briefcase className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary/80">Current Position</p>
                <h3 className="text-xl font-semibold">{current.company}</h3>
                <p className="text-sm text-muted-foreground">{current.role}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {current.pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="glass-subtle rounded-2xl p-4">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h4 className="mt-2 text-sm font-semibold">{p.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Additional Experience</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {additional.map((a) => {
              const Icon = a.icon;
              return (
                <article key={a.title} className="glass rounded-3xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl glass-subtle">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold">{a.title}</h4>
                      <p className="text-xs text-primary">{a.period}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <PhotoCollage
          className="relative mx-auto h-[360px] w-full max-w-3xl sm:h-[420px]"
          items={[
            { src: photoCafe.url, alt: "Marketing moment", cls: "left-0 top-0 h-[58%] w-[44%]", float: { y: [0, -10, 0] }, dur: 6, rot: -2 },
            { src: photoMoto.url, alt: "On the move", cls: "right-0 top-[10%] h-[52%] w-[42%]", float: { y: [0, 8, 0] }, dur: 7, rot: 2 },
            { src: photoMirror.url, alt: "Brand reflection", cls: "left-[22%] bottom-0 h-[54%] w-[56%]", float: { y: [0, -6, 0] }, dur: 8, rot: -1 },
          ]}
        />
      </Reveal>
    </div>
  );
}
