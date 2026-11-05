import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { Mail, Phone, MapPin, MessageCircle, Send, Instagram, Music2 } from "lucide-react";

const directs = [
  { icon: Mail, label: "Email", value: "Yo01009950871@gmail.com", href: "mailto:Yo01009950871@gmail.com" },
  { icon: Phone, label: "Phone", value: "+20 1018995002", href: "tel:+201018995002" },
  { icon: MapPin, label: "Location", value: "Kafr El-Sheikh, Egypt" },
];

const quick = [
  { label: "WhatsApp", href: "https://wa.me/2001018995002", icon: MessageCircle },
  { label: "Telegram", href: "https://t.me/DR_Youssef_Badawy", icon: Send },
  { label: "Gmail", href: "mailto:Yo01009950871@gmail.com", icon: Mail },
];

const social = [
  { label: "TikTok", href: "https://tiktok.com/@youssef_m_badawy", icon: Music2 },
  { label: "Instagram", href: "https://instagram.com/youssef_mo7ammed_02", icon: Instagram },
];

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSend = (channel: "whatsapp" | "email" | "telegram") => {
    const body = `Hi, I'm ${form.name || "[name]"} (${form.email || "no email"}).\n\n${form.message || ""}`.trim();
    if (channel === "whatsapp") {
      window.open(`https://wa.me/2001018995002?text=${encodeURIComponent(body)}`, "_blank");
    } else if (channel === "telegram") {
      window.open(`https://t.me/DR_Youssef_Badawy?text=${encodeURIComponent(body)}`, "_blank");
    } else {
      const subject = `Portfolio inquiry from ${form.name || "Visitor"}`;
      window.location.href = `mailto:Yo01009950871@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-col gap-3">
          <span className="eyebrow"><span className="eyebrow-num">07</span>Contact</span>
          <h2 className="section-title">
            Get in <span className="text-gradient-teal">Touch</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Whether you have a question, want to collaborate, or just want to say hello — feel free to reach out.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-4">
            <div className="glass rounded-3xl p-6">
              <h3 className="mb-4 text-lg font-semibold">Direct Contact</h3>
              <ul className="space-y-3">
                {directs.map((d) => {
                  const Icon = d.icon;
                  const inner = (
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl glass-subtle">
                        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">{d.label}</p>
                        <p className="truncate text-sm font-medium">{d.value}</p>
                      </div>
                    </div>
                  );
                  return (
                    <li key={d.label}>
                      {d.href ? (
                        <a href={d.href} className="block rounded-2xl p-1 transition-colors hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                          {inner}
                        </a>
                      ) : (
                        <div className="p-1">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="glass rounded-3xl p-6">
              <h3 className="mb-4 text-lg font-semibold">Quick Contact</h3>
              <div className="flex flex-wrap gap-2">
                {quick.map((q) => {
                  const Icon = q.icon;
                  return (
                    <a
                      key={q.label}
                      href={q.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-subtle inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Icon className="h-4 w-4 text-primary" aria-hidden="true" /> {q.label}
                    </a>
                  );
                })}
              </div>

              <h4 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Follow Me</h4>
              <div className="flex flex-wrap gap-2">
                {social.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-subtle inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Icon className="h-4 w-4 text-primary" aria-hidden="true" /> {s.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend("whatsapp"); }}
            className="glass flex h-full flex-col gap-4 rounded-3xl p-6"
          >
            <div>
              <label htmlFor="c-name" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">Your Name</label>
              <input
                id="c-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="glass-subtle w-full rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="c-email" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">Your Email</label>
              <input
                id="c-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john@example.com"
                className="glass-subtle w-full rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="c-msg" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">Your Message</label>
              <textarea
                id="c-msg"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Your message here..."
                className="glass-subtle w-full resize-none rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSend("whatsapp")}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ background: "linear-gradient(135deg, var(--teal), var(--teal-bright))" }}
              >
                <MessageCircle className="h-4 w-4" /> Send via WhatsApp
              </button>
              <button
                type="button"
                onClick={() => handleSend("email")}
                className="glass-subtle inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Mail className="h-4 w-4 text-primary" /> Email
              </button>
              <button
                type="button"
                onClick={() => handleSend("telegram")}
                className="glass-subtle inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Send className="h-4 w-4 text-primary" /> Telegram
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Choose your preferred channel — your message is pre-filled.</p>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
