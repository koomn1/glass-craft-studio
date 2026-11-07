import { useState } from "react";
import { Calculator, Globe, Brain, Film, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Reveal } from "@/components/reveal";
import { projectBriefLinks, type ProjectBrief } from "@/lib/project-estimator";

const types = [{ label: "Website", icon: Globe }, { label: "AI & Automation", icon: Brain }, { label: "Video & Content", icon: Film }];
const services: Record<string, string[]> = {
  Website: ["UI/UX design", "Development", "Content", "Ongoing support"],
  "AI & Automation": ["AI assistant", "Workflow automation", "Data integration", "Ongoing support"],
  "Video & Content": ["Creative direction", "Video editing", "Motion graphics", "Social content"],
};

export function EstimatorSection() {
  const [brief, setBrief] = useState<ProjectBrief>({ type: "Website", services: ["UI/UX design", "Development"], budget: 1000, currency: "USD", name: "", email: "", notes: "" });
  const links = projectBriefLinks(brief);
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");
  return <div className="space-y-8">
    <Reveal><span className="eyebrow"><span className="eyebrow-num">07</span>Project Estimator</span><h2 className="section-title mt-3">Shape your <span className="text-gradient-teal">next project</span></h2><p className="mt-3 text-muted-foreground">Your scope. Your budget. A tailored quote.</p></Reveal>
    <form onSubmit={event => { event.preventDefault(); if (channel === "whatsapp") window.open(links.whatsapp, "_blank", "noopener,noreferrer"); else window.location.href = links.email; }} className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="min-w-0 space-y-7">
        <fieldset><legend className="mb-3 text-sm font-semibold">Project type</legend><div className="grid gap-2 sm:grid-cols-3">{types.map(({ label, icon: Icon }) => <Button key={label} variant="ghost" type="button" aria-pressed={brief.type === label} onClick={() => setBrief({ ...brief, type: label, services: [] })} className={`h-auto min-h-16 whitespace-normal rounded-2xl border px-3 py-4 ${brief.type === label ? "border-primary bg-primary/10 text-primary" : "glass-subtle"}`}><Icon />{label}</Button>)}</div></fieldset>
        <fieldset><legend className="mb-3 text-sm font-semibold">Services</legend><div className="grid gap-3 sm:grid-cols-2">{services[brief.type]?.map(service => <label key={service} className="glass-subtle flex cursor-pointer items-center gap-3 rounded-xl p-4"><Checkbox checked={brief.services.includes(service)} onCheckedChange={checked => setBrief({ ...brief, services: checked === true ? [...brief.services, service] : brief.services.filter(value => value !== service) })} /><span className="text-sm">{service}</span></label>)}</div></fieldset>
        <div className="space-y-4"><div className="flex flex-wrap items-center justify-between gap-3"><label htmlFor="project-budget" className="text-sm font-semibold">Available budget</label><select aria-label="Budget currency" className="rounded-lg border border-input bg-background p-2 text-sm" value={brief.currency} onChange={event => setBrief({ ...brief, currency: event.target.value })}><option>USD</option><option>EGP</option><option>EUR</option></select></div><div className="flex items-center gap-3"><input id="project-budget" type="number" min="1" max="10000000" required value={brief.budget} onChange={event => setBrief({ ...brief, budget: Number(event.target.value) })} className="glass-subtle min-w-0 flex-1 rounded-xl px-4 py-3 text-xl font-semibold" /><span className="text-sm text-muted-foreground">{brief.currency}</span></div><Slider aria-label="Adjust budget" min={100} max={brief.currency === "EGP" ? 100000 : 10000} step={100} value={[Math.min(brief.budget, brief.currency === "EGP" ? 100000 : 10000)]} onValueChange={values => setBrief({ ...brief, budget: values[0] ?? 100 })} /></div>
        <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="project-name" className="mb-2 block text-sm">Your name</label><input id="project-name" required maxLength={100} value={brief.name} onChange={event => setBrief({ ...brief, name: event.target.value })} className="glass-subtle w-full rounded-xl px-4 py-3" /></div><div><label htmlFor="project-email" className="mb-2 block text-sm">Email (optional)</label><input id="project-email" type="email" maxLength={254} value={brief.email} onChange={event => setBrief({ ...brief, email: event.target.value })} className="glass-subtle w-full rounded-xl px-4 py-3" /></div></div>
        <div><label htmlFor="project-notes" className="mb-2 block text-sm">Project details</label><textarea id="project-notes" rows={4} maxLength={3000} value={brief.notes} onChange={event => setBrief({ ...brief, notes: event.target.value })} className="glass-subtle w-full resize-y rounded-xl px-4 py-3" /></div>
      </div>
      <aside className="min-w-0 space-y-5 border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0"><Calculator className="h-8 w-8 text-primary" /><h3 className="text-xl font-semibold">Project brief</h3><dl className="space-y-5"><div><dt className="text-xs text-muted-foreground">Project</dt><dd className="mt-1 font-semibold">{brief.type}</dd></div><div><dt className="text-xs text-muted-foreground">Services · {brief.services.length}</dt><dd className="mt-1 text-sm leading-relaxed">{brief.services.join(" · ") || "Select your services"}</dd></div><div><dt className="text-xs text-muted-foreground">Your budget</dt><dd className="mt-1 text-3xl font-bold break-words">{brief.budget.toLocaleString("en-US")} <span className="text-base text-muted-foreground">{brief.currency}</span></dd></div></dl><p className="text-xs leading-relaxed text-muted-foreground">Final pricing is quoted after reviewing your requirements. This budget is not a fixed price.</p><div className="flex flex-col gap-3"><Button type="submit" onClick={() => setChannel("whatsapp")} className="tab-indicator h-12 rounded-full"><MessageCircle />Continue on WhatsApp</Button><Button type="submit" variant="outline" onClick={() => setChannel("email")} className="h-12 rounded-full"><Mail />Open email draft</Button></div></aside>
    </form>
  </div>;
}