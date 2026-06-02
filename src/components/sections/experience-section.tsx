import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
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
      <Reveal>
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Section 06</span>
          <h2 className="text-4xl font-semibold sm:text-5xl">
            <span className="text-gradient-teal">Experience</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Blending technology with creativity across marketing, operations, and community work.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-50 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--teal-bright), transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="grid h-11 w-11 place-items-center rounded-2xl"
                style={{ background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }}
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
        <div className="relative mx-auto h-[360px] w-full max-w-3xl sm:h-[420px]">
          <div
            className="absolute inset-0 -z-10 rounded-[2rem] blur-3xl opacity-40"
            style={{ background: "radial-gradient(60% 60% at 50% 50%, var(--teal-bright), transparent 70%)" }}
            aria-hidden="true"
          />
          {[
            { src: photoCafe.url, alt: "Marketing moment", cls: "left-0 top-0 h-[58%] w-[44%]", float: { y: [0, -10, 0] }, dur: 6, rot: -2 },
            { src: photoMoto.url, alt: "On the move", cls: "right-0 top-[10%] h-[52%] w-[42%]", float: { y: [0, 8, 0] }, dur: 7, rot: 2 },
            { src: photoMirror.url, alt: "Brand reflection", cls: "left-[22%] bottom-0 h-[54%] w-[56%]", float: { y: [0, -6, 0] }, dur: 8, rot: -1 },
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
      </Reveal>
    </div>
  );
}
