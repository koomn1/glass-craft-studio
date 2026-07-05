import { useI18n } from "@/lib/i18n";
import { BrandLogo } from "../logo";

export function SiteFooter() {
  const { t, lang } = useI18n();
  const cols = [
    {
      title: t("footer.product"),
      links: [t("nav.features"), t("nav.how"), t("nav.types"), t("nav.pricing")],
    },
    { title: t("footer.company"), links: ["About", "Blog", "Careers", "Contact"] },
    { title: t("footer.legal"), links: ["Privacy", "Terms", "Security", "Cookies"] },
  ];
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="max-w-xs">
          <BrandLogo />
          <p className="mt-4 text-sm text-muted-foreground">{t("footer.tagline")}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="text-sm font-semibold">{c.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {lang === "ar" ? "كويز سبيس" : "Quiz Space"}.{" "}
        {t("footer.rights")}
      </div>
    </footer>
  );
}
