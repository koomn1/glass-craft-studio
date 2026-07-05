import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "quiz-lang";

export const en = {
  nav: {
    brand: "Quiz Space",
    features: "Features",
    howItWorks: "How it works",
    templates: "Templates",
    stats: "Results",
    faq: "FAQ",
    getStarted: "Get started",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  hero: {
    eyebrow: "Calm, collaborative quiz creation",
    title: "Create quizzes people actually enjoy taking.",
    subtitle:
      "Quiz Space helps teams, teachers, and creators build beautiful quizzes in minutes — with thoughtful AI assistance, flexible templates, and gentle analytics.",
    primaryCta: "Create your first quiz",
    secondaryCta: "See how it works",
    badge: "No-code quiz builder",
    statLabel: "Average setup time",
    statValue: "3 min",
    tags: "Calm design · RTL ready · Motion rich",
  },
  features: {
    eyebrow: "Why creators choose Quiz Space",
    title: "Everything you need to launch a polished quiz.",
    subtitle:
      "From AI-assisted drafting to shareable results, Quiz Space keeps the entire experience serene for both creators and participants.",
    items: {
      ai: {
        title: "AI question drafting",
        description:
          "Start with a topic and let Quiz Space suggest clear questions, answer choices, and helpful hints.",
      },
      questionTypes: {
        title: "Multiple question types",
        description:
          "Use single-select, multi-select, true/false, short answer, and rating questions in one flow.",
      },
      sharing: {
        title: "Instant sharing",
        description:
          "Publish with a link, embed it anywhere, or send a branded invitation to your audience.",
      },
      analytics: {
        title: "Gentle analytics",
        description:
          "Track completions, drop-off points, and top-performing questions without overwhelming dashboards.",
      },
      collaboration: {
        title: "Team collaboration",
        description:
          "Invite collaborators, comment on questions, and keep everyone aligned before launch.",
      },
      customization: {
        title: "Styling and timing",
        description:
          "Tune colors, layouts, and timers so every quiz matches the moment and the mood.",
      },
    },
  },
  howItWorks: {
    eyebrow: "A simple flow from idea to insights",
    title: "Launch in four calm steps.",
    subtitle:
      "Move from a blank page to a live quiz with a flow that stays organized, visual, and easy to follow.",
    steps: {
      create: {
        title: "Create",
        description:
          "Choose a template or start from scratch, then describe the quiz you want to make.",
      },
      customize: {
        title: "Customize",
        description:
          "Refine the tone, edit questions, add images, and shape the experience to fit your audience.",
      },
      share: {
        title: "Share",
        description:
          "Publish a clean link, drop the quiz into your site, or invite participants with one tap.",
      },
      analyze: {
        title: "Analyze",
        description:
          "Review responses, completion trends, and question performance so the next quiz is even better.",
      },
    },
  },
  templates: {
    eyebrow: "Start from a polished foundation",
    title: "Template previews that feel ready to ship.",
    subtitle:
      "Pick a starting point, preview the style, and adapt each quiz to your own subject, audience, or event.",
    cards: {
      generalKnowledge: {
        title: "General Knowledge",
        description: "A versatile trivia layout for events, classrooms, and friendly competitions.",
        cta: "Use this template",
      },
      scienceSprint: {
        title: "Science Sprint",
        description:
          "A crisp, concept-forward format for lessons, revision sessions, and workshops.",
        cta: "Use this template",
      },
      languageLab: {
        title: "Language Lab",
        description: "Practice vocabulary, grammar, and comprehension with a calm, clear layout.",
        cta: "Use this template",
      },
    },
  },
  stats: {
    eyebrow: "Trusted by growing teams",
    title: "Numbers that reflect a steady product experience.",
    subtitle:
      "These headline metrics show how Quiz Space helps creators publish more often and learn faster.",
    items: {
      quizzesCreated: { value: "24", suffix: "K+", label: "Quizzes created" },
      questionsAnswered: { value: "1.2", suffix: "M+", label: "Questions answered" },
      creatorSatisfaction: { value: "98", suffix: "%", label: "Creator satisfaction" },
      averageRating: { value: "4.8", suffix: "/5", label: "Average rating" },
    },
  },
  cta: {
    eyebrow: "Ready when you are",
    title: "Bring your next quiz to life in minutes.",
    subtitle:
      "Create a polished quiz, share it instantly, and keep every step calm from draft to results.",
    button: "Get started free",
  },
  footer: {
    tagline: "A serene home for modern quiz creation.",
    product: "Product",
    company: "Company",
    legal: "Legal",
    links: {
      product: {
        features: "Features",
        templates: "Templates",
        pricing: "Pricing",
      },
      company: {
        about: "About",
        careers: "Careers",
        contact: "Contact",
      },
      legal: {
        privacy: "Privacy",
        terms: "Terms",
        cookies: "Cookies",
      },
    },
    copyright: "© {year} Quiz Space. All rights reserved.",
    languageLabel: "Language",
  },
} as const;

export type Dictionary = typeof en;

export const ar = {
  nav: {
    brand: "Quiz Space",
    features: "المزايا",
    howItWorks: "كيف يعمل",
    templates: "القوالب",
    stats: "النتائج",
    faq: "الأسئلة الشائعة",
    getStarted: "ابدأ الآن",
    menuOpen: "فتح القائمة",
    menuClose: "إغلاق القائمة",
  },
  hero: {
    eyebrow: "إنشاء اختبارات بهدوء وتعاون",
    title: "أنشئ اختبارات يحب الناس خوضها بالفعل.",
    subtitle:
      "تساعدك Quiz Space على بناء اختبارات أنيقة خلال دقائق — مع دعم ذكي للمحتوى، وقوالب مرنة، وتحليلات هادئة وواضحة.",
    primaryCta: "أنشئ اختبارك الأول",
    secondaryCta: "شاهد كيف يعمل",
    badge: "منشئ اختبارات بلا كود",
    statLabel: "متوسط وقت الإعداد",
    statValue: "3 دقائق",
    tags: "تصميم هادئ · يدعم RTL · حركة سلسة",
  },
  features: {
    eyebrow: "لماذا يختار المنشئون Quiz Space",
    title: "كل ما تحتاجه لإطلاق اختبار متقن.",
    subtitle:
      "من صياغة الأسئلة بمساعدة الذكاء الاصطناعي إلى مشاركة النتائج، تحافظ Quiz Space على تجربة مريحة للمُنشئ والمشارك.",
    items: {
      ai: {
        title: "صياغة أسئلة بمساعدة الذكاء الاصطناعي",
        description:
          "ابدأ بفكرة عامة ودع Quiz Space يقترح أسئلة واضحة وخيارات إجابة وتلميحات مفيدة.",
      },
      questionTypes: {
        title: "أنواع متعددة من الأسئلة",
        description:
          "استخدم الاختيار الواحد، والاختيارات المتعددة، وصح/خطأ، والإجابة القصيرة، والتقييم في مسار واحد.",
      },
      sharing: {
        title: "مشاركة فورية",
        description:
          "انشر برابط مباشر، أو أدرج الاختبار في موقعك، أو أرسل دعوة تحمل علامتك التجارية إلى جمهورك.",
      },
      analytics: {
        title: "تحليلات هادئة وواضحة",
        description:
          "تابع الإكمال، ونقاط الانسحاب، وأفضل الأسئلة أداءً من دون لوحات مزدحمة أو مربكة.",
      },
      collaboration: {
        title: "تعاون جماعي",
        description: "أضف المتعاونين، وعلّق على الأسئلة، وحافظ على توافق الفريق قبل الإطلاق.",
      },
      customization: {
        title: "تخصيص الشكل والوقت",
        description: "اضبط الألوان والتخطيطات والمؤقتات ليطابق كل اختبار السياق والمزاج المناسبين.",
      },
    },
  },
  howItWorks: {
    eyebrow: "مسار بسيط من الفكرة إلى الرؤية",
    title: "أطلق الاختبار في أربع خطوات هادئة.",
    subtitle: "انتقل من صفحة فارغة إلى اختبار حي عبر مسار منظم وواضح وسهل المتابعة.",
    steps: {
      create: {
        title: "إنشاء",
        description: "اختر قالبًا أو ابدأ من الصفر، ثم صف الاختبار الذي تريد تنفيذه.",
      },
      customize: {
        title: "تخصيص",
        description: "حسّن الأسلوب، وحرر الأسئلة، وأضف الصور، واصنع تجربة تناسب جمهورك.",
      },
      share: {
        title: "مشاركة",
        description:
          "انشر رابطًا نظيفًا، أو أدرج الاختبار في موقعك، أو ادعُ المشاركين بنقرة واحدة.",
      },
      analyze: {
        title: "تحليل",
        description:
          "راجع الإجابات، واتجاهات الإكمال، وأداء الأسئلة لتصبح كل نسخة أفضل من سابقتها.",
      },
    },
  },
  templates: {
    eyebrow: "ابدأ من أساس جاهز ومصقول",
    title: "معاينات قوالب تبدو جاهزة للإطلاق.",
    subtitle:
      "اختر نقطة بداية، وعاين النمط، ثم عدّل كل اختبار ليناسب الموضوع أو الجمهور أو الفعالية.",
    cards: {
      generalKnowledge: {
        title: "معلومات عامة",
        description: "تنسيق مسابقات متعدد الاستخدامات للفعاليات والفصول والمنافسات الودية.",
        cta: "استخدم هذا القالب",
      },
      scienceSprint: {
        title: "سباق العلوم",
        description: "تنسيق واضح يركّز على المفاهيم للدروس والمراجعة وورش العمل.",
        cta: "استخدم هذا القالب",
      },
      languageLab: {
        title: "مختبر اللغة",
        description: "تدرّب على المفردات والقواعد والفهم ضمن تخطيط هادئ وواضح.",
        cta: "استخدم هذا القالب",
      },
    },
  },
  stats: {
    eyebrow: "موثوق به لدى الفرق النامية",
    title: "أرقام تعكس تجربة منتج متزنة.",
    subtitle:
      "توضح هذه المؤشرات كيف تساعد Quiz Space المنشئين على النشر بصورة أسرع والتعلّم بشكل أدق.",
    items: {
      quizzesCreated: { value: "24", suffix: "ألف+", label: "اختبار منشور" },
      questionsAnswered: { value: "1.2", suffix: "مليون+", label: "إجابة مقدمة" },
      creatorSatisfaction: { value: "98", suffix: "%", label: "رضا المنشئين" },
      averageRating: { value: "4.8", suffix: "/5", label: "متوسط التقييم" },
    },
  },
  cta: {
    eyebrow: "جاهز عندما تكون أنت جاهزًا",
    title: "أحيِ اختبارك التالي خلال دقائق.",
    subtitle: "أنشئ اختبارًا متقنًا، وشاركه فورًا، واحفظ الإيقاع هادئًا من المسودة حتى النتائج.",
    button: "ابدأ مجانًا",
  },
  footer: {
    tagline: "موطن هادئ لصناعة الاختبارات الحديثة.",
    product: "المنتج",
    company: "الشركة",
    legal: "قانوني",
    links: {
      product: {
        features: "المزايا",
        templates: "القوالب",
        pricing: "الأسعار",
      },
      company: {
        about: "من نحن",
        careers: "الوظائف",
        contact: "تواصل معنا",
      },
      legal: {
        privacy: "الخصوصية",
        terms: "الشروط",
        cookies: "الكوكيز",
      },
    },
    copyright: "© {year} Quiz Space. جميع الحقوق محفوظة.",
    languageLabel: "اللغة",
  },
} satisfies Dictionary;

type Lang = "en" | "ar";
type Dir = "ltr" | "rtl";

type LanguageContextValue = {
  lang: Lang;
  dir: Dir;
  setLang: (next: Lang) => void;
  toggle: () => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readPath(dictionary: Dictionary, key: string): unknown {
  return key.split(".").reduce<unknown>((value, part) => {
    if (value && typeof value === "object" && part in value) {
      return (value as Record<string, unknown>)[part];
    }
    return undefined;
  }, dictionary);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => {
    const dir: Dir = lang === "ar" ? "rtl" : "ltr";
    return {
      lang,
      dir,
      setLang: (next) => setLangState(next),
      toggle: () => setLangState((current) => (current === "en" ? "ar" : "en")),
      t: (key) => {
        const dictionary = lang === "ar" ? ar : en;
        const value = readPath(dictionary, key);
        return typeof value === "string" ? value : key;
      },
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
