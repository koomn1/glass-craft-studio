import { TiltCard } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";
import { Play, Film, Mic, Camera } from "lucide-react";

const items = [
  { icon: Play, title: "Case of the Week", meta: "Short · 1:24", desc: "Bite-sized clinical reasoning for general practitioners." },
  { icon: Film, title: "Behind the Surgery", meta: "Film · 6:40", desc: "A cinematic look at a soft-tissue procedure, narrated step by step." },
  { icon: Mic, title: "Vet × Tech Podcast", meta: "Audio · 32:11", desc: "Conversations on AI tooling in everyday veterinary practice." },
  { icon: Camera, title: "Field Notes", meta: "Series · ongoing", desc: "Rural visits documented with a quiet, observational lens." },
];

export function VideoSection() {
  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-col gap-3">
          <span className="eyebrow"><span className="eyebrow-num">05</span>Video</span>
          <h2 className="section-title">
            Video &amp; <span className="text-gradient-teal">Interactive</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Visual storytelling that translates clinical work for a wider audience.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <Reveal key={it.title} delay={i * 0.06}>
              <TiltCard intensity={6}>
                <article className="glass group relative aspect-[16/10] overflow-hidden rounded-3xl p-6">
                  <div
                    className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-80"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.52 0.09 195 / 0.35), oklch(0.91 0.05 60 / 0.25))",
                    }}
                  />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="glass-subtle rounded-full px-3 py-1 text-xs">{it.meta}</span>
                      <span
                        className="grid h-12 w-12 place-items-center rounded-full transition-transform group-hover:scale-110"
                        style={{ background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">{it.title}</h3>
                      <p className="mt-1 max-w-md text-sm text-muted-foreground">{it.desc}</p>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
