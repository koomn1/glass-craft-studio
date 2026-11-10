import { useState } from "react";
import { TiltCard } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";
import { ProjectModal, type ProjectDetail } from "@/components/project-modal";
import { PhotoStrip } from "@/components/photo-strip";
import { Brain, Code2, Sparkles, Workflow, Database, Cpu } from "lucide-react";
import photoHotel from "@/assets/photos/photo-hotel.webp.asset.json";
import photoMirror2 from "@/assets/photos/photo-mirror2.webp.asset.json";
import { Button } from "@/components/ui/button";
import { usePortfolio, toDetail } from "@/lib/portfolio";

const fallbackProjects: ProjectDetail[] = [
  {
    icon: Brain,
    title: "Clinical Decision Assistant",
    tag: "LLM · RAG",
    challenge: "Make veterinary literature easier to consult while keeping clinical references verifiable.",
    desc: "Retrieval-augmented assistant trained on veterinary literature for differential support.",
    longDesc:
      "A retrieval-augmented LLM assistant indexed over peer-reviewed veterinary literature. Surfaces differentials, dosage references, and contraindications with inline citations clinicians can verify in seconds.",
    highlights: ["Citation-first answers", "Per-species dosage tables", "Offline-capable on the desk", "Audit log for every query"],
  },
  {
    icon: Code2,
    title: "Practice Dashboard",
    tag: "React · TanStack",
    challenge: "Keep patient history, lab trends and reminders accessible during unreliable clinic connectivity.",
    desc: "Patient timeline, lab trends, and reminders, fully responsive and offline-capable.",
    longDesc:
      "A keyboard-first dashboard for small practices. Patient timelines, lab trend charts, automated reminders, and an offline-first cache for spotty clinic Wi-Fi.",
    highlights: ["Realtime sync", "Offline-first PWA", "Bilingual UI (AR/EN)", "Role-based access"],
  },
  {
    icon: Sparkles,
    title: "Image Triage Model",
    tag: "Vision · ONNX",
    challenge: "Support radiograph review with lightweight, advisory anomaly detection.",
    desc: "Lightweight classifier flagging radiograph anomalies for clinician review.",
    longDesc:
      "A compact ONNX model running on commodity hardware that flags likely abnormalities on canine and feline radiographs. Always advisory — never the final word.",
    highlights: ["<200ms inference", "Confidence thresholds", "Heatmap overlays", "DICOM-aware import"],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    tag: "n8n · Webhooks",
    challenge: "Reduce repetitive intake and follow-up work for the front desk.",
    desc: "Automated intake, follow-ups, and bilingual SMS confirmations.",
    longDesc:
      "An n8n graph automating patient intake forms, follow-up reminders, and bilingual SMS confirmations — freeing front-desk hours for actual care.",
    highlights: ["Bilingual templates", "Calendar sync", "Smart retry on failure", "GDPR-friendly logs"],
  },
  {
    icon: Database,
    title: "Knowledge Graph",
    tag: "Neo4j",
    challenge: "Connect species, drugs and conditions for efficient contraindication checks.",
    desc: "Linked drugs, conditions, and species for fast contraindication lookups.",
    longDesc:
      "A Neo4j graph linking drugs, conditions, and species. Sub-second contraindication lookups powered by Cypher queries with editorial overrides.",
    highlights: ["10k+ entities", "Editorial overrides", "GraphQL surface", "Versioned snapshots"],
  },
  {
    icon: Cpu,
    title: "Edge Inference",
    tag: "WebGPU",
    challenge: "Let clinic teams prototype inference tools without provisioning a server.",
    desc: "Browser-side inference demos so the clinic team can prototype without a server.",
    longDesc:
      "WebGPU demos that run quantized models directly in the browser. Clinic teams prototype tools without provisioning any infrastructure.",
    highlights: ["Zero-install demos", "WebGPU + WASM fallback", "Quantized weights", "Private by default"],
  },
];

export function DevSection() {
  const [active, setActive] = useState<ProjectDetail | null>(null);
  const { data } = usePortfolio("project");
  const projects = data ? data.map(toDetail) : fallbackProjects;

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-col gap-3">
          <span className="eyebrow"><span className="eyebrow-num">03</span>AI &amp; Dev</span>
          <h2 className="section-title">
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
            <Reveal key={`${p.title}-${i}`} delay={i * 0.05}>
              <TiltCard>
                <Button variant="ghost"
                  type="button"
                  onClick={() => setActive(p)}
                  aria-label={`Open project: ${p.title}`}
                  className="group relative block h-full w-full whitespace-normal p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl"
                >
                  <article className="glass relative h-full overflow-hidden rounded-3xl p-6">
                    <div
                      className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 transition-opacity group-hover:opacity-50"
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
                </Button>
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
          { src: photoMirror2.url, alt: "Reflection moment", caption: "Quiet build sessions", aspect: "portrait" },
        ]}
      />

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
