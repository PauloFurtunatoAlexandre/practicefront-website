# PracticeFront Web — Claude Code Project

This is the marketing website and web dashboard for PracticeFront, a dental practice health monitoring and partner accountability platform. You are implementing a world-class marketing site with a fully custom design identity — **not a template, not generic SaaS**.

---

## What This Product Is

PracticeFront gives dental practice owners a **10-second health scan** across three pillars:

- **Patients** — retention rate, reactivation value, new patient acquisition
- **Scheduling** — no-show cost, unscheduled treatment value, schedule utilization
- **Collections** — collection rate, days in AR, insurance denial rate, RCM partner performance

The unique differentiator is **partner accountability**: when a pillar turns red, PracticeFront shows which vendor is responsible and connects the practice to a vetted alternative. The product is **free for practices** — partners pay $20–25/month per connected practice.

Target audiences:
1. **Primary:** Dental practice owners (OpenDental users first)
2. **Secondary:** Dental service vendors/partners (billing companies, marketing agencies, membership plan providers)

---

## Tech Stack

```
Framework:     Next.js 15 (App Router, Server Components by default)
Language:      TypeScript strict mode — no `any`, no `as` casts
Styling:       Tailwind CSS 4 with @theme directive
Components:    shadcn/ui primitives + local components in src/components/local/
Animation:     Framer Motion (already installed as `motion` and `framer-motion`)
CMS:           Sanity (already wired — use for blog, testimonials, dynamic content)
Auth:          better-auth
Database:      Drizzle ORM + PostgreSQL
Package mgr:   pnpm (monorepo — never use npm or yarn)
Linter:        Biome (no ESLint, no Prettier)
```

**Run commands from monorepo root:**
```bash
pnpm dev:web                              # start web dev server
pnpm --filter @practicefront/web add <pkg> # add a dependency
pnpm -r run typecheck                     # typecheck all packages
```

---

## Design System — Indigo Trust

This is the **complete design authority**. Do not use Tailwind default colors (slate, zinc, gray, etc.) except as temporary scaffolding. Every component must use these tokens.

### Fonts — The 4-Font Stack

```tsx
// app/layout.tsx — next/font setup
import { Inter, Space_Grotesk, JetBrains_Mono, Instrument_Serif } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
})
```

| Font | Variable | `font-*` class | Usage |
|---|---|---|---|
| Inter | `--font-sans` | `font-sans` | Body copy, descriptions, UI text |
| Space Grotesk | `--font-heading` | `font-heading` | All headings, nav items, labels, badges, buttons |
| JetBrains Mono | `--font-mono` | `font-mono` | Metrics, data values, stats, timestamps, code |
| Instrument Serif | `--font-display` | `font-display` | Hero display text, pull quotes (use sparingly — 1-2 places per page max) |

**Every `<h1>` through `<h4>`, every nav item, every button label → `font-heading`.**
**Every stat, metric, number, or data label → `font-mono`.**
**Never leave a heading in `font-sans`.**

> Note: The existing `layout.tsx` uses Switzer via Fontshare. Replace it with next/font — remove the `<link>` tag for Switzer and add the four fonts above.

### Color Tokens — `globals.css`

Replace the current shadcn defaults in `src/app/globals.css` with:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans:    var(--font-inter);
  --font-heading: var(--font-space-grotesk);
  --font-display: var(--font-instrument-serif);
  --font-mono:    var(--font-jetbrains-mono);

  --color-background:           var(--background);
  --color-foreground:           var(--foreground);
  --color-card:                 var(--card);
  --color-card-foreground:      var(--card-foreground);
  --color-popover:              var(--popover);
  --color-popover-foreground:   var(--popover-foreground);
  --color-primary:              var(--primary);
  --color-primary-foreground:   var(--primary-foreground);
  --color-secondary:            var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted:                var(--muted);
  --color-muted-foreground:     var(--muted-foreground);
  --color-accent:               var(--accent);
  --color-accent-foreground:    var(--accent-foreground);
  --color-destructive:          var(--destructive);
  --color-border:               var(--border);
  --color-input:                var(--input);
  --color-ring:                 var(--ring);
  --color-warm:                 var(--warm);
  --color-warm-foreground:      var(--warm-foreground);
  --color-success:              var(--success);
  --color-success-foreground:   var(--success-foreground);
  --color-chart-1:              var(--chart-1);
  --color-chart-2:              var(--chart-2);
  --color-chart-3:              var(--chart-3);
  --color-chart-4:              var(--chart-4);
  --color-chart-5:              var(--chart-5);
  --color-sidebar:              var(--sidebar);
  --color-sidebar-foreground:   var(--sidebar-foreground);
  --color-sidebar-primary:      var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent:       var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border:       var(--sidebar-border);
  --color-sidebar-ring:         var(--sidebar-ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

/* ── Light mode (default) ── */
:root {
  --radius: 0.5rem;
  --background:           222 20% 97%;
  --foreground:           230 25% 10%;
  --card:                 0 0% 100%;
  --card-foreground:      230 25% 10%;
  --popover:              0 0% 100%;
  --popover-foreground:   230 25% 10%;
  --primary:              234 75% 55%;
  --primary-foreground:   0 0% 100%;
  --secondary:            225 15% 94%;
  --secondary-foreground: 230 25% 10%;
  --muted:                225 15% 94%;
  --muted-foreground:     225 10% 38%;
  --accent:               234 50% 93%;
  --accent-foreground:    234 75% 45%;
  --destructive:          0 72% 51%;
  --destructive-foreground: 0 0% 100%;
  --border:               225 12% 86%;
  --input:                225 12% 86%;
  --ring:                 234 75% 55%;
  --warm:                 28 75% 48%;
  --warm-foreground:      0 0% 100%;
  --success:              152 55% 38%;
  --success-foreground:   0 0% 100%;
  --chart-1: 234 75% 55%;
  --chart-2: 152 55% 42%;
  --chart-3: 28 75% 48%;
  --chart-4: 270 60% 58%;
  --chart-5: 0 70% 55%;
  --sidebar:                    225 20% 97%;
  --sidebar-foreground:         230 25% 10%;
  --sidebar-primary:            234 75% 55%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent:             234 50% 93%;
  --sidebar-accent-foreground:  234 75% 45%;
  --sidebar-border:             225 12% 86%;
  --sidebar-ring:               234 75% 55%;
}

/* ── Dark mode ── */
.dark {
  --background:           230 18% 6%;
  --foreground:           220 20% 95%;
  --card:                 230 16% 9%;
  --card-foreground:      220 20% 95%;
  --popover:              230 16% 9%;
  --popover-foreground:   220 20% 95%;
  --primary:              234 85% 68%;
  --primary-foreground:   0 0% 100%;
  --secondary:            230 14% 13%;
  --secondary-foreground: 220 20% 95%;
  --muted:                230 14% 13%;
  --muted-foreground:     220 10% 56%;
  --accent:               234 40% 20%;
  --accent-foreground:    234 85% 72%;
  --destructive:          0 72% 62%;
  --destructive-foreground: 0 0% 100%;
  --border:               230 12% 18%;
  --input:                230 12% 22%;
  --ring:                 234 85% 68%;
  --warm:                 28 80% 58%;
  --warm-foreground:      0 0% 100%;
  --success:              152 58% 46%;
  --success-foreground:   0 0% 100%;
  --chart-1: 234 85% 68%;
  --chart-2: 152 60% 52%;
  --chart-3: 28 80% 58%;
  --chart-4: 270 65% 65%;
  --chart-5: 0 72% 62%;
  --sidebar:                    230 16% 9%;
  --sidebar-foreground:         220 20% 95%;
  --sidebar-primary:            234 85% 68%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent:             234 40% 20%;
  --sidebar-accent-foreground:  234 85% 72%;
  --sidebar-border:             230 12% 18%;
  --sidebar-ring:               234 85% 68%;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}
```

> **HSL values have no `hsl()` wrapper** — this is required for Tailwind opacity modifiers to work (`bg-primary/20`, `text-foreground/60`).

### Logo — The Blocks Mark

The canonical PracticeFront logo is **three overlapping data blocks** at opacity 0.3 / 0.55 / 0.9. There is also an existing `PracticeFrontLogo` component in `src/components/local/practicefront-logo.tsx` (the SVG wordmark) — keep it, but add the Blocks mark for contexts where a symbol-only mark is needed.

```tsx
// src/components/local/blocks-logo.tsx
interface BlocksLogoProps {
  size?: number
  className?: string
}

export function BlocksLogo({ size = 32, className }: BlocksLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="4"  y="6"  width="38" height="24" rx="4" fill="currentColor" opacity="0.3"/>
      <rect x="12" y="18" width="38" height="24" rx="4" fill="currentColor" opacity="0.55"/>
      <rect x="20" y="30" width="40" height="28" rx="4" fill="currentColor" opacity="0.9"/>
    </svg>
  )
}
```

Uses `currentColor` — color it with `text-primary` or `text-foreground`. No hardcoded colors.

**Blocks lockup (symbol + wordmark):**
```tsx
<div className="flex items-center gap-2.5">
  <BlocksLogo size={28} className="text-primary" />
  <span className="font-heading font-bold text-base tracking-tight">
    Practice<span className="opacity-35">Front</span>
  </span>
</div>
```

### Brand Gradients

```tsx
// Gradient text — hero headlines
"bg-gradient-to-br from-primary to-[hsl(280,70%,65%)] bg-clip-text text-transparent"

// Subtle card accent background
"bg-gradient-to-br from-primary/6 to-[hsl(270,60%,60%)]/6"

// Dark hero radial spotlight (dark sections)
"bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsl(234,85%,68%,0.12),transparent)]"
```

### Noise Texture

Apply to any full-bleed section that needs atmosphere:
```tsx
// Add to section className or via ::before in CSS
// Tailwind: "relative" on parent, then:
<div className="pointer-events-none absolute inset-0 opacity-[0.025] bg-[url('data:image/svg+xml,...')]" aria-hidden="true" />
```

---

## Project Structure

```
apps/web/src/
├── app/
│   ├── (site)/              # Marketing site route group
│   │   ├── (home)/          # Homepage
│   │   │   └── page.tsx
│   │   ├── blog/            # Blog (Sanity-powered)
│   │   ├── company/         # About page
│   │   ├── contact/
│   │   ├── pricing/
│   │   ├── roadmap/
│   │   └── layout.tsx       # Marketing layout (nav + footer)
│   ├── (app)/               # Authenticated app (dashboard)
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout (fonts, metadata, providers)
├── components/
│   ├── ui/                  # shadcn/ui primitives (do not edit directly)
│   └── local/               # Custom components — edit freely
│       ├── blocks-logo.tsx  # [TO CREATE] Blocks mark SVG
│       ├── navbar.tsx       # Marketing navbar
│       ├── footer.tsx       # Marketing footer
│       ├── button.tsx       # Custom button wrapper
│       ├── container.tsx    # Max-width container
│       ├── text.tsx         # Heading/Subheading typography components
│       └── ...              # Other existing local components
├── lib/
│   ├── sanity/              # Sanity client, queries, live preview
│   └── ...
└── env.ts                   # Typed env vars
```

---

## Website Pages — What to Build

Reference: `../../PracticeFront-Website-Brief.md` for full narrative and copy direction.

### Homepage `(site)/(home)/page.tsx`

Server Component. Sections in order:

1. **Hero** — headline + subheadline + product screenshot + dual CTA (`Get Started Free` primary, `See How It Works` ghost)
2. **Problem** — empathy block, no product pitch
3. **Three Pillars** — Patients / Scheduling / Collections with metric examples
4. **Partner Accountability** — the unique differentiator, show partner score UI
5. **How It Works** — 3 steps: Connect → Monitor → Act
6. **Social proof** — testimonials (pull from Sanity)
7. **Pricing callout** — "Free for practices" teaser + link to pricing
8. **Final CTA** — emotional close + `Get Started Free`

**Hero headline:** "Your practice health, in a 10-second scan."
**Primary CTA:** Routes to `/console/register`
**Secondary CTA:** Routes to `/how-it-works` or smooth-scrolls to How It Works section

### How It Works `(site)/how-it-works/`

Currently does not exist — create it. Server Component. Expanded pillar detail, FAQ accordion, data security section, integration notes.

### Pricing `(site)/pricing/page.tsx`

Already exists. Update to match new design system and messaging. Three tiers: Practice (Free), Partner ($20-25/mo/practice), Enterprise (contact).

### For Partners `(site)/partners/`

Currently does not exist — create it. Separate page for vendors/service providers. Key message: "Good vendors welcome accountability." Partner application form.

### About / Company `(site)/company/page.tsx`

Already exists. Update to match design system. Mission statement, origin story, team, core beliefs.

### Blog `(site)/blog/`

Already exists with Sanity integration. Keep as-is but update styles to match design system.

---

## Component Conventions

### Server vs Client

Default to **Server Components**. Only add `"use client"` when you need:
- `useState`, `useEffect`, `useRef`, or any React hook
- Event handlers (`onClick`, `onChange`, etc.)
- Framer Motion animations
- Browser APIs (`window`, `document`)

Push `"use client"` to the smallest possible leaf component. A page should almost never be fully client.

### Typography

```tsx
// CORRECT — headings use font-heading
<h1 className="font-heading text-5xl font-bold tracking-tight">...</h1>

// CORRECT — data/metrics use font-mono
<span className="font-mono text-3xl font-semibold tabular-nums">98.2%</span>

// CORRECT — editorial display moment
<p className="font-display italic text-2xl">...</p>

// WRONG — heading without font-heading
<h2 className="text-2xl font-semibold">...</h2>
```

### Tailwind color usage

```tsx
// CORRECT — use semantic tokens
className="bg-background text-foreground border-border"
className="bg-primary text-primary-foreground"
className="text-muted-foreground"
className="bg-primary/10 text-primary"  // with opacity modifier

// WRONG — hardcoded colors or Tailwind defaults
className="bg-white text-slate-900 border-slate-200"
className="text-zinc-500"
className="bg-blue-600"
```

### Motion — Framer Motion

```tsx
"use client"
import { motion } from "framer-motion"

// Standard viewport entrance
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ type: "spring", stiffness: 260, damping: 24 }}
>

// Staggered children
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 28 } }
}
```

### cn() utility

Always use `cn()` for conditional classes:
```tsx
import { cn } from "@/lib/utils"
<div className={cn("base-classes", condition && "conditional-classes", className)} />
```

---

## Key Decisions

| Decision | Choice | Reason |
|---|---|---|
| Default theme | **Light** | Practice owners = daytime work environment |
| Dark mode | Via `.dark` on `<html>` | User toggle, not OS preference |
| Primary CTA target | `/console/register` | Self-serve signup, already exists |
| CMS | Sanity | Already integrated, use for blog + testimonials |
| Font loading | next/font | Zero layout shift, subset optimization |
| Routing | App Router route groups | `(site)` for marketing, `(app)` for dashboard |
| Existing logo | Keep `PracticeFrontLogo` wordmark | It's animated and distinctive — keep in nav |

---

## What Needs To Be Updated vs Reused

### Update (design system migration)
- `src/app/globals.css` — replace shadcn defaults with Indigo Trust tokens (see above)
- `src/app/layout.tsx` — replace Switzer/Fontshare with next/font four-font stack; add `font-sans` class to `<body>`
- `src/components/local/text.tsx` — update Heading/Subheading to use `font-heading`
- `src/components/local/button.tsx` — update color classes to use `bg-primary`, `text-primary-foreground`
- `src/components/local/navbar.tsx` — update link colors from `text-slate-950` to `text-foreground`
- `src/components/local/footer.tsx` — update colors
- Any component using `text-slate-*`, `bg-slate-*`, `border-slate-*` → replace with semantic tokens

### Create (new pages / components)
- `src/components/local/blocks-logo.tsx` — Blocks SVG mark
- `src/app/(site)/how-it-works/` — new route + page
- `src/app/(site)/partners/` — new route + page (For Partners)
- Marketing section components: `PillarCard`, `PartnerAccountabilitySection`, `HowItWorksSteps`, `PricingCallout`

### Reuse as-is
- Sanity integration (`src/lib/sanity/`)
- Auth setup (`better-auth`)
- Database / Drizzle ORM
- `src/components/ui/` — shadcn primitives (styling adapts via CSS vars)
- `src/components/local/container.tsx` — max-width wrapper
- Blog route structure

---

## Accessibility & Performance

- All images: use `next/image` with `alt` text and correct `sizes` prop. `priority` on hero image.
- Animated components: respect `prefers-reduced-motion` — wrap Framer Motion in `useReducedMotion()` check.
- Color contrast: primary indigo on white must pass AA. Use `bg-primary text-primary-foreground` as the system provides.
- Target Lighthouse ≥ 90 mobile on all marketing pages.
- Fonts: `display: 'swap'` on all next/font declarations.

---

## Anti-Patterns — Never Do These

- **Hardcode colors**: `#3b4fd9`, `hsl(234, ...)`, `bg-blue-600` — always use token classes
- **Skip `font-heading` on headings**: Every `<h1>`–`<h4>` must have `font-heading`
- **`"use client"` on a page**: Push it to the smallest interactive leaf
- **Import Framer Motion in a Server Component**: It will break. Always in client components.
- **Add new dependencies without checking**: Framer Motion, shadcn, Zod, Sanity — all already installed. Check before adding.
- **Tailwind default color names** (`slate-`, `zinc-`, `gray-`, `blue-`): Use semantic tokens instead
- **Generic layouts**: Centered hero → 3-column grid → testimonials → CTA. This is the template. Break it.
- **Flat white backgrounds**: Use `bg-background` (slightly tinted) and add depth with noise texture and subtle gradients

---

## Brand Voice (for copy)

- **Tone:** Confident, plain-spoken, warm. Not clinical, not startup-hype.
- **Avoid:** "revolutionize", "transform", "leverage", "synergy", "seamless"
- **Use specifics:** "$299/month vs $0/month" beats "affordable"
- **Address the owner directly:** Write "you" not "practices" or "dentists"
- **Numbers signal trust:** Use actual metrics whenever possible

---

## Reference Files (in monorepo root `/claude/` folder)

- `../PracticeFront-Website-Brief.md` — full page-by-page content strategy
- `../tokens.md` — complete design token reference with copy-paste globals.css
- `../PracticeFront-Visual-Identity.html` — live visual identity system
- `../design-system/PracticeFront-Design-System.html` — interactive component showcase
- `../PracticeFront-Market-Research-2026.md` — competitive analysis and market context

---

## Product Positioning — PMS Connector (Important)

PracticeFront is **not** an OpenDental-only tool. It is a **universal connector** for any dental practice management system (PMS). OpenDental is the launch integration — used first because of its open-source nature and popularity among independent practices — but the product vision is to connect to any PMS.

**Supported / planned PMS integrations:**
- OpenDental (launched first)
- Dentrix
- Eaglesoft
- Curve Dental
- Carestream Dental
- Denticon
- Practice-Web

**Messaging rule:** Never say "built for OpenDental" as the product identity. Say "works with your PMS" or "connects to OpenDental, Dentrix, Eaglesoft, and more." OpenDental can be highlighted as the first/most mature integration, but must not be the product ceiling.

---

## Implementation Plan

### Current state (as of March 2026)
The marketing website is fully scaffolded and running at localhost:3000. All pages exist. The design system (Indigo Trust) is applied. Sanity CMS is wired for blog + newsletter automation.

What does **not** exist yet: the authenticated console/dashboard, real PMS integrations, database, auth, and billing.

---

### Phase 1 — Marketing Site Polish ✅ Complete

*Goal: World-class marketing site that converts visitors to signups.*

- [x] Monorepo scaffolded (Next.js 15, Tailwind 4, Framer Motion, Sanity)
- [x] Design system applied (Indigo Trust tokens, 4-font stack)
- [x] Font system corrected — Instrument Serif (`font-display`) for all titles; Space Grotesk (`font-heading`) for UI labels/buttons/nav; Tailwind 4 HSL tokens with full `hsl()` wrappers
- [x] Homepage — Hero, Problem, Pillars, Partner Accountability, How It Works, Social Proof, Pricing, Final CTA
- [x] Hero two-column grid fixed (`grid-cols-[1fr_420px]` — comma is invalid in Tailwind arbitrary values)
- [x] Pages: `/how-it-works`, `/partners`, `/pricing`, `/company`, `/contact`, `/blog`, `/blog/[slug]`
- [x] Newsletter API + Sanity webhook automation
- [x] Fix PMS-agnostic messaging (remove OpenDental-only framing) — now names OpenDental, Dentrix, Eaglesoft & more
- [x] PMS compatibility strip on homepage (OpenDental live, others coming soon)
- [x] Dark mode toggle in navbar — sun/moon toggle, persists to localStorage, FOUC-free via `/public/theme-init.js`
- [x] Accessibility — skip-to-content link, `id="main-content"`, `htmlFor`/`id` pairs on all form inputs, focus-visible rings
- [x] SEO metadata — `openGraph` added to company, blog, contact pages; contact refactored to server component
- [x] Blog crash fixed — Sanity client no longer throws when `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset; queries wrapped in try/catch
- [ ] Add real testimonials via Sanity (requires Sanity project configured — blocked until project is set up)
- [x] Homepage parallax depth pass — all 9 sections have scroll-driven animation; SocialProof + PricingCallout got `useScroll`/`useSpring` background parallax; Problem and FinalCTA already had parallax; HowItWorks has line-draw animation
- [x] SEO — `sitemap.ts` + `robots.ts` added (auto-generates `/sitemap.xml` and `/robots.txt`)
- [x] SEO metadata on all marketing pages — homepage, how-it-works, pricing, partners each have `title` + `description` + `openGraph`; client pages use companion `layout.tsx` to export metadata
- [x] Build passes clean — `next build` ✓, `tsc --noEmit` ✓, all 20+ pages render

---

### Phase 2 — Auth & Onboarding ✅ Complete

*Goal: A practice owner can sign up, verify email, and reach a working health dashboard.*

- [x] Installed: `better-auth`, `drizzle-orm`, `postgres`, `stripe`, `drizzle-kit`
- [x] Database schema — `src/lib/db/schema.ts`: users, sessions, accounts, verifications, practices (Drizzle + Postgres)
- [x] Drizzle config — `apps/web/drizzle.config.ts`
- [x] Better-auth setup — `src/lib/auth.ts`: email/password + email verification + password reset via Resend
- [x] Auth client — `src/lib/auth-client.ts`: `createAuthClient` from `better-auth/react`, re-exports `signIn`, `signUp`, `signOut`, `useSession`
- [x] Auth API route — `src/app/api/auth/[...all]/route.ts` (better-auth Next.js handler)
- [x] Onboarding API route — `src/app/api/onboarding/route.ts` (saves practice record)
- [x] Auth layout — `src/app/console/(auth)/layout.tsx` (centered, logo + footer note)
- [x] Auth pages — register, login, verify, forgot-password, reset-password (all under `console/(auth)/`)
- [x] Shared auth UI — `src/components/local/auth-ui.tsx`: `AuthField`, `AuthButton`, `AuthError`, `AuthDivider`
- [x] Onboarding layout — `src/app/console/(onboarding)/layout.tsx`
- [x] Onboarding wizard — `src/app/console/(onboarding)/welcome/onboarding-wizard.tsx`: 3-step animated wizard (Practice info → PMS choice → Connect)
- [x] Dashboard layout + placeholder — `src/app/console/(dashboard)/`: nav bar, pillar placeholder cards, connect PMS CTA
- [x] Env example — `apps/web/.env.local.example` with all required vars

**What still needs wiring for full functionality:**

- `DATABASE_URL` + `BETTER_AUTH_SECRET` + `RESEND_API_KEY` must be in `.env.local`
- Run `pnpm drizzle-kit push` (or migrate) to create DB tables
- PMS connector download (step 3 of onboarding) is a UI placeholder

---

### Phase 3 — Three Pillars Dashboard ✅ Complete

*Goal: A logged-in practice owner sees their real health scan, not placeholder data.*

- [x] DB schema — `health_snapshots` table added to `src/lib/db/schema.ts` (all pillar metrics + scores)
- [x] PMS adapter layer — `src/lib/pms/types.ts` (PracticeHealthRaw + PmsAdapter interface), `opendental.ts` (deterministic stub — swap for real OD queries), `index.ts` (adapter registry)
- [x] Calculation engine — `src/lib/health/calculate.ts` with industry-benchmark thresholds (ADA/MGMA): Patients (retention × 0.75 + new pts × 0.25), Scheduling (no-show × 0.6 + recare × 0.4), Collections (collection rate × 0.5 + AR days × 0.3 + denial × 0.2)
- [x] Health types — `src/lib/health/types.ts`: PillarStatus, PillarScore, PatientsResult, SchedulingResult, CollectionsResult, PracticeHealthResult
- [x] API routes — `POST /api/health/refresh` (trigger refresh for current user), `GET /api/health/snapshot` (fetch latest)
- [x] Vercel cron — `GET /api/cron/health-refresh` (daily at 6 AM UTC), registered in `apps/web/vercel.json`
- [x] Dashboard UI — `src/app/console/(dashboard)/dashboard/page.tsx` (Server Component, fetches DB, renders real pillar cards or appropriate empty state), `pillar-card.tsx` (animated, score bar, metric grid), `refresh-button.tsx` (client, calls POST, router.refresh())
- [x] Three states: no PMS → Connect CTA | PMS connected, no snapshot → "scan in progress" | has snapshot → live pillar cards

**What still needs wiring:**

- OpenDental adapter stub → replace `fetchSnapshot()` body with real OD SQL queries once connector agent is built
- `CRON_SECRET` env var for cron authentication in production

---

### Phase 4 — Partner Layer ✅ Complete

*Goal: Partners pay and are visible in the accountability layer of the dashboard.*

- [x] DB schema — `partners` table (companyName, pillarCategory, serviceType, status, stripeCustomerId, stripeSubscriptionId) + `partner_practices` junction (pillar, performanceScore, lastScoredAt)
- [x] Stripe singleton — `src/lib/stripe.ts`, lazy init, `STRIPE_PARTNER_PRICE_ID` for per-practice subscription ($25/mo, quantity = # connected practices)
- [x] Partner application flow — `src/app/console/(partner)/partners/apply/` — 3-step animated wizard (Company → Pillar/Category → Review), submits to API, redirects to Stripe Checkout
- [x] Pending confirmation page — `src/app/console/(partner)/partners/pending/`
- [x] Partner dashboard — `src/app/console/(partner)/partners/dashboard/` — shows status, stats (practices, avg score, monthly billing), connected practice list with per-practice scores
- [x] API: `POST /api/partners/apply` — creates partner record + Stripe customer + Checkout session
- [x] API: `POST /api/partners/connect` — practice connects a partner to a pillar, updates Stripe subscription quantity
- [x] Stripe webhook — `POST /api/stripe/webhook` — handles `checkout.session.completed` (approve), `customer.subscription.deleted` (suspend), `customer.subscription.updated` (reactivate)
- [x] Practice dashboard accountability layer — assigned partners shown below each pillar card with performance score; "Find a partner" CTA links to `/partners` when none assigned
- [x] Env vars documented — `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PARTNER_PRICE_ID`, `CRON_SECRET` added to `.env.local.example`

**What still needs wiring:**

- Create Stripe product + recurring price in dashboard, set `STRIPE_PARTNER_PRICE_ID`
- Register webhook endpoint in Stripe dashboard → `POST /api/stripe/webhook`
- Build admin UI to manually approve/reject partner applications (currently only Stripe payment triggers approval)

---

### Phase 5 — PMS Connector Expansion
*Goal: Support Dentrix and Eaglesoft in addition to OpenDental.*

- Build Dentrix adapter (CSV export parser initially, then API)
- Build Eaglesoft adapter (SQL or API)
- Add "Request my PMS" form for unsupported systems
- PMS compatibility badge on homepage (shows logos)
- Integration status page (`/integrations`)

---

### Phase 6 — Content & SEO
*Goal: Organic traffic from practice owners searching for practice health, billing accountability, etc.*

- Seed Sanity with 10–15 foundational blog posts
  - "What is a healthy dental collection rate?"
  - "How to know if your billing company is underperforming"
  - "The real cost of a 10% no-show rate"
- Newsletter automation live (Sanity webhook → Resend broadcast)
- SEO: canonical URLs, structured data (Organization, BlogPosting)
- Sitemap + robots.txt
- OpenGraph images per page (dynamic via `@vercel/og` or static)

---

### Phase 7 — Production & Launch
*Goal: Ship to real practices.*

- Deploy to Vercel (connect GitHub repo)
- Custom domain + SSL
- Environment variables in Vercel dashboard
- Sanity project created + schemas deployed
- Resend domain verified + email templates
- Postgres database provisioned (Neon or Supabase)
- Error monitoring (Sentry)
- Analytics (Posthog or Vercel Analytics)
- Beta invite flow — private signups, waitlist
- Public launch

---

### Iteration Loop
After each phase, the pattern is:
1. Build the feature
2. Type-check (`pnpm -r run typecheck`)
3. Review in browser
4. Commit with meaningful message
5. Push to main (or PR if working in a team)

Keep this file updated as decisions change. If a decision in the plan above conflicts with something in the codebase, the codebase wins — update the plan, not the code.
