import { useI18n } from "@/lib/i18n";
import logo from "@/assets/quiz-space/logo.svg";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useI18n();
  const name = lang === "ar" ? "كويز سبيس" : "Quiz Space";
  return (
    <a
      href="#top"
      className="group inline-flex items-center gap-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={name}
    >
      <span
        className="grid h-9 w-9 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 sm:h-10 sm:w-10"
        style={{ boxShadow: "0 6px 20px -6px color-mix(in oklab, var(--teal) 45%, transparent)" }}
      >
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
          className="h-full w-full"
        />
      </span>
      {!compact && (
        <span className="text-lg font-semibold tracking-tight">
          <span className="text-gradient-teal">{name.split(" ")[0]}</span>
          {name.includes(" ") ? (
            <span className="text-foreground"> {name.split(" ")[1]}</span>
          ) : null}
        </span>
      )}
      <span className="sr-only">{t("footer.tagline")}</span>
    </a>
  );
}
