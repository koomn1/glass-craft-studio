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
  return (
    <div
      role="tablist"
      aria-label="Sections"
      className="glass-strong sticky top-4 z-40 mx-auto flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-full p-1.5"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${item.id}`}
            id={`tab-${item.id}`}
            onClick={() => onChange(item.id)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-5 ${
              isActive ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-tab"
                className="tab-indicator absolute inset-0 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
