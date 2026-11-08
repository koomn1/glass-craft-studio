import { Quote, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { CONTACT } from "@/lib/contact-card";
import { useI18n } from "@/lib/i18n";

/** Add real, client-approved reviews here; the section shows an invitation until then. */
const TESTIMONIALS: { name: string; role: string; text: string; rating: number }[] = [];

export function FaqSection() {
  const { t } = useI18n();
  return (
    <div className="space-y-10">
      <Reveal>
        <div className="flex flex-col gap-3">
          <span className="eyebrow"><span className="eyebrow-num">?</span>{t.faq}</span>
          <h2 className="section-title"><span className="text-gradient-teal">{t.reviewsTitle}</span></h2>
        </div>
      </Reveal>

      {TESTIMONIALS.length ? (
        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((r) => (
            <TiltCard key={r.name} className="glass rounded-3xl p-6">
              <Quote className="h-6 w-6 text-primary" aria-hidden="true" />
              <p className="mt-3 text-sm">{r.text}</p>
              <div className="mt-4 flex gap-0.5" aria-label={`${r.rating}/5`}>
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
              </div>
              <p className="mt-2 text-sm font-semibold">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.role}</p>
            </TiltCard>
          ))}
        </div>
      ) : (
        <TiltCard className="glass rounded-3xl p-8 text-center">
          <Quote className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">{t.reviewsEmpty}</p>
          <Button asChild className="mt-4 rounded-full">
            <a href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Review for Youssef: ")}`} target="_blank" rel="noopener noreferrer">{t.leaveReview}</a>
          </Button>
        </TiltCard>
      )}

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{t.faqTitle}</h3>
        <Accordion type="single" collapsible className="space-y-2">
          {t.faqs.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="glass-subtle rounded-2xl border-none px-5">
              <AccordionTrigger className="text-start font-semibold hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
