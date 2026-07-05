import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

const options = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
] as const;

export function ThemeToggle() {
  const { resolved, setTheme } = useTheme();
  return (
    <div
      className="glass relative flex items-center gap-1 rounded-full p-1"
      role="radiogroup"
      aria-label="Theme"
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = resolved === opt.value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            aria-label={opt.label}
            onClick={() => setTheme(opt.value)}
            className="relative z-10 grid h-8 w-8 place-items-center rounded-full text-foreground/70 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {active && (
              <motion.span
                layoutId="theme-active"
                className="tab-indicator absolute inset-0 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon className={`relative h-4 w-4 ${active ? "text-primary-foreground" : ""}`} />
          </button>
        );
      })}
    </div>
  );
}
