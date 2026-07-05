import { Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function LangToggle() {
  const { toggleLang, t } = useI18n();
  return (
    <button
      onClick={toggleLang}
      className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Switch language"
    >
      <Languages className="h-4 w-4" />
      <span>{t("toggle.lang")}</span>
    </button>
  );
}
