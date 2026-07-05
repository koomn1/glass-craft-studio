import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/i18n";

const linkGroups = [
  {
    titleKey: "footer.product",
    entries: [
      { labelKey: "footer.links.product.features", href: "#features" },
      { labelKey: "footer.links.product.templates", href: "#templates" },
      { labelKey: "footer.links.product.pricing", href: "#cta" },
    ],
  },
  {
    titleKey: "footer.company",
    entries: [
      { labelKey: "footer.links.company.about", href: "#top" },
      { labelKey: "footer.links.company.careers", href: "#how-it-works" },
      { labelKey: "footer.links.company.contact", href: "#stats" },
    ],
  },
  {
    titleKey: "footer.legal",
    entries: [
      { labelKey: "footer.links.legal.privacy", href: "#top" },
      { labelKey: "footer.links.legal.terms", href: "#top" },
      { labelKey: "footer.links.legal.cookies", href: "#top" },
    ],
  },
] as const;

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:pb-12">
      <div className="glass rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_auto] lg:items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/quiz-space-logo.svg" alt="" aria-hidden="true" className="h-10 w-10" />
              <div>
                <p className="text-lg font-semibold tracking-tight">Quiz Space</p>
                <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">{t("hero.subtitle")}</p>
            <p className="text-xs text-muted-foreground">
              {t("footer.copyright").replace("{year}", String(year))}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 lg:justify-self-center">
            {linkGroups.map((group) => (
              <div key={group.titleKey} className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/80">
                  {t(group.titleKey)}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {group.entries.map((entry) => (
                    <li key={entry.labelKey}>
                      <a href={entry.href} className="transition-colors hover:text-foreground">
                        {t(entry.labelKey)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-3 lg:justify-self-end">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {t("footer.languageLabel")}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
