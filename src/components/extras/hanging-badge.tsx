import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { QrCode } from "./qr-code";
import { buildVCard, CONTACT } from "@/lib/contact-card";
import { useI18n } from "@/lib/i18n";
import { useSpatialMotion } from "@/hooks/use-spatial-motion";
import photo from "@/assets/photos/photo-sun.webp.asset.json";

const STRAP = 120; // strap length in px

/** Draggable lanyard badge: spring physics snap it back with a natural swing. */
export function HangingBadge() {
  const { t } = useI18n();
  const motionOn = useSpatialMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 900, damping: 40 });
  const rotate = useTransform(x, [-220, 220], [28, -28]);
  const swing = useSpring(rotate, { stiffness: 120, damping: 6 });
  const path = useMotionTemplate`M 150 0 Q ${useTransform(sx, (v) => 150 + v * 0.35)} ${useTransform(y, (v) => (STRAP + v) / 2)} ${useTransform(sx, (v) => 150 + v)} ${useTransform(y, (v) => STRAP + v)}`;

  return (
    <div className="relative mx-auto flex w-[300px] flex-col items-center select-none" style={{ height: STRAP + 420 }}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 300 ${STRAP + 420}`} aria-hidden="true">
        <motion.path d={path} stroke="var(--primary)" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.85" />
        <circle cx="150" cy="0" r="7" fill="var(--primary)" />
      </svg>
      <motion.div
        drag={motionOn}
        dragSnapToOrigin
        dragElastic={0.35}
        dragConstraints={{ left: -160, right: 160, top: -60, bottom: 140 }}
        dragTransition={{ bounceStiffness: 260, bounceDamping: 9 }}
        whileDrag={{ scale: 1.03, cursor: "grabbing" }}
        animate={motionOn ? { rotate: [0, 3, -2, 0] } : undefined}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ x, y, rotate: motionOn ? swing : 0, top: STRAP - 8, transformOrigin: "50% 0%" }}
        className="badge-card absolute w-[250px] cursor-grab touch-none rounded-[1.75rem] p-4 text-center"
        aria-label={`${CONTACT.name} — ID badge`}
      >
        <div className="mx-auto mb-3 h-2 w-14 rounded-full bg-foreground/15" aria-hidden="true" />
        <img src={photo.url} alt={CONTACT.name} draggable={false} width={120} height={120}
          className="mx-auto h-24 w-24 rounded-2xl object-cover ring-2 ring-primary/60" />
        <h3 className="mt-3 text-lg font-bold leading-tight">Dr. {CONTACT.name}</h3>
        <p className="text-xs text-muted-foreground">{t.role}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden="true" />{t.available}
        </span>
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-card p-2.5 text-start">
          <QrCode value={buildVCard()} className="h-16 w-16 shrink-0 text-foreground" />
          <p className="text-[11px] leading-snug text-muted-foreground">{t.scan}</p>
        </div>
      </motion.div>
      <p className="absolute bottom-0 text-xs text-muted-foreground">{t.badgeHint}</p>
    </div>
  );
}
