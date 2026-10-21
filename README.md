# Reunion — The Festival of Friendship

A Next.js 16 landing page for the December 2026 Reunion event in Hyderabad.

## Local development

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env.local` and add the service credentials.
3. Run `pnpm dev` and open `http://localhost:3000`.

The page renders without service credentials. Waitlist submission requires Supabase configuration.

## Waitlist setup

1. Create a Supabase project.
2. Apply `supabase/migrations/20261015120000_create_waitlist_leads.sql`.
3. Set `SUPABASE_URL` and the server-only `SUPABASE_SERVICE_ROLE_KEY`.
4. Configure Resend with `RESEND_API_KEY`, `WAITLIST_ALERT_TO`, and `WAITLIST_FROM_EMAIL`.
5. For production bot protection, configure Cloudflare Turnstile keys.

The browser never receives the Supabase service-role key. The table has RLS enabled and grants revoked from `anon` and `authenticated`.

## Verification

- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm test:e2e`
- `pnpm build`
