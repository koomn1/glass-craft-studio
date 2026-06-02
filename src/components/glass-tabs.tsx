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
}

export function GlassTabs({ items, active, onChange }: GlassTabsProps) {
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
      className="glass-strong sticky top-4 z-40 mx-auto flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-full p-1.5"
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
            id={`tab-${item.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-5 ${
              isActive ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-tab"
                className="tab-indicator absolute inset-0 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                aria-hidden="true"
              />
            )}
            <span className="relative flex items-center gap-2">
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sr-only sm:hidden">{item.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
