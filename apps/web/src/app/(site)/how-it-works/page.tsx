'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon } from 'lucide-react'
import { Container } from '@/components/local/container'
import { Eyebrow } from '@/components/local/text'

// ─── Pipeline data flow SVG ────────────────────────────────────────────────────

function PipelineDiagram() {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 560 80" className="w-full overflow-visible" aria-hidden="true">
        <defs>
          <path id="hiw-pp0" d="M 42 40 L 229 40" fill="none" />
          <path id="hiw-pp1" d="M 251 40 C 330 40 375 14 436 14" fill="none" />
          <path id="hiw-pp2" d="M 251 40 L 436 40" fill="none" />
          <path id="hiw-pp3" d="M 251 40 C 330 40 375 66 436 66" fill="none" />
          <filter id="hiw-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="hiw-hub-g" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="hsl(234 70% 78%)" />
            <stop offset="100%" stopColor="hsl(234 75% 52%)" />
          </radialGradient>
        </defs>
        <path d="M 42 40 L 229 40" fill="none" stroke="hsl(234 75% 55%)" strokeWidth="0.8" strokeDasharray="4 6" strokeOpacity="0.40" strokeLinecap="round" />
        <path d="M 251 40 C 330 40 375 14 436 14" fill="none" stroke="hsl(234 75% 55%)" strokeWidth="0.8" strokeDasharray="4 6" strokeOpacity="0.40" strokeLinecap="round" />
        <path d="M 251 40 L 436 40" fill="none" stroke="hsl(28 75% 48%)" strokeWidth="0.8" strokeDasharray="4 6" strokeOpacity="0.40" strokeLinecap="round" />
        <path d="M 251 40 C 330 40 375 66 436 66" fill="none" stroke="hsl(270 60% 58%)" strokeWidth="0.8" strokeDasharray="4 6" strokeOpacity="0.40" strokeLinecap="round" />
        {!prefersReduced && (
          <>
            <circle r="2.4" fill="hsl(234 75% 55%)" fillOpacity="0.90">
              <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.0s">
                <mpath href="#hiw-pp0" />
              </animateMotion>
            </circle>
            <circle r="2.4" fill="hsl(234 75% 55%)" fillOpacity="0.90">
              <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.3s">
                <mpath href="#hiw-pp1" />
              </animateMotion>
            </circle>
            <circle r="2.4" fill="hsl(28 75% 48%)" fillOpacity="0.90">
              <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.6s">
                <mpath href="#hiw-pp2" />
              </animateMotion>
            </circle>
            <circle r="2.4" fill="hsl(270 60% 58%)" fillOpacity="0.90">
              <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.9s">
                <mpath href="#hiw-pp3" />
              </animateMotion>
            </circle>
          </>
        )}
        <circle cx={42} cy={40} r={9} fill="hsl(234 75% 55%)" fillOpacity="0.14" stroke="hsl(234 75% 55%)" strokeWidth="0.8" strokeOpacity="0.45" />
        <text x={42} y={43.5} fontSize="5" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fill="hsl(234 75% 55%)" fillOpacity="0.80">PMS</text>
        <circle cx={240} cy={40} r={17} fill="none" stroke="hsl(234 75% 55%)" strokeWidth="0.5" strokeOpacity="0.18" />
        <circle cx={240} cy={40} r={11} fill="url(#hiw-hub-g)" fillOpacity="0.88" filter="url(#hiw-glow)" />
        <text x={240} y={43.5} fontSize="3.8" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fill="white" fillOpacity="0.88">PF Hub</text>
        <circle cx={444} cy={14} r={7} fill="hsl(234 75% 55%)" fillOpacity="0.14" stroke="hsl(234 75% 55%)" strokeWidth="0.8" strokeOpacity="0.50" />
        <text x={456} y={17.5} fontSize="5" fontFamily="monospace" fill="hsl(234 75% 55%)" fillOpacity="0.80">Patients</text>
        <circle cx={444} cy={40} r={7} fill="hsl(28 75% 48%)" fillOpacity="0.14" stroke="hsl(28 75% 48%)" strokeWidth="0.8" strokeOpacity="0.50" />
        <text x={456} y={43.5} fontSize="5" fontFamily="monospace" fill="hsl(28 75% 48%)" fillOpacity="0.80">Scheduling</text>
        <circle cx={444} cy={66} r={7} fill="hsl(270 60% 58%)" fillOpacity="0.14" stroke="hsl(270 60% 58%)" strokeWidth="0.8" strokeOpacity="0.50" />
        <text x={456} y={69.5} fontSize="5" fontFamily="monospace" fill="hsl(270 60% 58%)" fillOpacity="0.80">Collections</text>
      </svg>
    </motion.div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const pillars = [
  {
    id: 'patients',
    stat: '17%',
    statNote: 'average annual patient loss',
    accent: 'text-primary',
    question: 'Are you keeping and growing your patient base?',
    insight:
      'The average practice loses 17% of its patient base every year. Top performers lose under 3%. And 43% of new patients never return for a second visit — a fact most practices discover too late, long after the schedule has already shrunk and open chairs are the new normal.',
    callout: 'Know before your retention rate becomes a recruiting problem.',
    metrics: [
      'Retention rate & monthly trend',
      'New patient volume',
      'Case acceptance rate',
      'Reactivation opportunity value',
    ],
  },
  {
    id: 'scheduling',
    stat: '$743K',
    statNote: 'average unscheduled treatment in charts',
    accent: 'text-warm',
    question: 'Is your schedule working as hard as it should?',
    insight:
      '$500K to $1M in unscheduled treatment sits in the average practice\u2019s charts right now. No-shows cost roughly $200 per appointment \u2014 around $70,000 per year. SMS reminders alone reduce no-shows by 38%. These numbers are in your data. Most practices never look.',
    callout: '$743K in unscheduled treatment is the industry average. How much is sitting in your charts?',
    metrics: [
      'No-show rate & dollar cost',
      'Recare scheduled %',
      'Unscheduled treatment value',
      'Hygiene chair utilization',
    ],
  },
  {
    id: 'collections',
    stat: '80%',
    statNote: 'of practices struggle with billing',
    accent: 'text-[hsl(270,60%,58%)]',
    question: 'Are you actually collecting what you produce?',
    insight:
      '80% of dental practices report challenges with billing and insurance denials. The difference between 94% and 98% collection rate is worth tens of thousands of dollars per year. Without daily visibility, billing problems compound silently \u2014 often for months before anyone notices.',
    callout: 'The difference between 94% and 98% collection rate is worth tens of thousands per year.',
    metrics: [
      'Collection rate vs production',
      'Days in accounts receivable',
      'Insurance denial rate',
      'Production-to-collection gap',
    ],
  },
]

const steps = [
  {
    number: '01',
    title: 'Connect OpenDental',
    description:
      'PracticeFront uses a read-only connection to your OpenDental database. Nothing to install on every workstation. No data migration. No disruption to your workflow. Takes under 10 minutes.',
    note: 'Dentrix and Eaglesoft integrations planned for later 2026.',
  },
  {
    number: '02',
    title: 'Your Three Pillars update every 24 hours',
    description:
      'Each night, PracticeFront recalculates your Patients, Scheduling, and Collections scores from your live practice data. No manual input. No spreadsheets. Green means healthy. Red means act.',
    note: 'Weekly health summary delivered every Monday morning.',
  },
  {
    number: '03',
    title: 'Act with a specific number',
    description:
      'When a pillar turns red, you see the exact metric driving it \u2014 not a vague warning, but the actual number and what moved it. Pro plan adds partner accountability: see which vendor is responsible and connect to a vetted alternative.',
    note: 'Partner accountability is a Pro plan feature ($49\u2009/\u2009location\u2009/\u2009month).',
  },
]

const securityBadges = [
  'AES-256 encryption at rest',
  'TLS 1.3 in transit',
  'HIPAA-conscious design',
  'Read-only access only',
]

const faqs = [
  {
    q: 'Which practice management systems does PracticeFront support?',
    a: 'OpenDental at launch. Dentrix and Eaglesoft integrations are planned for later in 2026. If you\u2019re on a different system, reach out \u2014 we\u2019d like to hear from you.',
  },
  {
    q: 'Who can see my practice data?',
    a: 'Only you. PracticeFront does not sell or share your practice metrics with anyone, including partner vendors. Partners only see their own performance scores \u2014 never your underlying data.',
  },
  {
    q: 'How is PracticeFront free for practices?',
    a: 'The Starter plan \u2014 full Three Pillars dashboard, daily sync, historical trends, weekly email \u2014 is free. Revenue comes from practices that upgrade to Pro ($49\u2009/\u2009location\u2009/\u2009month) for partner accountability, benchmark comparisons, and custom alerts.',
  },
  {
    q: 'Can I use this without setting up any partners?',
    a: 'Yes. The Three Pillars monitoring works independently of the partner layer. You get your full health scan on day one. Partner accountability can be added later when you\u2019re ready.',
  },
  {
    q: 'What if I have multiple practice locations?',
    a: 'Multi-location support is on the roadmap. For now, each location is managed separately. Enterprise and DSO pricing is available \u2014 reach out to discuss.',
  },
]

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  const prefersReduced = useReducedMotion()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-surface-inverse py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 30% 50%, hsl(234 75% 55% / 0.12), transparent 70%)',
          }}
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left: headline */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Eyebrow className="text-primary/70">How PracticeFront works</Eyebrow>
              <h1 className="mt-5 font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-[3.25rem] leading-[1.08]">
                You&apos;re between patients. You don&apos;t have time to read another 40-page report.
              </h1>
              <p className="mt-6 text-lg leading-[1.75] text-white/60">
                PracticeFront gives you a 10-second health scan across Patients, Scheduling, and Collections
                \u2014 and tells you exactly what to do when something\u2019s red. No dashboards to study.
                No spreadsheets to maintain.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/console/register"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-heading text-sm font-semibold text-white shadow-lg hover:bg-primary/90 transition-all"
                >
                  Get Started Free
                  <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-heading text-sm font-semibold text-white/80 hover:border-white/40 hover:text-white transition-all"
                >
                  See Pricing
                </Link>
              </div>
            </motion.div>

            {/* Right: pipeline diagram */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:pl-8"
            >
              <PipelineDiagram />
              <div className="mt-8 grid grid-cols-3 gap-4">
                {(['Patients', 'Scheduling', 'Collections'] as const).map((pillar, i) => {
                  const colors = [
                    'bg-primary/10 text-primary border-primary/20',
                    'bg-warm/10 text-warm border-warm/20',
                    'bg-[hsl(270,60%,58%)]/10 text-[hsl(270,60%,58%)] border-[hsl(270,60%,58%)]/20',
                  ]
                  return (
                    <div
                      key={pillar}
                      className={`rounded-xl border px-3 py-2 text-center font-heading text-xs font-semibold ${colors[i]}`}
                    >
                      {pillar}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Three Pillars deep dive ── */}
      <section className="py-24 lg:py-32 bg-background">
        <Container>
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-2xl"
          >
            <Eyebrow>Three pillars of practice health</Eyebrow>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl leading-[1.1]">
              Every metric that matters. Nothing that doesn&apos;t.
            </h2>
            <p className="mt-5 text-lg leading-[1.7] text-muted-foreground">
              Most practice software gives you more data. PracticeFront gives you three clear signals.
              Here is what we track in each pillar \u2014 and why it matters.
            </p>
          </motion.div>

          <div className="mt-16">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.05 }}
                className="grid gap-10 border-t border-border py-16 lg:grid-cols-[1fr,340px] lg:gap-20 lg:items-start"
              >
                {/* Left: stat + question + insight */}
                <div>
                  <div className="flex items-baseline gap-4">
                    <span className={`font-mono text-[3.5rem] font-bold tabular-nums leading-none ${pillar.accent}`}>
                      {pillar.stat}
                    </span>
                    <span className="text-sm text-muted-foreground">{pillar.statNote}</span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl tracking-tight text-foreground">
                    {pillar.question}
                  </h3>
                  <p className="mt-4 leading-[1.75] text-muted-foreground">
                    {pillar.insight}
                  </p>
                  <div className="mt-6 rounded-xl bg-muted/50 px-5 py-4">
                    <p className="font-display italic text-base text-foreground/60">
                      &ldquo;{pillar.callout}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Right: what PracticeFront shows */}
                <div className="lg:pt-16">
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    What you see in PracticeFront
                  </p>
                  <ul className="mt-4 space-y-3">
                    {pillar.metrics.map((metric) => (
                      <li key={metric} className="flex items-center gap-3">
                        <span className={`size-1.5 rounded-full shrink-0 ${pillar.accent.replace('text-', 'bg-').replace('[hsl(270,60%,58%)]', '[hsl(270,60%,58%)]')}`} aria-hidden="true" />
                        <span className="text-sm text-muted-foreground">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </Container>
      </section>

      {/* ── Partner accountability ── */}
      <section className="py-24 lg:py-32 bg-secondary/30">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-24">
            {/* Left: copy */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="flex items-center gap-3">
                <Eyebrow>Partner accountability</Eyebrow>
                <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 font-heading text-[10px] font-bold uppercase tracking-wider text-primary">
                  Pro
                </span>
              </div>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                Know which vendor to call when a pillar turns red.
              </h2>
              <p className="mt-5 leading-[1.75] text-muted-foreground">
                Practices spend $2,000 to $10,000 per month on billing companies, marketing agencies,
                and recall software \u2014 with no way to know if any of it is working.
              </p>
              <p className="mt-4 leading-[1.75] text-muted-foreground">
                PracticeFront Pro connects each pillar to the vendors responsible for it. When Collections
                turns red, you see your billing company\u2019s performance score. When Patients drops, you
                see your marketing agency\u2019s numbers. And when you need a change, we connect you to
                vetted alternatives from our partner marketplace.
              </p>
              <div className="mt-8 border-t border-border pt-6">
                <p className="font-display italic text-base text-foreground/60">
                  &ldquo;Data without action is just anxiety.&rdquo;
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/partners"
                  className="group inline-flex items-center gap-2 font-heading text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  Learn about partner accountability
                  <ArrowRightIcon className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>

            {/* Right: example scorecard */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.15 }}
              className="space-y-4"
            >
              {[
                { type: 'Billing Company', pillar: 'Collections', score: 43, label: 'Act Now', color: 'text-destructive', bar: 'bg-destructive', badge: 'bg-destructive/10 text-destructive border-destructive/20', metric: '71% recare collected', note: '\u2191 AR aging this month' },
                { type: 'Marketing Agency', pillar: 'Patients', score: 61, label: 'Review Needed', color: 'text-warm', bar: 'bg-warm', badge: 'bg-warm/10 text-warm border-warm/20', metric: '8 new patients / mo', note: 'Below target of 15' },
                { type: 'Recall Software', pillar: 'Scheduling', score: 94, label: 'Performing', color: 'text-success', bar: 'bg-success', badge: 'bg-success/10 text-success border-success/20', metric: '94% recare scheduled', note: 'Above benchmark' },
              ].map((partner, i) => (
                <motion.div
                  key={partner.type}
                  initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-heading text-sm font-semibold text-foreground">{partner.type}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Touches: <span className="font-medium text-foreground">{partner.pillar}</span>
                      </p>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 font-heading text-xs font-semibold ${partner.badge}`}>
                      {partner.label}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">Performance</span>
                      <span className={`font-mono text-sm font-bold ${partner.color}`}>{partner.score}/100</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${partner.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${partner.bar}`}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-sm text-foreground">{partner.metric}</span>
                    <span className="text-xs text-muted-foreground">{partner.note}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Setup steps ── */}
      <section className="py-24 lg:py-32 bg-background">
        <Container>
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-xl"
          >
            <Eyebrow>Getting started</Eyebrow>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              Three steps. Under 10 minutes.
            </h2>
          </motion.div>

          <div className="mt-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.08 }}
                className="grid gap-6 border-t border-border py-10 lg:grid-cols-[80px,1fr,240px] lg:gap-12 lg:items-start"
              >
                <span className="font-mono text-4xl font-bold tabular-nums text-muted/30 leading-none">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-xl tracking-tight text-foreground">{step.title}</h3>
                  <p className="mt-3 leading-[1.75] text-muted-foreground">{step.description}</p>
                </div>
                <p className="font-heading text-xs text-muted-foreground lg:pt-1">{step.note}</p>
              </motion.div>
            ))}
            <div className="border-t border-border pt-10">
              <Link
                href="/console/register"
                className="group inline-flex items-center gap-2 font-heading text-sm font-semibold text-primary hover:gap-3 transition-all"
              >
                Ready to set up? Get Started Free
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Security ── */}
      <section className="py-24 lg:py-32 bg-secondary/30">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-24">
            {/* Left: prose */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <Eyebrow>Security &amp; privacy</Eyebrow>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                Your data stays yours.
              </h2>
              <p className="mt-5 leading-[1.75] text-muted-foreground">
                PracticeFront uses a read-only connection to your practice management system. We can
                never write to, modify, or delete your data. Aggregate health metrics are calculated
                locally \u2014 no patient personally identifiable information is ever sent to our servers.
              </p>
              <p className="mt-4 leading-[1.75] text-muted-foreground">
                You control the connection. Disconnect at any time in under a minute. Your data remains
                in your practice management system, exactly where it has always been.
              </p>
              <div className="mt-8">
                <Link
                  href="/hipaa"
                  className="group inline-flex items-center gap-2 font-heading text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  View HIPAA compliance details
                  <ArrowRightIcon className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>

            {/* Right: spec badges 2x2 */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              {securityBadges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-5 shadow-sm"
                >
                  <CheckIcon className="size-4 shrink-0 text-success" aria-hidden="true" />
                  <span className="font-heading text-sm font-medium text-foreground">{badge}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-background">
        <Container>
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                Common questions.
              </h2>
            </motion.div>
            <div className="mt-12 divide-y divide-border">
              {faqs.map(({ q, a }) => (
                <details
                  key={q}
                  className="group py-6 [&>summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4">
                    <span className="font-heading text-base font-semibold text-foreground">{q}</span>
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground group-open:rotate-45 transition-transform duration-200">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-surface-inverse">
        <Container>
          <div className="max-w-xl">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                Ready to see your practice health?
              </h2>
              <p className="mt-4 text-white/60">
                Takes 10 minutes. No credit card. The Starter plan is free, always.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/console/register"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-heading font-semibold text-white shadow-lg hover:bg-primary/90 transition-all"
                >
                  Get Started Free
                  <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center rounded-xl border border-white/20 px-8 py-4 font-heading font-semibold text-white/80 hover:border-white/40 hover:text-white transition-all"
                >
                  See Pricing
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
