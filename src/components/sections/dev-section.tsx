import { useState } from "react";
import { TiltCard } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";
import { ProjectModal, type ProjectDetail } from "@/components/project-modal";
import { PhotoStrip } from "@/components/photo-strip";
import { Brain, Code2, Sparkles, Workflow, Database, Cpu } from "lucide-react";
import photoHotel from "@/assets/photos/photo-hotel.jpg.asset.json";
import photoSitting from "@/assets/photos/photo-sitting.webp.asset.json";

const projects: ProjectDetail[] = [
  {
    icon: Brain,
    title: "Clinical Decision Assistant",
    tag: "LLM · RAG",
    desc: "Retrieval-augmented assistant trained on veterinary literature for differential support.",
    longDesc:
      "A retrieval-augmented LLM assistant indexed over peer-reviewed veterinary literature. Surfaces differentials, dosage references, and contraindications with inline citations clinicians can verify in seconds.",
    highlights: ["Citation-first answers", "Per-species dosage tables", "Offline-capable on the desk", "Audit log for every query"],
  },
  {
    icon: Code2,
    title: "Practice Dashboard",
    tag: "React · TanStack",
    desc: "Patient timeline, lab trends, and reminders, fully responsive and offline-capable.",
    longDesc:
      "A keyboard-first dashboard for small practices. Patient timelines, lab trend charts, automated reminders, and an offline-first cache for spotty clinic Wi-Fi.",
    highlights: ["Realtime sync", "Offline-first PWA", "Bilingual UI (AR/EN)", "Role-based access"],
  },
  {
    icon: Sparkles,
    title: "Image Triage Model",
    tag: "Vision · ONNX",
    desc: "Lightweight classifier flagging radiograph anomalies for clinician review.",
    longDesc:
      "A compact ONNX model running on commodity hardware that flags likely abnormalities on canine and feline radiographs. Always advisory — never the final word.",
    highlights: ["<200ms inference", "Confidence thresholds", "Heatmap overlays", "DICOM-aware import"],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    tag: "n8n · Webhooks",
    desc: "Automated intake, follow-ups, and bilingual SMS confirmations.",
    longDesc:
      "An n8n graph automating patient intake forms, follow-up reminders, and bilingual SMS confirmations — freeing front-desk hours for actual care.",
    highlights: ["Bilingual templates", "Calendar sync", "Smart retry on failure", "GDPR-friendly logs"],
  },
  {
    icon: Database,
    title: "Knowledge Graph",
    tag: "Neo4j",
    desc: "Linked drugs, conditions, and species for fast contraindication lookups.",
    longDesc:
      "A Neo4j graph linking drugs, conditions, and species. Sub-second contraindication lookups powered by Cypher queries with editorial overrides.",
    highlights: ["10k+ entities", "Editorial overrides", "GraphQL surface", "Versioned snapshots"],
  },
  {
    icon: Cpu,
    title: "Edge Inference",
    tag: "WebGPU",
    desc: "Browser-side inference demos so the clinic team can prototype without a server.",
    longDesc:
      "WebGPU demos that run quantized models directly in the browser. Clinic teams prototype tools without provisioning any infrastructure.",
    highlights: ["Zero-install demos", "WebGPU + WASM fallback", "Quantized weights", "Private by default"],
  },
];

export function DevSection() {
  const [active, setActive] = useState<ProjectDetail | null>(null);

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
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  aria-label={`Open project: ${p.title}`}
                  className="group relative block h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl"
                >
                  <article className="glass relative h-full overflow-hidden rounded-3xl p-6">
                    <div
                      className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
                      style={{ background: "radial-gradient(circle, var(--teal-bright), transparent 70%)" }}
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-2xl glass-subtle">
                        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <p className="text-xs uppercase tracking-widest text-primary/80">{p.tag}</p>
                      <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                    </div>
                  </article>
                </button>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      <PhotoStrip
        title="Where ideas meet keyboards"
        variant="duo"
        items={[
          { src: photoHotel.url, alt: "Standing in a hotel lobby", caption: "Between meetings", aspect: "portrait" },
          { src: photoSitting.url, alt: "Working from a cafe", caption: "Quiet build sessions", aspect: "landscape" },
        ]}
      />

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
