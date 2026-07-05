import { createFileRoute } from "@tanstack/react-router";

import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/quiz-space/header";
import { Hero } from "@/components/quiz-space/sections/hero";
import { Features } from "@/components/quiz-space/sections/features";
import { HowItWorks } from "@/components/quiz-space/sections/how-it-works";
import { QuizTypes } from "@/components/quiz-space/sections/quiz-types";
import { CTA } from "@/components/quiz-space/sections/cta";
import { SiteFooter } from "@/components/quiz-space/sections/site-footer";

const SITE_TITLE = "Quiz Space — Create quizzes that feel like outer space";
const SITE_DESC =
  "Quiz Space is a calm, delightful place to build, share, and grade quizzes. AI-assisted, collaborative, and beautiful in light or dark mode.";

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Quiz Space",
  applicationCategory: "EducationApplication",
  operatingSystem: "Web",
  description: SITE_DESC,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export const Route = createFileRoute("/quiz-space")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { name: "theme-color", content: "#007979" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Quiz Space" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
    ],
    links: [{ rel: "icon", type: "image/svg+xml", href: "/quiz-space-icon.svg" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSONLD) }],
  }),
  component: QuizSpacePage,
});

function QuizSpacePage() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="relative min-h-screen overflow-x-hidden">
          <Header />
          <main>
            <Hero />
            <Features />
            <HowItWorks />
            <QuizTypes />
            <CTA />
          </main>
          <SiteFooter />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
