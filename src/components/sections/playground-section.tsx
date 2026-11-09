import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { useI18n } from "@/lib/i18n";

const BASE = `<style>body{font-family:system-ui,sans-serif;margin:0;padding:20px;background:#0f2a2a;color:#fff0e4}button,input,select{font:inherit;border-radius:12px;border:1px solid #24b1b1;background:#ffffff14;color:inherit;padding:8px 12px}.card{background:#ffffff12;border:1px solid #ffffff2a;border-radius:20px;padding:16px;backdrop-filter:blur(12px)}</style>`;

const DEMOS = [
  {
    id: "dose", en: "Vet dose calculator", ar: "حاسبة جرعة بيطرية",
    code: `${BASE}
<div class="card">
  <h3>Dose calculator (demo)</h3>
  <label>Weight (kg) <input id="w" type="number" value="12"></label>
  <label>mg/kg <input id="d" type="number" value="5"></label>
  <p id="out"></p>
  <small>Educational demo — always confirm with a vet.</small>
</div>
<script>
const f=()=>out.textContent='Total dose: '+(w.value*d.value).toFixed(1)+' mg';
w.oninput=d.oninput=f;f();
</script>`,
  },
  {
    id: "prompt", en: "AI prompt builder", ar: "منشئ أوامر الذكاء الاصطناعي",
    code: `${BASE}
<div class="card">
  <h3>Marketing prompt builder</h3>
  <select id="t"><option>Instagram caption</option><option>Ad headline</option><option>Product description</option></select>
  <input id="p" placeholder="Product" value="Perfume">
  <select id="tone"><option>luxury</option><option>playful</option><option>professional</option></select>
  <pre id="out" style="white-space:pre-wrap;margin-top:12px"></pre>
</div>
<script>
const f=()=>out.textContent='Write a '+tone.value+' '+t.value+' for "'+p.value+'". Audience: Egypt & Gulf. Include a clear call to action and 3 hashtags.';
[t,p,tone].forEach(e=>e.oninput=f);f();
</script>`,
  },
  {
    id: "glass", en: "Glass button", ar: "زرار زجاجي",
    code: `${BASE}
<style>.g{padding:16px 28px;border-radius:999px;background:linear-gradient(135deg,#ffffff30,#ffffff08);box-shadow:0 10px 30px -10px #24b1b1;transition:transform .2s}.g:hover{transform:translateY(-3px) scale(1.04)}</style>
<button class="g" onclick="this.textContent='Clicked ✓'">Liquid glass button</button>`,
  },
];

export function PlaygroundSection() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  const [demo, setDemo] = useState(DEMOS[0]);
  const [code, setCode] = useState(DEMOS[0].code);
  const [doc, setDoc] = useState(DEMOS[0].code);

  useEffect(() => {
    const t = setTimeout(() => setDoc(code), 350);
    return () => clearTimeout(t);
  }, [code]);

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-col gap-3">
          <span className="eyebrow"><span className="eyebrow-num">{"</>"}</span>{ar ? "معمل حي" : "Live Playground"}</span>
          <h2 className="section-title">{ar ? "جرّب " : "Try the "}<span className="text-gradient-teal">{ar ? "الشغل بنفسك" : "work live"}</span></h2>
          <p className="max-w-2xl text-muted-foreground">{ar ? "عدّل الكود وشوف النتيجة فوراً — مكونات تفاعلية حقيقية بدل صور ثابتة." : "Edit the code and watch it update instantly — real interactive pieces instead of static screenshots."}</p>
        </div>
      </Reveal>
      <div className="flex flex-wrap gap-2">
        {DEMOS.map((d) => (
          <button key={d.id} type="button" onClick={() => { setDemo(d); setCode(d.code); setDoc(d.code); }}
            className={`rounded-full px-4 py-2 text-sm ${demo.id === d.id ? "bg-primary text-primary-foreground" : "glass"}`}>
            {ar ? d.ar : d.en}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass-strong overflow-hidden rounded-3xl">
          <div className="border-b border-border/60 px-4 py-2 text-xs text-muted-foreground">{ar ? "الكود" : "Code"}</div>
          <textarea dir="ltr" spellCheck={false} aria-label="Code editor" value={code} onChange={(e) => setCode(e.target.value)}
            className="h-[380px] w-full resize-none bg-transparent p-4 font-mono text-xs leading-relaxed outline-none" />
        </div>
        <div className="glass-strong overflow-hidden rounded-3xl">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-2 text-xs text-muted-foreground">
            <span>{ar ? "المعاينة الحية" : "Live preview"}</span>
            <button type="button" onClick={() => setCode(demo.code)} className="underline">{ar ? "إعادة ضبط" : "Reset"}</button>
          </div>
          <iframe title="Live preview" sandbox="allow-scripts" srcDoc={doc} className="h-[380px] w-full border-0" />
        </div>
      </div>
    </div>
  );
}
