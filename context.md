# Reunion landing page — session handoff

## Current state

The first-release Reunion landing page is implemented and verified in `D:\Reunion.ai`. It is a Next.js 16 App Router project written in TypeScript. The page is currently available locally at `http://127.0.0.1:3000/`; the development server was started with:

```powershell
node .\node_modules\next\dist\bin\next dev --hostname 127.0.0.1 --port 3000
```

The server belonged to exec session `20150` when this handoff was written. A new chat should check whether port 3000 is still listening before starting another process.

## Product and public facts

Reunion is positioned as “The Festival of Friendship.” The visitor’s crew—not a stage or artist—is the central spectacle.

Approved public event information:

- December 2026; do not publish an exact day.
- Boulder Hills, Hyderabad.
- 4 PM–10 PM.
- Primary action: join the email waitlist with lightweight crew details.

Do not publish artist names, ticket prices, attendance claims, unconfirmed benefits, invented testimonials, or fake prior-event photography.

The source deck is `REUNION.pdf`. Durable product constraints are recorded in `PRODUCT.md`, and the extracted visual system is recorded in `DESIGN.md` plus `.impeccable/design.json`.

## Implemented experience

The landing page sequence is:

1. Full-bleed hero: “Your people are the headliner,” confirmed logistics, and waitlist CTA.
2. Emotional story about friendships moving from daily life into group chats.
3. Interactive Then & Now matched crew portrait with accessible labels.
4. Experience modules covering games, discovery, food/flea, music, and memory-making without artist claims.
5. Crew categories for school, college, first job, hostel, and neighbourhood groups.
6. Crew-aware waitlist form with consent and accessible success messaging.
7. Final rally and privacy/organizer footer.

On screens below 680px, the Then & Now drag control becomes two naturally scrolling, captioned images. Experience modules become a vertical image-then-copy rhythm. Reduced-motion users retain all content without movement-dependent meaning.

## Visual system

Primary palette:

- Ink `#180c2b`
- Cream `#f5e7d2`
- Amber `#ffaa2b`
- Coral `#ff5a3d`
- Magenta `#ec2d7c`
- Violet `#6d2c91`

Fonts are loaded through `next/font`, which self-hosts the resulting assets:

- Barlow Condensed for display typography.
- Manrope for body and UI copy.
- IBM Plex Mono for confirmed logistics and metadata.

The creative north star is “The Living Reunion Poster”: oversized editorial typography, warm group photography, ticket-like metadata, flat colour fields, and only one signature interaction.

## Important files

- `app/page.tsx` — page content and section structure.
- `app/globals.css` — full responsive design system and component styling.
- `app/layout.tsx` — fonts, metadata, canonical URL, social metadata, and Vercel Analytics.
- `components/then-now.tsx` — accessible comparison interaction.
- `components/waitlist-form.tsx` — client-side form, analytics, success state, and Web Share/clipboard fallback.
- `app/api/waitlist/route.ts` — validation, bot checks, throttling, Supabase insertion, duplicate handling, and asynchronous Resend notification.
- `lib/waitlist.ts` — schemas and stable response contracts.
- `lib/rate-limit.ts` — current in-memory rate limiter.
- `lib/supabase-admin.ts` — server-only Supabase client.
- `app/privacy/page.tsx` — privacy notice.
- `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/icon.svg` — discoverability assets.
- `supabase/migrations/20261015120000_create_waitlist_leads.sql` — private lead table, RLS, grants, and case-insensitive unique email index.
- `tests/waitlist.test.ts` — waitlist helper and response-contract tests.
- `e2e/landing.spec.ts` — responsive, keyboard, reduced-motion, overflow, and review-capture journeys.
- `.env.example` — required production configuration.
- `README.md` — setup and operational instructions.

## Images and provenance

Five campaign images were generated with the built-in OpenAI image generator specifically for this project:

- `public/images/reunion-hero.png`
- `public/images/then-now.png`
- `public/images/experience-games.png`
- `public/images/experience-hunt.png`
- `public/images/experience-flea.png`

`public/images/then-now.webp` is the optimized derivative used by the CSS comparison; the PNG is retained as the embedded-prompt master. Exact prompts are stored in `.impeccable/prompts/`, and provenance is recorded in `public/images/PROVENANCE.md`. The remaining large images use `next/image` with AVIF/WebP negotiation and responsive sizes.

Review captures are available at:

- `.impeccable/review/desktop.png`
- `.impeccable/review/mobile.png`
- `.impeccable/review/crops/`

## Waitlist contract

`POST /api/waitlist` accepts normalized identity, crew metadata, email consent, privacy version, UTM attribution, referrer, honeypot timing, and an optional Turnstile token.

Successful public responses are limited to:

```json
{ "ok": true, "status": "created" }
```

or:

```json
{ "ok": true, "status": "already_joined" }
```

Failures use stable error codes and do not leak database details. Supabase’s service-role key is server-only. Resend alerts run after a successful response and do not invalidate a stored signup if notification delivery fails.

The current rate limiter is in-memory and suitable for local/single-instance protection. Before high-volume production traffic, consider replacing it with a shared store such as Vercel KV/Upstash so limits are consistent across instances.

## Analytics

Vercel Web Analytics is installed. Custom events are emitted for:

- `waitlist_start`
- `waitlist_success`
- `waitlist_duplicate`
- `crew_share`

Non-critical Turnstile code loads lazily and only when a public site key is configured.

## Latest verification

Completed successfully:

- TypeScript: `tsc --noEmit`
- ESLint
- Vitest: 6 tests passed
- Playwright: 10 tests passed, 2 intentional screenshot-project skips
- Optimized Next.js production build
- Responsive checks at 390px, 768px, and 1440px
- Keyboard-focus and reduced-motion journeys
- Horizontal-overflow and core content checks
- Desktop/mobile visual review
- Content audit for prohibited exact date, artist names, prices, and fabricated claims

The Playwright config starts Next directly rather than via `pnpm dev`, because the managed Codex runtime’s pnpm wrapper may attempt a dependency-policy install before executing scripts.

## Production configuration still required

Copy `.env.example` to `.env.local` or configure the corresponding Vercel environment variables:

- `NEXT_PUBLIC_SITE_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `WAITLIST_ALERT_TO`
- `WAITLIST_FROM_EMAIL`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

Before launch:

1. Apply the Supabase migration.
2. Supply the organizer privacy/contact details and final social URLs.
3. Verify the Resend sender domain and alert destination.
4. Configure Turnstile production keys.
5. Run a real Supabase/Resend integration signup test.
6. Run Lighthouse against the Vercel preview and verify the target metrics.
7. Complete the Chrome, Safari/WebKit, Firefox, and Edge promotion matrix.
8. Only add Event structured data after an authoritative exact event date is confirmed.

The site has not been deployed from this chat, and no external credentials have been added.

## Recommended next action

If the next chat is for launch preparation, begin by checking the local page and collecting the missing service credentials/contact URLs. If it is for design iteration, use `DESIGN.md`, the review screenshots, and the running local page as the visual authority; preserve the group-first positioning and the single-signature-motion discipline.
