# Project rules

- 3D/spatial effects use CSS 3D transforms + Framer Motion, not three.js/WebGL — keeps the portfolio light on phones.
- Navigation lives in the bottom `SpatialDock`; sections render one at a time inside `SpatialWindow` with direction-aware 3D transitions — one place to change nav order (`TABS` in `src/routes/index.tsx`).
- Large moving or full-page surfaces (photo frames, spatial window, backdrop) must not use `backdrop-filter`; reserve live blur for small chrome (dock, ornaments, header) — blur under animation caused visible lag.
- Pointer parallax writes CSS vars on the owning element via `usePointerParallax`, never on `:root` — avoids page-wide style recalcs.
- Never hand-write `-webkit-backdrop-filter`; the production CSS build would drop the standard property for Chrome.

- Main navigation and chrome use bundled Google Material Symbols Rounded SVGs; preserve each source viewBox so icons render without a font download.
- Section accent colors use semantic CSS tokens scoped by data-tone, with navigation metadata defining section identity.
- Visitor counts use Lovable built-in Analytics; never expose analytics credentials or fabricate public counters.
- Gate spatial motion through reactive `useSpatialMotion` (no reduced-motion); restore rich glass on all screen sizes while honoring accessibility preferences.
- Project estimator hands off a structured brief to WhatsApp or the visitor's email app; do not fabricate fixed prices without owner-provided rates.
- SpatialInteractions owns opt-in Web Audio clicks and delegated magnetic motion so all portfolio controls share a single interaction policy.
- UI copy for language switching lives in `src/lib/i18n.tsx` (en/ar dictionaries); the provider sets html lang/dir so RTL comes from the document.
- AI persona: one `/api/chat` system prompt powers both the Assistant tab and the corner `AssistantWidget`; leads are handed off to WhatsApp/email via `src/lib/lead.ts` (no storage) and the bot never quotes fixed prices.
- Live Playground runs demos in a `sandbox="allow-scripts"` iframe via srcDoc so visitor code can't touch the site.
- Pitch Mode is a fullscreen overlay (`src/components/pitch/pitch-mode.tsx`) with its own slide list, not a separate route.
