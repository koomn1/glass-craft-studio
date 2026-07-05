import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

const STORAGE_KEY = "quizspace-lang";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.features": "Features",
  "nav.how": "How it works",
  "nav.types": "Quiz types",
  "nav.pricing": "Pricing",
  "nav.signin": "Sign in",
  "nav.start": "Start free",

  "hero.badge": "New · AI-assisted quiz builder",
  "hero.title1": "Create quizzes that feel like",
  "hero.titleAccent": "outer space",
  "hero.subtitle":
    "Quiz Space is a calm, delightful place to build, share, and grade quizzes. Drag, drop, and launch in minutes — no clutter, just flow.",
  "hero.ctaPrimary": "Start building free",
  "hero.ctaSecondary": "Watch demo",
  "hero.stat1": "Quizzes created",
  "hero.stat2": "Happy creators",
  "hero.stat3": "Avg. build time",

  "features.title": "Everything you need to build great quizzes",
  "features.subtitle": "Thoughtful tools that stay out of your way.",
  "features.f1.title": "Drag & drop builder",
  "features.f1.desc": "Assemble questions visually. Reorder, duplicate, and preview instantly.",
  "features.f2.title": "AI question generator",
  "features.f2.desc": "Describe a topic and let Quiz Space draft balanced questions for you.",
  "features.f3.title": "Auto grading",
  "features.f3.desc": "Instant scoring with detailed explanations and per-question analytics.",
  "features.f4.title": "Beautiful themes",
  "features.f4.desc": "Calm, accessible palettes that look great in light and dark mode.",
  "features.f5.title": "Real-time collaboration",
  "features.f5.desc": "Invite teammates and build together with live cursors and comments.",
  "features.f6.title": "Share anywhere",
  "features.f6.desc": "A single link works on any device — no installs, no friction.",

  "how.title": "Launch in three simple steps",
  "how.subtitle": "From idea to live quiz in minutes.",
  "how.s1.title": "Create",
  "how.s1.desc": "Start from scratch or a template, then add questions your way.",
  "how.s2.title": "Customize",
  "how.s2.desc": "Pick a calm theme, set rules, timers, and scoring.",
  "how.s3.title": "Share & analyze",
  "how.s3.desc": "Send the link and watch results roll in with live insights.",

  "types.title": "Built for every kind of quiz",
  "types.subtitle": "Mix and match question formats freely.",
  "types.t1": "Multiple choice",
  "types.t2": "True / False",
  "types.t3": "Short answer",
  "types.t4": "Image based",
  "types.t5": "Polls & surveys",
  "types.t6": "Timed challenges",

  "cta.title": "Ready to launch your first quiz?",
  "cta.subtitle": "Join thousands of creators building calmer, smarter quizzes.",
  "cta.button": "Get started — it's free",

  "footer.tagline": "A calmer way to create quizzes.",
  "footer.product": "Product",
  "footer.company": "Company",
  "footer.legal": "Legal",
  "footer.rights": "All rights reserved.",

  "toggle.lang": "العربية",
};

const ar: Dict = {
  "nav.features": "المميزات",
  "nav.how": "كيف يعمل",
  "nav.types": "أنواع الاختبارات",
  "nav.pricing": "الأسعار",
  "nav.signin": "تسجيل الدخول",
  "nav.start": "ابدأ مجانًا",

  "hero.badge": "جديد · منشئ اختبارات بالذكاء الاصطناعي",
  "hero.title1": "أنشئ اختبارات تشبه",
  "hero.titleAccent": "الفضاء الرحب",
  "hero.subtitle":
    "كويز سبيس مساحة هادئة وممتعة لإنشاء الاختبارات ومشاركتها وتصحيحها. اسحب وأفلت وأطلق في دقائق — بلا فوضى، فقط انسيابية.",
  "hero.ctaPrimary": "ابدأ الإنشاء مجانًا",
  "hero.ctaSecondary": "شاهد العرض",
  "hero.stat1": "اختبار تم إنشاؤه",
  "hero.stat2": "منشئ سعيد",
  "hero.stat3": "متوسط وقت الإنشاء",

  "features.title": "كل ما تحتاجه لإنشاء اختبارات رائعة",
  "features.subtitle": "أدوات مدروسة لا تعترض طريقك.",
  "features.f1.title": "منشئ بالسحب والإفلات",
  "features.f1.desc": "كوّن الأسئلة بصريًا. أعد الترتيب والتكرار والمعاينة فورًا.",
  "features.f2.title": "مولّد أسئلة ذكي",
  "features.f2.desc": "صف موضوعًا ودع كويز سبيس يصيغ لك أسئلة متوازنة.",
  "features.f3.title": "تصحيح تلقائي",
  "features.f3.desc": "تقييم فوري مع شروحات مفصلة وتحليلات لكل سؤال.",
  "features.f4.title": "ثيمات جميلة",
  "features.f4.desc": "ألوان هادئة وسهلة الوصول تبدو رائعة في الوضعين الفاتح والداكن.",
  "features.f5.title": "تعاون فوري",
  "features.f5.desc": "ادعُ زملاءك وابنوا معًا مع المؤشرات والتعليقات المباشرة.",
  "features.f6.title": "شارك في أي مكان",
  "features.f6.desc": "رابط واحد يعمل على أي جهاز — دون تثبيت ودون عناء.",

  "how.title": "أطلق اختبارك في ثلاث خطوات بسيطة",
  "how.subtitle": "من الفكرة إلى اختبار مباشر في دقائق.",
  "how.s1.title": "أنشئ",
  "how.s1.desc": "ابدأ من الصفر أو من قالب، ثم أضف الأسئلة بطريقتك.",
  "how.s2.title": "خصّص",
  "how.s2.desc": "اختر ثيمًا هادئًا واضبط القواعد والمؤقتات والتقييم.",
  "how.s3.title": "شارك وحلّل",
  "how.s3.desc": "أرسل الرابط وشاهد النتائج تتوالى مع رؤى مباشرة.",

  "types.title": "مصمم لكل أنواع الاختبارات",
  "types.subtitle": "امزج بين صيغ الأسئلة بحرية.",
  "types.t1": "اختيار من متعدد",
  "types.t2": "صح / خطأ",
  "types.t3": "إجابة قصيرة",
  "types.t4": "قائم على الصور",
  "types.t5": "استطلاعات ومسوح",
  "types.t6": "تحديات موقوتة",

  "cta.title": "جاهز لإطلاق اختبارك الأول؟",
  "cta.subtitle": "انضم إلى آلاف المنشئين الذين يبنون اختبارات أهدأ وأذكى.",
  "cta.button": "ابدأ الآن — مجانًا",

  "footer.tagline": "طريقة أهدأ لإنشاء الاختبارات.",
  "footer.product": "المنتج",
  "footer.company": "الشركة",
  "footer.legal": "قانوني",
  "footer.rights": "جميع الحقوق محفوظة.",

  "toggle.lang": "English",
};

const dictionaries: Record<Lang, Dict> = { en, ar };

interface I18nContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: keyof typeof en) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function applyDir(lang: Lang) {
  const root = document.documentElement;
  root.setAttribute("lang", lang);
  root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "en" || stored === "ar") setLangState(stored);
  }, []);

  useEffect(() => {
    applyDir(lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    localStorage.setItem(STORAGE_KEY, l);
    setLangState(l);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "ar" : "en");
  }, [lang, setLang]);

  const t = useCallback(
    (key: keyof typeof en) => dictionaries[lang][key] ?? en[key] ?? String(key),
    [lang],
  );

  return (
    <I18nContext.Provider
      value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, toggleLang, t }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
