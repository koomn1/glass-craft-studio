import { createFileRoute } from "@tanstack/react-router";

import { ThemeProvider } from "@/components/theme-provider";
import {
  Navbar,
  Hero,
  Features,
  HowItWorks,
  Templates,
  Stats,
  Cta,
  Footer,
} from "@/components/quiz";
import { LanguageProvider } from "@/i18n";

const SITE_TITLE = "Quiz Space — Create quizzes people love";
const SITE_DESC =
  "Quiz Space is a calm, modern landing page for a quiz builder that helps creators design, share, and analyze quizzes in minutes.";

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Quiz Space",
  url: "/",
  inLanguage: ["en", "ar"],
};

const SOFTWARE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Quiz Space",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description: SITE_DESC,
  url: "/",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { name: "theme-color", content: "#5c8f8a" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Quiz Space" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(WEBSITE_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(SOFTWARE_JSONLD) },
    ],
  }),
  component: () => (
    <ThemeProvider>
      <LanguageProvider>
        <Index />
      </LanguageProvider>
    </ThemeProvider>
  ),
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Templates />
        <Stats />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
