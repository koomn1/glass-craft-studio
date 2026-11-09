import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";
const KEY = "portfolio-lang";

const dict = {
  en: {
    vet: "Vet", experience: "Experience", dev: "AI & Dev", skills: "Skills", video: "Video", assistant: "Assistant",
    playground: "Playground", estimator: "Estimate", contact: "Contact", connect: "Card", faq: "FAQ",
    toolbelt: "Tools & skills I work with",
    statsTitle: "By the numbers", statVolunteer: "Years volunteering", statFreelance: "Years freelancing",
    statSkills: "Core skills", statTools: "AI tools mastered",
    timeline: "Career timeline", downloadCv: "Download CV",
    t2022: "Medical volunteer — local health awareness campaigns and community medical events.",
    t2023: "Freelance digital marketing — AI tool implementation for small businesses.",
    tNow: "Marketing & Operations Specialist — Zaghdan Company for Import and Export of Perfumes.",
    present: "Present",
    badgeHint: "Drag the badge — it swings back", available: "Available for projects",
    role: "Veterinarian · Marketing & AI", scan: "Scan to save contact",
    vcardTitle: "Digital business card", vcardDesc: "Scan the code or download the contact file straight to your phone.",
    saveContact: "Save contact (.vcf)",
    bookTitle: "Book a quick consultation", bookDesc: "Pick a day, time and topic — the request opens in WhatsApp or your email app for confirmation.",
    name: "Your name", date: "Day", time: "Time", topic: "Topic",
    topics: ["AI tools for business", "Digital marketing", "Veterinary advice", "Website / project"],
    viaWhatsapp: "Request via WhatsApp", viaEmail: "Request via email", fillAll: "Please add your name, day and time.",
    reviewsTitle: "Client reviews", reviewsEmpty: "Verified reviews will appear here soon. Worked with Youssef? Share your experience.",
    leaveReview: "Send a review",
    faqTitle: "Frequently asked questions",
    faqs: [
      ["What services do you offer?", "Digital marketing strategy, AI-powered content and automation, small websites, and veterinary awareness content."],
      ["Do you work with clients outside Egypt?", "Yes — everything can be handled remotely over WhatsApp, Telegram, email or video calls."],
      ["How do I get a price?", "Use the Estimate section to describe your project; Youssef replies with a tailored quote."],
      ["How fast do you reply?", "Usually within the same day on WhatsApp."],
      ["Which languages do you work in?", "Arabic and English."],
    ],
  },
  ar: {
    vet: "بيطري", experience: "الخبرة", dev: "ذكاء وبرمجة", skills: "المهارات", video: "فيديو", assistant: "المساعد",
    playground: "المعمل", estimator: "التكلفة", contact: "تواصل", connect: "الكارت", faq: "أسئلة",
    toolbelt: "الأدوات والمهارات اللي بشتغل بيها",
    statsTitle: "بالأرقام", statVolunteer: "سنين تطوع", statFreelance: "سنين عمل حر",
    statSkills: "مهارات أساسية", statTools: "أدوات ذكاء اصطناعي",
    timeline: "المسار المهني", downloadCv: "تحميل السيرة الذاتية",
    t2022: "متطوع طبي — حملات توعية صحية وفعاليات طبية مجتمعية.",
    t2023: "تسويق رقمي حر — تطبيق أدوات الذكاء الاصطناعي للمشروعات الصغيرة.",
    tNow: "أخصائي تسويق وعمليات — شركة زغدان لاستيراد وتصدير العطور.",
    present: "حتى الآن",
    badgeHint: "اسحب الكارت — هيرجع يتأرجح", available: "متاح لمشروعات جديدة",
    role: "طبيب بيطري · تسويق وذكاء اصطناعي", scan: "امسح لحفظ جهة الاتصال",
    vcardTitle: "كارت الأعمال الرقمي", vcardDesc: "امسح الكود أو حمّل ملف جهة الاتصال على موبايلك مباشرة.",
    saveContact: "حفظ جهة الاتصال (.vcf)",
    bookTitle: "احجز مكالمة استشارية سريعة", bookDesc: "اختار اليوم والوقت والموضوع — الطلب هيفتح في واتساب أو الإيميل للتأكيد.",
    name: "اسمك", date: "اليوم", time: "الوقت", topic: "الموضوع",
    topics: ["أدوات ذكاء اصطناعي للبيزنس", "تسويق رقمي", "استشارة بيطرية", "موقع / مشروع"],
    viaWhatsapp: "اطلب عبر واتساب", viaEmail: "اطلب عبر الإيميل", fillAll: "من فضلك اكتب اسمك واختار اليوم والوقت.",
    reviewsTitle: "آراء العملاء", reviewsEmpty: "الآراء الموثقة هتظهر هنا قريب. اشتغلت مع يوسف؟ شاركنا تجربتك.",
    leaveReview: "ابعت رأيك",
    faqTitle: "أسئلة شائعة",
    faqs: [
      ["إيه الخدمات اللي بتقدمها؟", "استراتيجيات تسويق رقمي، محتوى وأتمتة بالذكاء الاصطناعي، مواقع صغيرة، ومحتوى توعوي بيطري."],
      ["بتشتغل مع عملاء برا مصر؟", "أيوه — كل حاجة ممكن تتم أونلاين عبر واتساب أو تيليجرام أو الإيميل أو مكالمات فيديو."],
      ["أعرف السعر إزاي؟", "استخدم قسم التكلفة واوصف مشروعك، ويوسف هيرد بعرض سعر مناسب."],
      ["بترد بسرعة قد إيه؟", "غالبًا في نفس اليوم على واتساب."],
      ["بتشتغل بأنهي لغات؟", "العربي والإنجليزي."],
    ],
  },
};

export type Dict = (typeof dict)["en"];
const Ctx = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void }>({ lang: "en", t: dict.en, setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const s = localStorage.getItem(KEY);
    if (s === "ar" || s === "en") setLangState(s);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const setLang = (l: Lang) => { localStorage.setItem(KEY, l); setLangState(l); };
  return <Ctx.Provider value={{ lang, t: dict[lang] as Dict, setLang }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
