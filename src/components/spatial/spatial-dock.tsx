import { useRef, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import type { MaterialIcon } from "@/components/material-icons";
import { Button } from "@/components/ui/button";

export interface DockItem {
  id: string;
  label: string;
  icon: MaterialIcon;
  tone: string;
}

interface SpatialDockProps {
  items: DockItem[];
  active: string;
  onChange: (id: string) => void;
}

/** visionOS-style floating glass dock — the site's main navigation. */
export function SpatialDock({ items, active, onChange }: SpatialDockProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const go = (i: number) => {
    if (!items.length) return;
    const idx = (i + items.length) % items.length;
    refs.current[idx]?.focus();
    onChange(items[idx].id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const map: Record<string, number> = {
      ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: items.length - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      go(map[e.key]);
    }
  };

  return (
    <motion.nav
      aria-label="Portfolio sections"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 220, damping: 26 }}
      className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-3 pointer-events-none"
    >
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="spatial-dock pointer-events-auto grid w-full max-w-4xl gap-0.5 rounded-3xl p-1.5 sm:gap-1 sm:p-2" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <Button variant="ghost"
              data-tone={item.tone}
              key={item.id}
              ref={(el) => { refs.current[i] = el; }}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              aria-label={item.label}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(item.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`dock-item section-scope group relative flex h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-0 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-16 sm:text-sm ${
                isActive ? "text-primary-foreground" : "text-primary hover:text-primary"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="dock-active"
                  className="tab-indicator absolute inset-0 rounded-2xl"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className="relative h-[18px] w-[18px] sm:h-5 sm:w-5" aria-hidden="true" />
              <span className="relative hidden max-w-full sm:block sm:text-xs">{item.label}</span>
              {/* hover label (desktop, inactive items) */}
              {!isActive && (
                <span className="dock-tip pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold sm:block">
                  {item.label}
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </motion.nav>
  );
}
