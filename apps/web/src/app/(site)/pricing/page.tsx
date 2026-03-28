'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { CheckIcon, ArrowRightIcon } from 'lucide-react'
import { Container } from '@/components/local/container'
import { Eyebrow } from '@/components/local/text'

// ─── Data ─────────────────────────────────────────────────────────────────────

const tiers = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    period: '/month',
    tagline: 'The full practice health dashboard, free.',
    description:
      'Full Three Pillars monitoring for your practice. No credit card. No trial period. Just the dashboard.',
    cta: { label: 'Get Started Free', href: '/console/register' },
    features: [
      'Full Three Pillars dashboard (Patients, Scheduling, Collections)',
      'Daily health score updates',
      'Historical trends \u2014 unlimited',
      'Weekly health email every Monday',
      'OpenDental integration',
      '1 user per location',
    ],
    highlight: false,
    note: '',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$49',
    period: '/location/month',
    yearlyNote: '$470\u2009/\u2009year',
    tagline: 'Add accountability to every vendor you pay.',
    description:
      'Everything in Starter, plus partner accountability tracking, benchmark comparisons, and custom alerts.',
    cta: { label: 'Start Pro', href: '/console/register' },
    features: [
      'Everything in Starter',
      'Partner accountability tracking',
      'Benchmark comparisons \u2014 how you rank vs peers',
      'Custom alerts when pillars drop',
      'Data export',
      'Up to 3 users per location',
      'Priority support',
    ],
    highlight: true,
    note: '',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    tagline: 'For DSOs and multi-location groups.',
    description:
      'Multi-location dashboards, cross-location benchmarking, API access, and dedicated support.',
    cta: { label: 'Contact Us', href: 'mailto:daniel@practicefront.com?subject=Enterprise%20Inquiry' },
    features: [
      'Everything in Pro',
      'Multi-location health dashboard',
      'Cross-location benchmarking',
      'API access',
      'Dedicated support contact',
      'Custom reporting',
      'Flexible user seats',
    ],
    highlight: false,
    note: '',
  },
]

const faqs = [
  {
    q: 'What\u2019s included in the free Starter plan?',
    a: 'The full Three Pillars dashboard \u2014 Patients, Scheduling, and Collections \u2014 with daily score updates, historical trends, and weekly health emails every Monday. No credit card, no time limit. It\u2019s free because every connected practice strengthens the benchmark network.',
  },
  {
    q: 'What does Pro add?',
    a: 'Partner accountability tracking (see which vendor is responsible when a pillar turns red), benchmark comparisons against peer practices, custom alerts when a score drops below your target, data export, and up to 3 users per location.',
  },
  {
    q: 'Can I upgrade or downgrade anytime?',
    a: 'Yes. Upgrade to Pro whenever you\u2019re ready. Downgrade back to Starter at any time \u2014 your data and history are preserved. No long-term commitment required.',
  },
  {
    q: 'Is there a trial for Pro?',
    a: 'Yes. Pro includes a 14-day free trial \u2014 no credit card required. You\u2019ll have full access to partner accountability and benchmark features before you decide.',
  },
  {
    q: 'How does billing work for multiple locations?',
    a: 'Pro is priced per location \u2014 $49/location/month or $470/location/year. Enterprise pricing is available for DSOs and multi-location groups with custom needs. Contact us to discuss.',
  },
  {
    q: 'What does it cost for dental service partners to join?',
    a: 'Partners join the marketplace free. No monthly fee, no per-lead charge, no revenue share. The marketplace is free to participate in because a rich, competitive partner network serves practices better. See the partners page for details.',
  },
]

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const prefersReduced = useReducedMotion()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-background pb-16 pt-20">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, hsl(234 75% 55% / 0.07), transparent)',
          }}
        />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-4 font-display text-5xl tracking-tight text-foreground sm:text-[3.5rem] leading-[1.08]">
              Starter is free.{' '}
              <span className="text-primary">Pro adds accountability.</span>
            </h1>
            <p className="mt-6 text-lg leading-[1.75] text-muted-foreground">
              The full Three Pillars dashboard is free for every dental practice. Upgrade to Pro when
              you want benchmark comparisons and partner accountability.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Tiers ── */}
      <section className="pb-20 pt-8 bg-background">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={prefersReduced ? false : { opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`relative flex flex-col rounded-3xl border p-8 ${
                  tier.highlight
                    ? 'border-primary bg-card shadow-xl shadow-primary/10'
                    : 'border-border bg-card shadow-sm'
                }`}
              >
                {/* Pro top accent strip */}
                {tier.highlight && (
                  <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl bg-primary" />
                )}

                {/* Pro badge */}
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full border border-primary bg-background px-4 py-1 font-heading text-xs font-semibold text-primary shadow-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="font-heading text-xl font-bold text-foreground">{tier.name}</h2>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                      {tier.id === 'starter' ? 'Free' : tier.id === 'pro' ? 'Per location' : 'Custom'}
                    </span>
                  </div>

                  <div className="mt-5 flex items-end gap-1.5">
                    <span className="font-mono text-5xl font-bold tabular-nums text-foreground leading-none">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="mb-1 font-heading text-sm text-muted-foreground">
                        {tier.period}
                      </span>
                    )}
                  </div>
                  {'yearlyNote' in tier && tier.yearlyNote && (
                    <p className="mt-1 font-heading text-xs text-muted-foreground">
                      or {tier.yearlyNote} billed annually
                    </p>
                  )}

                  <p className="mt-1 font-heading text-sm font-semibold text-foreground">
                    {tier.tagline}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {tier.description}
                  </p>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-success/10">
                        <CheckIcon className="size-2.5 text-success" aria-hidden="true" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    href={tier.cta.href}
                    className={`group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-heading font-semibold transition-all ${
                      tier.highlight
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20'
                        : 'border border-border bg-background text-foreground hover:border-primary/40 hover:text-primary'
                    }`}
                  >
                    {tier.cta.label}
                    <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Partners callout */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 rounded-2xl border border-border bg-secondary/40 px-8 py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">
                Are you a dental service provider?
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Partners join the marketplace free. No monthly fee, no revenue share.
              </p>
            </div>
            <Link
              href="/partners"
              className="group inline-flex shrink-0 items-center gap-2 font-heading text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              Learn about partnering
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* ── Business model transparency ── */}
      <section className="py-16 bg-secondary/30">
        <Container>
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="border-t border-border pt-12"
            >
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                The business model, openly
              </p>
              <p className="mt-4 text-lg leading-[1.75] text-muted-foreground">
                The Starter plan is free because every connected practice strengthens the benchmark
                network and validates the partner marketplace. Revenue comes from practices that
                upgrade to Pro for accountability and benchmarks \u2014 and from Enterprise groups that
                need cross-location monitoring. That alignment is intentional: PracticeFront gets
                better as more practices connect, and practices only pay when they get Pro-level value.
              </p>
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
                Pricing questions.
              </h2>
            </motion.div>
            <div className="mt-12 divide-y divide-border">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group py-6 [&>summary::-webkit-details-marker]:hidden">
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
                Start with the free dashboard. Upgrade when it matters.
              </h2>
              <p className="mt-4 text-white/60">
                No credit card for Starter. No commitment for Pro trial. Setup in 10 minutes on OpenDental.
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
                  href="/how-it-works"
                  className="inline-flex items-center rounded-xl border border-white/20 px-8 py-4 font-heading font-semibold text-white/80 hover:border-white/40 hover:text-white transition-all"
                >
                  How It Works
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
