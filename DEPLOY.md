# نشر المشروع على Cloudflare (Workers + SSR + Edge Functions)

المشروع جاهز للنشر على Cloudflare لأنه مبني على TanStack Start + Nitro مع target = `cloudflare`.
الـ SSR و الـ Edge Functions (server functions / server routes) كلها هتشتغل على Cloudflare Workers.

## 1) تثبيت Wrangler

```bash
bun add -D wrangler
```

## 2) تسجيل الدخول لحسابك

```bash
bunx wrangler login
```

هيفتح المتصفح علشان تأكد الدخول لحساب Cloudflare بتاعك (مجاني).

## 3) بناء المشروع

```bash
bun run build
```

ده هيولّد مجلد `.output/` فيه:
- `.output/public/` — الملفات الستاتيك
- `.output/server/index.mjs` — الـ Worker اللي بيشغّل الـ SSR

## 4) النشر

```bash
bunx wrangler deploy
```

أول مرة هيسألك تأكيد إنشاء الـ Worker — اضغط Yes.
بعد ثواني هيديك URL زي: `https://jo-badawy.<your-subdomain>.workers.dev`

## 5) متغيرات البيئة (لو محتاج)

```bash
bunx wrangler secret put SECRET_NAME
```

أو من الـ dashboard: **Workers & Pages → jo-badawy → Settings → Variables**

## 6) النشر التلقائي من GitHub (اختياري)

1. ادفع المشروع على GitHub.
2. روح Cloudflare Dashboard → **Workers & Pages → Create → Connect to Git**.
3. اختار الريبو، وحط:
   - Build command: `bun run build`
   - Deploy command: `bunx wrangler deploy`
4. أي push على main هيعمل deploy تلقائي.

## ملاحظات

- **SSR شغّال** افتراضياً — كل request بيتعمله render على الـ Worker.
- **Edge Functions** = أي `createServerFn` أو route تحت `src/routes/api/` بيشتغل على Cloudflare Workers في 300+ موقع حول العالم.
- **الحدود المجانية**: 100,000 request في اليوم، 10ms CPU/request — كافية لمعظم المشاريع.
- **النطاق المخصص**: من Dashboard → Workers → jo-badawy → Settings → Domains & Routes.
