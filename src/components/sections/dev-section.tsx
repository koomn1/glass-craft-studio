import { TiltCard } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";
import { Brain, Code2, Sparkles, Workflow, Database, Cpu } from "lucide-react";

const projects = [
  { icon: Brain, title: "Clinical Decision Assistant", tag: "LLM · RAG", desc: "Retrieval-augmented assistant trained on veterinary literature for differential support." },
  { icon: Code2, title: "Practice Dashboard", tag: "React · TanStack", desc: "Patient timeline, lab trends, and reminders, fully responsive and offline-capable." },
  { icon: Sparkles, title: "Image Triage Model", tag: "Vision · ONNX", desc: "Lightweight classifier flagging radiograph anomalies for clinician review." },
  { icon: Workflow, title: "Workflow Automation", tag: "n8n · Webhooks", desc: "Automated intake, follow-ups, and bilingual SMS confirmations." },
  { icon: Database, title: "Knowledge Graph", tag: "Neo4j", desc: "Linked drugs, conditions, and species for fast contraindication lookups." },
  { icon: Cpu, title: "Edge Inference", tag: "WebGPU", desc: "Browser-side inference demos so the clinic team can prototype without a server." },
];

export function DevSection() {
  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Section 02</span>
          <h2 className="text-4xl font-semibold sm:text-5xl">
            AI &amp; <span className="text-gradient-teal">Development</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Pragmatic tools where medicine meets modern software — shipped, measured, iterated.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.title} delay={i * 0.05}>
              <TiltCard>
                <article className="glass group relative h-full overflow-hidden rounded-3xl p-6">
                  <div
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
                    style={{ background: "radial-gradient(circle, var(--teal-bright), transparent 70%)" }}
                  />
                  <div className="relative">
                    <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-2xl glass-subtle">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-primary/80">{p.tag}</p>
                    <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
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
