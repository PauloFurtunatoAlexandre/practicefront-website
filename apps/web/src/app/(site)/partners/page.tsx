'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
import { Container } from '@/components/local/container'
import { Eyebrow } from '@/components/local/text'

// ─── Data ─────────────────────────────────────────────────────────────────────

const whatPartnersGet = [
  {
    id: 'scorecard',
    title: 'A verified performance scorecard',
    description:
      'Your results \u2014 collection rates, new patient volume, recare scheduled \u2014 are scored against real practice data. Not self-reported. Not a case study. Verified against live outcomes.',
  },
  {
    id: 'visibility',
    title: 'Visibility when practices need you most',
    description:
      'When a practice sees a red pillar in their dashboard, they\u2019re actively looking for a better solution. Your listing surfaces at the exact moment they\u2019re motivated to make a change.',
  },
  {
    id: 'differentiation',
    title: 'Differentiation that sells itself',
    description:
      'Most dental service vendors promise outcomes. You can prove them. A data-backed scorecard in a market full of self-reported testimonials is a significant competitive advantage.',
  },
  {
    id: 'relationships',
    title: 'Qualified practice relationships',
    description:
      'Practices that connect through PracticeFront already understand their numbers. These are not cold leads. They are practice owners who know what they need and are looking for who can deliver it.',
  },
]

const howItWorks = [
  {
    number: '01',
    title: 'Apply to partner',
    description:
      'Send us a brief email about your service, who you serve, and what outcomes you deliver. We review all applications within 2 business days.',
  },
  {
    number: '02',
    title: 'Connect your client practices',
    description:
      'We build a lightweight data bridge between your service and PracticeFront. The metrics we track for each pillar are mapped to your category \u2014 billing to Collections, marketing to Patients, recall to Scheduling.',
  },
  {
    number: '03',
    title: 'Get a verified performance score',
    description:
      'Your score is calculated from real practice outcomes, updated regularly. No self-reporting. No testimonials. Just your actual numbers \u2014 which you\u2019re welcome to use in your own marketing.',
  },
  {
    number: '04',
    title: 'Receive qualified leads',
    description:
      'When a practice sees a red pillar in the category your service touches, PracticeFront surfaces your listing as a vetted alternative. The lead already knows they have a problem. You show up with proof you can solve it.',
  },
]

const categories = [
  'Billing & RCM Companies',
  'Marketing Agencies',
  'Recall & Scheduling Software',
  'Membership Plan Providers',
  'Practice Consultants',
  'Technology Vendors',
]

const faqs = [
  {
    q: 'What does it cost for partners to join?',
    a: 'Nothing. Partners join the marketplace free. There is no monthly fee, no per-lead charge, and no revenue share. We built the partner marketplace to serve practices \u2014 making it free to join means more quality vendors participate, which makes the marketplace more valuable for everyone.',
  },
  {
    q: 'How are performance scores calculated?',
    a: 'Scores are calculated from real outcomes in the practices you serve, mapped to the pillar your service touches. For a billing company, that means collection rate, days in AR, and denial rate. For a marketing agency, it\u2019s new patient volume and retention trends. Scores update regularly as practice data syncs.',
  },
  {
    q: 'What if my performance score is low?',
    a: 'We\u2019ll tell you before it\u2019s visible to anyone. Partners see their scores first and can work with us to understand what\u2019s driving them. We\u2019d rather help you improve than reject you. Good vendors welcome accountability \u2014 if your numbers need work, we\u2019ll be transparent about what they show.',
  },
  {
    q: 'Which practice management systems does PracticeFront support?',
    a: 'OpenDental at launch. Dentrix and Eaglesoft integrations are planned for later in 2026. This means you can participate if your clients are on OpenDental today, and the network will expand.',
  },
  {
    q: 'Is there a review process? Not every vendor qualifies?',
    a: 'Yes. We review all applications and only accept partners whose service can be meaningfully measured against practice outcomes. If your service doesn\u2019t touch a tracked pillar, we\u2019ll tell you honestly \u2014 and let you know when that changes.',
  },
]

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PartnersPage() {
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
              'radial-gradient(ellipse 70% 60% at 20% 50%, hsl(234 75% 55% / 0.14), transparent 65%)',
          }}
        />
        <Container className="relative">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl"
          >
            <Eyebrow className="text-primary/70">For partners</Eyebrow>
            <h1 className="mt-5 font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-[3.5rem] leading-[1.06]">
              If your dental service actually works, PracticeFront will prove it.
            </h1>
            <p className="mt-6 text-xl leading-[1.7] text-white/60 max-w-2xl">
              Join the partner marketplace free. Get a verified performance scorecard built from real
              practice outcomes. Reach practices that need what you do \u2014 at the exact moment they\u2019re
              looking for a change.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="mailto:daniel@practicefront.com?subject=Partner%20Application"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-heading font-semibold text-white shadow-lg hover:bg-primary/90 transition-all"
              >
                Apply to Partner
                <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
              <Link
                href="/how-it-works"
                className="inline-flex items-center rounded-xl border border-white/20 px-8 py-4 font-heading font-semibold text-white/80 hover:border-white/40 hover:text-white transition-all"
              >
                How It Works
              </Link>
            </div>
            <p className="mt-8 font-heading text-sm text-white/35">
              Free to join. No monthly fee. No revenue share.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ── The accountability gap ── */}
      <section className="py-24 lg:py-32 bg-background">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-24">
            {/* Left: the problem */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <Eyebrow>The accountability gap</Eyebrow>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                Practices spend $2K\u2013$10K a month on services with zero tracking.
              </h2>
              <p className="mt-5 leading-[1.75] text-muted-foreground">
                The average dental practice has a billing company, a marketing agency, a recall
                solution, and a handful of other vendors \u2014 with no way to connect what they\u2019re
                paying to what\u2019s actually happening in their practice.
              </p>
              <p className="mt-4 leading-[1.75] text-muted-foreground">
                That creates two problems. Practices keep paying for services that underperform. And
                vendors who actually deliver good results look the same as vendors who don\u2019t.
              </p>
              <p className="mt-4 font-semibold text-foreground">
                PracticeFront fixes that. Your billing company either improves their numbers or loses
                the account. That is how it should work.
              </p>
              <div className="mt-8 border-t border-border pt-6">
                <p className="font-display italic text-base text-foreground/60">
                  &ldquo;Good vendors should welcome accountability. The ones who resist it are telling
                  you something.&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Right: what breaks without accountability */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.15 }}
            >
              {[
                {
                  label: 'Marketing Agency',
                  pillar: 'Patients',
                  problem: 'Sends a quarterly report. Practice doesn\u2019t know if the 8 new patients this month are from the agency\u2019s campaigns or from word-of-mouth.',
                  accent: 'text-primary',
                },
                {
                  label: 'Billing Company',
                  pillar: 'Collections',
                  problem: 'Collection rate dropped from 96% to 89% over six months. Nobody flagged it. The practice owner found out from their accountant at year-end.',
                  accent: 'text-destructive',
                },
                {
                  label: 'Recall Software',
                  pillar: 'Scheduling',
                  problem: 'Recare scheduled rate is 71% and declining. The software vendor says it\u2019s working. The hygiene chair disagrees.',
                  accent: 'text-warm',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="border-t border-border py-8"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-heading text-sm font-semibold text-foreground">{item.label}</span>
                    <span className={`font-heading text-xs ${item.accent}`}>{item.pillar}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.problem}</p>
                </motion.div>
              ))}
              <div className="border-t border-border" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── What partners get ── */}
      <section className="py-24 lg:py-32 bg-secondary/30">
        <Container>
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-xl"
          >
            <Eyebrow>What you get</Eyebrow>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              More than a listing. A case study that updates itself.
            </h2>
          </motion.div>

          <div className="mt-12">
            {whatPartnersGet.map((item, i) => (
              <motion.div
                key={item.id}
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.07 }}
                className="grid gap-4 border-t border-border py-8 lg:grid-cols-[240px,1fr] lg:gap-16 lg:items-start"
              >
                <h3 className="font-display text-lg tracking-tight text-foreground">{item.title}</h3>
                <p className="leading-[1.75] text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </Container>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 lg:py-32 bg-background">
        <Container>
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-xl"
          >
            <Eyebrow>The process</Eyebrow>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              From application to live scorecard.
            </h2>
          </motion.div>

          <div className="mt-12">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.number}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.07 }}
                className="grid gap-6 border-t border-border py-10 lg:grid-cols-[80px,1fr] lg:gap-12 lg:items-start"
              >
                <span className="font-mono text-4xl font-bold tabular-nums text-muted/30 leading-none">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-xl tracking-tight text-foreground">{step.title}</h3>
                  <p className="mt-3 leading-[1.75] text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </Container>
      </section>

      {/* ── Who joins ── */}
      <section className="py-24 bg-secondary/30">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-24">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <Eyebrow>Who qualifies</Eyebrow>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                If you serve dental practices and your results are measurable, you belong here.
              </h2>
              <p className="mt-5 leading-[1.75] text-muted-foreground">
                We only accept partners whose service can be connected to a tracked pillar. If your
                work touches patient growth, schedule efficiency, or collections \u2014 we can measure it.
                If it doesn\u2019t, we\u2019ll tell you honestly.
              </p>
            </motion.div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap gap-3 lg:pt-2"
            >
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-border bg-card px-4 py-2 font-heading text-sm font-medium text-foreground shadow-sm"
                >
                  {cat}
                </span>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Free to join ── */}
      <section className="py-20 bg-background">
        <Container>
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-2xl"
          >
            <div className="border-t border-border pt-16">
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-[4rem] font-bold tabular-nums leading-none text-primary">
                  $0
                </span>
                <span className="text-muted-foreground">to join the partner marketplace</span>
              </div>
              <p className="mt-5 text-lg leading-[1.75] text-muted-foreground">
                No monthly fee. No per-lead charge. No revenue share. Partners join free because a
                rich, competitive marketplace serves practices better than a walled garden. If you
                deliver results, PracticeFront will make that visible \u2014 and practices will find you.
              </p>
              <div className="mt-8">
                <a
                  href="mailto:daniel@practicefront.com?subject=Partner%20Application"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-heading font-semibold text-white shadow-lg hover:bg-primary/90 transition-all"
                >
                  Apply to Partner
                  <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-4 font-heading text-xs text-muted-foreground">
                We review all applications within 2 business days.
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-secondary/30">
        <Container>
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                Partner questions.
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
                If your service actually works, prove it.
              </h2>
              <p className="mt-4 text-white/60">
                Apply to join the PracticeFront partner marketplace. Free to join. We review all
                applications within 2 business days.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:daniel@practicefront.com?subject=Partner%20Application"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-heading font-semibold text-white shadow-lg hover:bg-primary/90 transition-all"
                >
                  Apply to Partner
                  <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
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
