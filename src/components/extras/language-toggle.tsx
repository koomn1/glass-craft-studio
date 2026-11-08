import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <Button variant="ghost" type="button" onClick={() => setLang(lang === "en" ? "ar" : "en")}
      aria-label={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
      className="glass h-10 rounded-full px-3 text-sm font-semibold">
      {lang === "en" ? "ع" : "EN"}
    </Button>
  );
}
