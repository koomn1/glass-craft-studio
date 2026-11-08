import { useState } from "react";
import { Download, MessageCircle, Mail, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/reveal";
import { HangingBadge } from "@/components/extras/hanging-badge";
import { QrCode } from "@/components/extras/qr-code";
import { buildVCard, CONTACT, downloadVCard } from "@/lib/contact-card";
import { useI18n } from "@/lib/i18n";

const TIMES = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

export function ConnectSection() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [topic, setTopic] = useState(0);
  const [error, setError] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  const send = (via: "wa" | "mail") => {
    if (!name.trim() || !date || !time) return setError(t.fillAll);
    setError("");
    const msg = `Consultation request\nName: ${name.trim()}\nDay: ${date}\nTime: ${time} (Cairo)\nTopic: ${t.topics[topic]}`;
    const url = via === "wa"
      ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`
      : `mailto:${CONTACT.email}?subject=${encodeURIComponent("Consultation request")}&body=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
  };

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-col gap-3">
          <span className="eyebrow"><span className="eyebrow-num">★</span>{t.connect}</span>
          <h2 className="section-title"><span className="text-gradient-teal">{t.vcardTitle}</span></h2>
        </div>
      </Reveal>

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <HangingBadge />
        <div className="space-y-6">
          <div className="glass rounded-3xl p-6">
            <h3 className="text-lg font-semibold">{t.vcardTitle}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.vcardDesc}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="rounded-2xl bg-card p-3"><QrCode value={buildVCard()} className="h-32 w-32 text-foreground" /></div>
              <Button type="button" onClick={downloadVCard} className="rounded-full"><Download className="h-4 w-4" />{t.saveContact}</Button>
            </div>
          </div>

          <form className="glass rounded-3xl p-6" onSubmit={(e) => { e.preventDefault(); send("wa"); }}>
            <h3 className="flex items-center gap-2 text-lg font-semibold"><CalendarClock className="h-5 w-5 text-primary" />{t.bookTitle}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.bookDesc}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-semibold sm:col-span-2">{t.name}
                <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} className="mt-1" />
              </label>
              <label className="text-xs font-semibold">{t.date}
                <Input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="mt-1" />
              </label>
              <div className="text-xs font-semibold">{t.time}
                <div className="mt-1 grid grid-cols-3 gap-1.5">
                  {TIMES.map((tm) => (
                    <Button key={tm} type="button" size="sm" variant={time === tm ? "default" : "outline"} onClick={() => setTime(tm)} className="rounded-full px-0" aria-pressed={time === tm}>{tm}</Button>
                  ))}
                </div>
              </div>
              <div className="text-xs font-semibold sm:col-span-2">{t.topic}
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {t.topics.map((tp, i) => (
                    <Button key={tp} type="button" size="sm" variant={topic === i ? "default" : "outline"} onClick={() => setTopic(i)} className="rounded-full" aria-pressed={topic === i}>{tp}</Button>
                  ))}
                </div>
              </div>
            </div>
            {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button type="submit" className="rounded-full"><MessageCircle className="h-4 w-4" />{t.viaWhatsapp}</Button>
              <Button type="button" variant="outline" onClick={() => send("mail")} className="rounded-full"><Mail className="h-4 w-4" />{t.viaEmail}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
