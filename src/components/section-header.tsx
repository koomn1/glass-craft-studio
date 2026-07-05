import { type ReactNode } from "react";
import { Reveal } from "@/components/reveal";

interface SectionHeaderProps {
  /** Small eyebrow label, e.g. "Section 01". */
  label: string;
  /** Heading content; wrap the accented word in `<span className="text-gradient-teal">`. */
  title: ReactNode;
  /** Supporting paragraph shown under the heading. */
  description: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <Reveal>
      <div className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-primary">{label}</span>
        <h2 className="text-4xl font-semibold sm:text-5xl">{title}</h2>
        <p className="max-w-2xl text-muted-foreground">{description}</p>
      </div>
    </Reveal>
  );
}
