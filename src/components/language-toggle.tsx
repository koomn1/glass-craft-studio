import { motion } from "framer-motion";

import { useLanguage } from "@/i18n";

const options = [
  { value: "en" as const, label: "EN" },
  { value: "ar" as const, label: "ع" },
];

export function LanguageToggle() {
  const { lang, setLang, dir } = useLanguage();

  return (
    <div
      className="glass relative flex items-center rounded-full p-1"
      role="radiogroup"
      aria-label="Language"
    >
      {options.map((option) => {
        const active = lang === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={option.value === "en" ? "English" : "العربية"}
            onClick={() => setLang(option.value)}
            className="relative z-10 grid h-8 min-w-8 place-items-center rounded-full px-2 text-xs font-semibold tracking-[0.2em] text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {active && (
              <motion.span
                layoutId="language-active"
                className="tab-indicator absolute inset-0 rounded-full"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span
              className={`relative ${dir === "rtl" && option.value === "ar" ? "tracking-normal" : ""}`}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
