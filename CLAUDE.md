@AGENTS.md

# Active FrontDesk — Website & Admin

Marketing site + internal admin panel for **Active FrontDesk**, a productised AI receptionist
service for Australian tradies and hospitality businesses ($2,000 setup + $399/month). The
actual AI receptionist (Vapi + n8n) lives in a separate repo — see
[../AI-Automation---Tradies/CLAUDE.md](../AI-Automation---Tradies/CLAUDE.md).

**Live site:** https://www.activefrontdesk.com.au
**Repo:** https://github.com/Mush9429/active-frontdesk-website
**Hosting:** Vercel, auto-deploys on push to `main`

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.1 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4 |
| Font | DM Sans |
| Data | Supabase (Postgres) — onboarding submissions / client records |
| Blog | Flat JSON files in `content/blog/`, no CMS |
| Email | Zoho Mail on the custom domain (`hello@activefrontdesk.com.au`) |
| Booking | Calendly (`CALENDLY_URL` in `src/lib/constants.ts`) |
| Domain registrar | VentraIP (`activefrontdesk.com.au`) |

## Brand / Design System

- **Accent (brand/action):** `#2563EB` (blue), hover `#1D4ED8` — used for CTAs, links, nav, icons.
- **Success/confirmation:** green (Tailwind `green-*`/`emerald-*`) — used for "with us" outcomes,
  BOOKED tags, checkmarks. Deliberately a *second* color, not the brand accent — keeps a purposeful
  two-tone system (blue = act, green = confirms a good outcome) rather than one hue doing everything.
- Originally shipped with an indigo accent (`#6366F1`) that turned out to be near-identical to a
  direct competitor's (Vozi) brand color — went through an orange attempt, landed on the current
  blue+green combination. If revisiting brand color again, check against competitors first.
- Card style: `bg-white rounded-2xl border border-[#E2E8F0] shadow-sm`, consistent across all
  marketing sections.

## Site Structure

```
src/app/
  page.tsx                  Marketing homepage (Header, Hero, StatsBand, LogoMarquee,
                             ProblemStatement, BeforeAfter, HowItWorks, FeatureShowcase,
                             Features, WhyWeBuiltThis, IdealFor, FAQ, BlogPreview,
                             FinalCTA, Footer). Pricing.tsx exists but is currently hidden
                             (not rendered, no nav link) — re-add the import/render + the
                             three "Pricing" nav links (Header desktop+mobile, Footer) to
                             bring it back.
  blog/                     Public blog (SEO), posts read from content/blog/*.json
  privacy/, terms/          Static legal pages
  onboard/                  Public multi-step intake form for new clients (see below)
  login/                    PIN-gated login for /admin
  admin/                    Internal dashboard (see below)
  api/
    onboard/                POST — saves onboarding submissions to Supabase
    admin/blog/[slug]/      Blog post CRUD (writes to content/blog/*.json on disk)
    admin/clients/[id]/     PATCH/DELETE for client records (Supabase, auth-protected)
    auth/login, auth/logout PIN auth, sets `admin_auth` cookie
```

## Admin Panel (`/admin`)

PIN-protected via `middleware.ts` (checks `admin_auth` cookie, matcher `/admin/:path*` —
**note: this does NOT cover `/api/admin/*`**, so any new admin API route needs its own auth
check, same pattern as `api/admin/clients/[id]/route.ts`'s `isAuthenticated()` helper. The
blog CRUD routes predate this and have no such check — don't copy that gap into new routes.

- **Dashboard** — stats + quick actions.
- **Blog** — full CRUD, stored as JSON files in `content/blog/`. Works fine on Vercel since
  it's read-only at request time in production (posts are added via this admin UI in dev/locally
  and committed, not written at runtime in prod — there's no serverless disk-write here unlike
  the old onboarding flow below).
- **Clients** (`/admin/clients`) — list + detail view of onboarding submissions, backed by
  Supabase. This is the operational core: when someone fills out `/onboard`, it shows up here
  with every answer needed to configure their n8n workflow + Vapi assistant (see the other repo).
  - Detail view includes an editable **Client & Billing** card: status (new/in-progress/live/
    churned), join date, monthly fee, setup fee — with **Next Billing Date** and **Estimated LTV**
    computed live from those inputs. No payment processor is connected, so this is manually
    tracked and intentionally labelled "estimated," not treated as real billing/payment truth.
  - Delete is available on both list and detail views (confirm dialog → real Supabase delete,
    not a soft-hide).
- **Invoices, Analytics** — still stubs ("Coming Soon"), pending Supabase-backed build-out.

## Onboarding Flow (`/onboard` → Supabase → `/admin/clients`)

This is how a new client goes from "interested" to "ready to configure":

1. Send them `https://www.activefrontdesk.com.au/onboard` (not linked anywhere on the public
   site yet — sent directly, e.g. after a demo call).
2. Multi-step form collects: business info, service details, voice/greeting preferences,
   calendar & booking prefs, transfer/escalation, pricing (for the knowledge base), extras.
3. `POST /api/onboard` inserts into the `onboarding_submissions` Supabase table.
4. Appears immediately in `/admin/clients` for setup.

**Spam protection** (`/api/onboard/route.ts`): honeypot field (`name="fax"`, invisible/
`tabIndex={-1}`/`aria-hidden`), a minimum-fill-time check (rejects <3s completions), and an
IP-based rate limit (max 3/hour, backed by the `ip_address` column). None of this adds friction
for a real user — it's there because the link, while not public today, is a plain URL that could
get scraped or shared. Anti-spam fields (`_hp`, `_startedAt`) are stripped before anything is
treated as business data.

**Important history:** this used to write submissions to local disk (`fs.writeFile` into
`content/onboarding/`), which **silently failed on Vercel** (serverless has no persistent
filesystem) — meaning submissions were being lost with no error shown to the client or admin.
Fixed by moving to Supabase. If you ever see another "write to disk" pattern proposed for
user-facing data on this project, it will have the same problem — Vercel's filesystem is
ephemeral/read-only outside of `/tmp`.

### Supabase

- Server-only client: `src/lib/supabase.ts` — `getSupabaseAdmin()`, returns `null` gracefully
  if env vars are missing (so build/other routes never crash on a missing config).
- **Never** import this into a client component — it holds the service-role/secret key.
- Env vars (set in Vercel **and** local `.env.local`, which is gitignored):
  - `SUPABASE_URL` — project URL, e.g. `https://dcimphrgqwjekcctgnlt.supabase.co`
  - `SUPABASE_SERVICE_ROLE_KEY` — the **secret key** (Supabase's newer key system uses
    `sb_secret_...` / `sb_publishable_...` naming, replacing the old `service_role`/`anon`
    terminology — same underlying privilege levels, just renamed. Use the secret key here,
    never the publishable one.)
- Schema changes go through the Supabase **SQL Editor** by hand — there's no migration tooling
  in this repo. Current `onboarding_submissions` columns beyond the obvious: `data` (jsonb, the
  full form payload), `join_date`, `monthly_fee` (default 399), `setup_fee` (default 2000).
- `ADMIN_PIN` env var secures `/admin` (defaults to `1234` if unset — **must** be set in Vercel
  for production, don't rely on the fallback).

## Infrastructure Notes / Gotchas

- **Domain:** `activefrontdesk.com.au`, registered via VentraIP, requires an ABN + registered
  business name to hold (`.com.au` eligibility rule) — registered under ABN `95 639 679 926`
  and ASIC business name "Active Frontdesk".
- **DNS:** apex `A` record → Vercel's IP, `www` `CNAME` → Vercel's per-project hostname, **plus**
  MX/TXT/DKIM records for Zoho email — all coexist in the same VentraIP DNS zone. If touching
  DNS again, don't remove the Zoho records while fixing something Vercel-related, or vice versa.
- **Sticky mobile CTA bug (fixed):** a fixed-position element nested inside `<header>` broke once
  the header gained `backdrop-blur` on scroll — `backdrop-filter` creates a new containing block,
  so the "fixed" child anchored to the header instead of the viewport. Fix: keep anything that
  needs to be `position: fixed` relative to the viewport **outside** any ancestor with
  `backdrop-filter`/`transform`/`will-change`, not nested inside it.
- **Clearing `.next` while `npm run dev` is running breaks the live process** — it'll start
  500-ing on every route. Restart the dev server after deleting `.next`, don't just delete it
  and expect the running process to recover.
- **Production build lint errors:** a few pre-existing `@next/next/no-html-link-for-pages`
  warnings (raw `<a>` instead of `<Link>` in a few spots) show up in `next lint` but do **not**
  fail `next build` on this Next.js version — confirmed via an actual `npm run build`, not just
  assumed. Worth cleaning up eventually, not currently blocking anything.
- **Vapi demo audio:** `/audio/demo-call.m4a`, converted from a raw `.wav` recording via macOS's
  built-in `afconvert` (mono AAC, ~64kbps) since `ffmpeg`/ImageMagick aren't available in every
  environment this project gets worked on from — `afconvert` is a reliable fallback on macOS.

## Known Gaps / Not Yet Built

- Admin Invoices and Analytics are stubs, waiting on further Supabase tables. Payment collection
  is manual for now (bank transfer, invoiced from the dashboard once built) — no Stripe/payment
  processor connected.
- Pricing section is hidden site-wide (see Site Structure above) — a deliberate choice, not a bug.
- A known Vapi prompt bug (declining to give an email sometimes triggers an unwanted transfer, or
  gets acknowledged-but-ignored) was reported fixed in the other repo — not independently
  re-verified from this repo's side.
- No automated tests.
- Blog CRUD API routes (`/api/admin/blog/*`) have no server-side auth check (page-level
  middleware only) — low risk today since the blog isn't sensitive data, but worth hardening
  if this ever matters more.
