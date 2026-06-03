Plan: Deploy to Cloudflare Pages with SSR & Edge Functions

## Current State
The project already uses `@lovable.dev/vite-tanstack-config` which targets Cloudflare Workers via Nitro under the hood. The `vite.config.ts` sets `server.entry: "server"` and the build pipeline is SSR-ready. No `wrangler.toml` / `wrangler.json` exists yet, and the `deploy` script is missing from `package.json`.

## What we will do
1. **Add Wrangler configuration** (`wrangler.toml` or `wrangler.json`)
   - Set `compatibility_flags = ["nodejs_compat"]` (required for Nitro/Node.js polyfills on Cloudflare Workers).
   - Set a recent `compatibility_date`.
   - Configure the build output directory (Nitro defaults to `.output/`).

2. **Add deployment scripts to `package.json`**
   - `build:cloudflare` — runs `vite build` then ensures the Nitro output is ready for Cloudflare.
   - `deploy` — uses `wrangler pages deploy` to push the `.output/public` (or Nitro output) to Cloudflare Pages.

3. **Verify the server entry (`src/server.ts`)**
   - Ensure it exports a fetch handler compatible with Cloudflare Pages Functions (Nitro usually handles this, but we will confirm the entry shape).

4. **Environment variables / secrets**
   - Document how to add secrets via `wrangler secret put` or the Cloudflare dashboard so `process.env.*` works in Edge Functions.

5. **Provide step-by-step publish instructions**
   - Install Wrangler CLI (`bun add -D wrangler`).
   - Authenticate (`bunx wrangler login`).
   - Create a Pages project (or link to existing).
   - Run the deploy script.
   - Optional: connect Git for automatic deploys.

## Notes
- SSR is already enabled through TanStack Start + Nitro.
- Edge Functions = `createServerFn` handlers + server routes running on Cloudflare Workers.
- No changes to application logic are required; this is purely build/deploy configuration.

## Deliverables
- `wrangler.toml`
- Updated `package.json` scripts
- A concise `DEPLOY.md` (or inline summary) with the exact commands to run