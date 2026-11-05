import { useRef, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface DockItem {
  id: string;
  label: string;
  icon: LucideIcon;
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
        className="spatial-dock pointer-events-auto flex max-w-full items-center gap-0.5 rounded-full p-1.5 sm:gap-1 sm:p-2"
      >
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <button
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
              className={`dock-item group relative flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-12 sm:px-3.5 ${
                isActive ? "text-primary-foreground" : "text-foreground/75 hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="dock-active"
                  className="tab-indicator absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className="relative h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2.1} aria-hidden="true" />
              <span className={`relative hidden lg:inline ${isActive ? "" : "lg:hidden"}`}>{item.label}</span>
              {/* hover label (desktop, inactive items) */}
              {!isActive && (
                <span className="dock-tip pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold sm:block">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
