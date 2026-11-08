import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/contact-card";

function printCv() {
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`<!doctype html><html><head><title>Youssef Badawy — CV</title><style>
body{font-family:system-ui,sans-serif;max-width:720px;margin:40px auto;color:#123;line-height:1.5;padding:0 20px}
h1{margin:0;color:#006060}h2{border-bottom:2px solid #24b1b1;padding-bottom:4px;margin-top:28px}li{margin:6px 0}
</style></head><body>
<h1>Dr. ${CONTACT.name}</h1><p>${CONTACT.title}<br>${CONTACT.phone} · ${CONTACT.email} · ${CONTACT.city}, ${CONTACT.country}</p>
<h2>Experience</h2><ul>
<li><b>Marketing &amp; Operations Specialist</b> — Zaghdan Company for Import and Export of Perfumes (Current)</li>
<li><b>Freelance Digital Marketing</b> — 2023–Present: consultation and AI tool implementation for small businesses</li>
<li><b>Medical Volunteer</b> — 2022–Present: local health awareness campaigns and community medical events</li></ul>
<h2>Skills</h2><ul><li>Marketing &amp; Digital Strategy · AI Tools (ChatGPT, Claude, MidJourney, DALL·E, Canva AI) · Social Media Marketing</li>
<li>Python · HTML/CSS · Data Analytics</li></ul>
<h2>Languages</h2><p>Arabic, English</p>
<script>window.onload=()=>window.print()</script></body></html>`);
  w.document.close();
}

export function CareerTimeline() {
  const { t } = useI18n();
  const steps = [
    { year: "2022", text: t.t2022 },
    { year: "2023", text: t.t2023 },
    { year: t.present, text: t.tNow },
  ];
  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">{t.timeline}</h3>
        <Button type="button" onClick={printCv} className="rounded-full"><Download className="h-4 w-4" />{t.downloadCv}</Button>
      </div>
      <ol className="relative space-y-6 border-s-2 border-primary/30 ps-6">
        {steps.map((s, i) => (
          <motion.li key={s.year} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.4 }} className="relative">
            <span className="absolute -start-[33px] top-1 h-4 w-4 rounded-full border-4 border-card bg-primary" aria-hidden="true" />
            <p className="text-xs font-bold text-primary">{s.year}</p>
            <p className="mt-1 text-sm">{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
