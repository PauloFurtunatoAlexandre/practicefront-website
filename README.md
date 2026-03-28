# PracticeFront

Practice health monitoring for dental practice owners. PracticeFront gives you a 10-second scan across three pillars — Patients, Scheduling, and Collections — and holds your vendors accountable with live performance scores.

Free for dental practices. Partners pay $25/month per connected practice.

---

## What it does

- **Three Pillars health scan** — Daily scores across Patients, Scheduling, and Collections, computed from your practice management system data
- **Partner accountability layer** — Each vendor you pay gets a performance score tied to the pillar they touch. Green means performing. Red means act.
- **Vetted partner marketplace** — When a pillar is underperforming, PracticeFront surfaces alternatives
- **Built for OpenDental** — First integration target; Dentrix, Eaglesoft, and Curve Dental on the roadmap

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| Auth | better-auth (email/password + email verification) |
| Database | PostgreSQL via Drizzle ORM |
| Email | Resend |
| Payments | Stripe (quantity-based subscriptions) |
| CMS | Sanity v3 |
| Linting | Biome |
| Deployment | Vercel |
| Package manager | pnpm 10 (monorepo) |

---

## Project structure

```
practicefront/
├── apps/
│   └── web/                        # Next.js application
│       └── src/
│           ├── app/
│           │   ├── (site)/         # Public marketing site
│           │   │   ├── (home)/     # Homepage
│           │   │   ├── blog/       # Blog (Sanity-powered)
│           │   │   ├── how-it-works/
│           │   │   ├── pricing/
│           │   │   ├── partners/
│           │   │   ├── company/
│           │   │   └── contact/
│           │   ├── console/        # Authenticated app
│           │   │   ├── (auth)/     # Login, register, verify, reset
│           │   │   ├── (dashboard)/# Practice health dashboard
│           │   │   ├── (partner)/  # Partner portal + applications
│           │   │   └── (onboarding)/
│           │   └── api/            # Backend API routes
│           ├── components/
│           │   ├── local/          # Site-wide components (navbar, footer, auth-ui)
│           │   ├── sections/       # Page section components (hero, pillars, etc.)
│           │   └── ui/             # Shared UI primitives
│           └── lib/
│               ├── auth.ts         # better-auth server config
│               ├── auth-client.ts  # Browser auth client
│               ├── db/             # Drizzle schema + client
│               ├── health/         # Scoring engine
│               ├── sanity/         # CMS client + queries
│               └── stripe.ts       # Stripe singleton
└── packages/
    └── ui/                         # Shared component library (placeholder)
```

---

## Database schema

Four auth tables (managed by better-auth) plus four domain tables:

| Table | Purpose |
|---|---|
| `practices` | Dental practices owned by users; tracks PMS connection state and onboarding |
| `healthSnapshots` | Daily computed health scores per practice (one row per day) |
| `partners` | Vendor/partner accounts; linked to Stripe subscriptions |
| `partnerPractices` | Junction: which partner serves which practice, plus their performance score |

Run migrations:

```bash
pnpm --filter @practicefront/web exec drizzle-kit push
```

---

## Health scoring model

Scores run 0–100. Status thresholds: **green ≥ 75**, **yellow 50–74**, **red < 50**.

**Patients** (retention 75% + new patients 25%)
- Retention ≥ 90% → 70–100 pts | 80–90% → 40–70 pts | < 80% → 0–40 pts
- New patients ≥ 25/mo → 100 pts, scales to 0

**Scheduling** (no-show inverse 60% + recare rate 40%)
- No-show ≤ 5% → 100 pts | 5–10% → 50–100 pts | 10–20% → 0–50 pts
- Recare ≥ 85% → 100 pts | 70–85% → 50–100 pts | < 70% → 0–50 pts

**Collections** (collection rate 40% + days in AR 35% + denial rate 25%)
- Collection ≥ 98% → 100 pts | 90–98% → 50–100 pts | < 90% → 0–50 pts
- Days in AR ≤ 30 → 100 pts | 30–45 → 50–100 pts | > 45 → 0–50 pts
- Denial ≤ 5% → 100 pts | 5–10% → 50–100 pts | > 10% → 0–50 pts

Scores are computed daily by a cron job at 6 AM UTC (`/api/cron/health-refresh`).

---

## Partner billing model

Partners pay **$25/month × the number of connected practices**. This is a Stripe quantity-based subscription — the quantity increments automatically when a practice connects and decrements when they disconnect.

1. Partner submits application → Stripe Checkout session created
2. On successful checkout → partner status set to `approved`
3. Stripe webhooks handle subscription lifecycle events

---

## Getting started

### Prerequisites

- Node.js ≥ 22
- pnpm 10
- PostgreSQL database (Neon, Supabase, or local)
- Accounts for: Resend, Stripe, Sanity

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```bash
cp apps/web/.env.local.example apps/web/.env.local
```

Fill in all values:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/practicefront

# Auth
BETTER_AUTH_SECRET=        # openssl rand -hex 32
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email
RESEND_API_KEY=re_...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PARTNER_PRICE_ID=price_...

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=...

# Cron auth
CRON_SECRET=...
```

### 3. Push database schema

```bash
pnpm --filter @practicefront/web exec drizzle-kit push
```

### 4. Run the dev server

```bash
pnpm dev:web
```

Opens at [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev:web` | Start Next.js dev server (Turbopack) |
| `pnpm build:web` | Production build |
| `pnpm typecheck` | Run TypeScript across all packages |
| `pnpm lint` | Run Biome linter across all packages |

Run from the repo root.

---

## API routes

| Route | Method | Purpose |
|---|---|---|
| `/api/auth/[...all]` | * | better-auth handler |
| `/api/health/snapshot` | GET | Latest practice health snapshot |
| `/api/health/refresh` | POST | Trigger health score recalculation |
| `/api/partners/apply` | POST | Submit partner application + create Stripe Checkout |
| `/api/partners/connect` | POST | Link a partner to a practice |
| `/api/stripe/webhook` | POST | Handle Stripe subscription events |
| `/api/cron/health-refresh` | GET | Scheduled daily score refresh (Vercel cron) |
| `/api/newsletter` | POST | Email signup |

---

## Deployment

Deployed on Vercel. Environment variables are set in the Vercel project dashboard.

The cron job in `vercel.json` runs daily at 6 AM UTC:

```json
{
  "crons": [{ "path": "/api/cron/health-refresh", "schedule": "0 6 * * *" }]
}
```

Protect the cron endpoint by setting `CRON_SECRET` in both your `.env.local` and Vercel environment variables.

---

## Code quality

Biome handles both linting and formatting. Configuration is in `biome.json` at the repo root.

- **Tabs** for indentation
- **100-character** line width
- **Single quotes**, no semicolons
- Strict a11y and correctness rules enabled

```bash
# Check (no fix)
pnpm lint

# Auto-fix safe issues
pnpm --filter @practicefront/web exec biome check --fix .
```

---

## Content management (Sanity)

Blog posts, authors, and categories are managed in Sanity Studio. The schema lives in `src/lib/sanity/schema.ts`.

Content types: **Post**, **Author**, **Category**

Categories map to the product pillars: Practice Health, Collections, Scheduling, Patients, Partners, Industry News.
