import { motion, AnimatePresence } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export interface GalleryItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
}

export interface ProjectDetail {
  icon: LucideIcon;
  title: string;
  tag: string;
  desc: string;
  longDesc?: string;
  highlights?: string[];
  link?: string;
  gallery?: GalleryItem[];
  challenge?: string;
  solution?: string;
  technologies?: string[];
}

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const open = !!project;
  const [view, setView] = useState("Overview");
  useEffect(() => setView("Overview"), [project]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <AnimatePresence>
        {open && project && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-foreground/40"
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild aria-describedby="case-study-description">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                className="project-dialog photo-frame motion-surface fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[min(92vw,860px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl p-0 focus:outline-none"
              >
                <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border/60 bg-background/95 p-6">
                  <div className="flex items-start gap-4">
                    <div className="tab-indicator grid h-12 w-12 shrink-0 place-items-center rounded-2xl">
                      <project.icon className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-primary/80">{project.tag}</p>
                      <DialogPrimitive.Title className="mt-1 text-2xl font-semibold">
                        {project.title}
                      </DialogPrimitive.Title>
                    </div>
                  </div>
                  <DialogPrimitive.Close asChild>
                    <Button variant="ghost" size="icon" aria-label="Close" className="glass shrink-0 rounded-full"><X className="h-4 w-4" aria-hidden="true" /></Button>
                  </DialogPrimitive.Close>
                </header>

                <div className="space-y-6 p-6">
                  <DialogPrimitive.Description id="case-study-description" className="text-sm text-muted-foreground">{project.desc}</DialogPrimitive.Description>
                  <div role="group" aria-label="Case study views" className="flex flex-wrap gap-2">
                    {["Overview", "Case study"].map(label => <Button key={label} variant={view === label ? "default" : "outline"} aria-pressed={view === label} onClick={() => setView(label)} className="rounded-full">{label}</Button>)}
                  </div>
                  {view === "Overview" ? <div><h3 className="mb-2 text-sm font-semibold text-primary">Overview</h3><p className="text-base leading-relaxed text-foreground/90">{project.longDesc ?? project.desc}</p></div> : <div className="space-y-6">
                    <section><h3 className="mb-2 text-sm font-semibold text-primary">Challenge</h3><p className="text-sm leading-relaxed">{project.challenge ?? project.desc}</p></section>
                    <section><h3 className="mb-2 text-sm font-semibold text-primary">Solution</h3><p className="text-sm leading-relaxed">{project.solution ?? project.longDesc ?? project.desc}</p></section>
                    <section><h3 className="mb-2 text-sm font-semibold text-primary">Technologies &amp; methods</h3><ul className="flex flex-wrap gap-2">{(project.technologies ?? project.tag.split(" · ")).map(tech => <li key={tech} className="glass-subtle rounded-full px-3 py-2 text-xs">{tech}</li>)}</ul></section>
                  </div>}

                  {project.highlights && project.highlights.length > 0 && (
                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Highlights</h3>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {project.highlights.map((h) => (
                          <li key={h} className="glass-subtle rounded-2xl px-4 py-3 text-sm">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.gallery && project.gallery.length > 0 && (
                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Gallery</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {project.gallery.map((g, i) =>
                          g.type === "image" ? (
                            <img
                              key={i}
                              src={g.src}
                              alt={g.alt ?? `${project.title} preview ${i + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="aspect-video w-full rounded-2xl object-cover"
                            />
                          ) : (
                            <video
                              key={i}
                              src={g.src}
                              poster={g.poster}
                              controls
                              preload="none"
                              className="aspect-video w-full rounded-2xl object-cover"
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tab-indicator inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Visit project <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
