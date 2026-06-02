import { useRef, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface GlassTabsProps {
  items: TabItem[];
  active: string;
  onChange: (id: string) => void;
  /** When true, render a compact icon-only chip rail (for the header). */
  compact?: boolean;
}

export function GlassTabs({ items, active, onChange, compact = false }: GlassTabsProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusIndex = (i: number) => {
    const len = items.length;
    const idx = (i + len) % len;
    const el = refs.current[idx];
    if (el) {
      el.focus();
      onChange(items[idx].id);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusIndex(i + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusIndex(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusIndex(0);
        break;
      case "End":
        e.preventDefault();
        focusIndex(items.length - 1);
        break;
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Portfolio sections"
      aria-orientation="horizontal"
      className={
        compact
          ? "glass-strong flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full p-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          : "glass-strong sticky top-20 z-30 mx-auto flex w-full max-w-full items-center gap-1 overflow-x-auto rounded-full p-1.5 sm:top-4 sm:w-fit"
      }
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${item.id}`}
            aria-label={item.label}
            id={`tab-${item.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={
              compact
                ? `relative shrink-0 rounded-full p-2 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:px-3 lg:py-1.5 ${
                    isActive ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"
                  }`
                : `relative shrink-0 rounded-full px-3 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-4 sm:text-sm md:px-5 ${
                    isActive ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"
                  }`
            }
          >
            {isActive && (
              <motion.span
                layoutId={compact ? "active-tab-compact" : "active-tab"}
                className="tab-indicator absolute inset-0 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                aria-hidden="true"
              />
            )}
            <span className="relative flex items-center gap-1.5">
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className={compact ? "hidden lg:inline" : "hidden md:inline"}>{item.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
