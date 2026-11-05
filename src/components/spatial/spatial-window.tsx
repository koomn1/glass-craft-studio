import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";

interface SpatialWindowProps {
  title: string;
  icon: LucideIcon;
  index: number;
  total: number;
  prev?: { label: string; onClick: () => void };
  next?: { label: string; onClick: () => void };
  children: ReactNode;
}

/** A floating visionOS window: ornament on top, content, and the grab bar below. */
export function SpatialWindow({ title, icon: Icon, index, total, prev, next, children }: SpatialWindowProps) {
  return (
    <div className="relative">
      {/* Top ornament */}
      <div className="relative z-10 -mb-5 flex justify-center">
        <div className="spatial-ornament inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-semibold">
          <span className="tab-indicator grid h-7 w-7 place-items-center rounded-full text-primary-foreground">
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          {title}
          <span className="text-xs font-medium tabular-nums text-muted-foreground">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="spatial-window rounded-[2rem] px-4 pb-6 pt-10 sm:rounded-[2.5rem] sm:px-8 sm:pb-8 sm:pt-12">
        {children}

        {(prev || next) && (
          <div className="mt-10 flex items-center justify-between gap-3 border-t border-border pt-5">
            {prev ? (
              <button type="button" onClick={prev.onClick} className="spatial-chip group inline-flex items-center gap-1.5 rounded-full py-2 pl-2 pr-4 text-sm font-semibold">
                <ChevronLeft className="h-4 w-4 text-primary transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                {prev.label}
              </button>
            ) : <span />}
            {next ? (
              <button type="button" onClick={next.onClick} className="spatial-chip group inline-flex items-center gap-1.5 rounded-full py-2 pl-4 pr-2 text-sm font-semibold">
                {next.label}
                <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
            ) : <span />}
          </div>
        )}
      </div>

      {/* visionOS grab bar */}
      <div className="mt-3 flex items-center justify-center gap-2" aria-hidden="true">
        <span className="spatial-grab-dot h-2.5 w-2.5 rounded-full" />
        <span className="spatial-grab h-1.5 w-24 rounded-full sm:w-32" />
      </div>
    </div>
  );
}
