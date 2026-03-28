'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  DatabaseIcon, ActivityIcon, ZapIcon,
  ShieldCheckIcon, RefreshCwIcon, LockIcon,
  ArrowRightIcon, CheckIcon,
} from 'lucide-react'
import { Container } from '@/components/local/container'
import { Eyebrow, Heading, Subheading, GradientText } from '@/components/local/text'

const steps = [
  {
    number: '01',
    icon: DatabaseIcon,
    title: 'Connect your practice management system',
    description:
      'PracticeFront uses a read-only connection to your existing PMS — OpenDental, Dentrix, Eaglesoft, Curve Dental, and more. No data migration, no new software to install on every workstation, no disruption to your day.',
    details: [
      'Read-only — we cannot write to your database',
      'Your data never leaves your network',
      'No patient records are stored on our servers',
      'Takes under 10 minutes to set up',
    ],
  },
  {
    number: '02',
    icon: ActivityIcon,
    title: 'Your Three Pillars update daily',
    description:
      'Every day, PracticeFront calculates your Patients, Scheduling, and Collections scores from your practice data. No manual data entry. No spreadsheets.',
    details: [
      'Scores calculated fresh every 24 hours',
      'Green = on track, Red = needs attention',
      'Historical trends tracked automatically',
      'Alerts when a pillar drops below your target',
    ],
  },
  {
    number: '03',
    icon: ZapIcon,
    title: 'Act with confidence',
    description:
      'When something is off, PracticeFront shows you exactly which partner is responsible for that part of your business — and connects you to a vetted alternative if needed.',
    details: [
      'See which vendor touches which pillar',
      'Performance scores for every partner',
      'Vetted marketplace to replace underperforming vendors',
      'No more wondering if your billing company is doing their job',
    ],
  },
]

const dataPoints = [
  { label: 'Patient retention rate', pillar: 'Patients' },
  { label: 'New patient trend', pillar: 'Patients' },
  { label: 'Reactivation opportunity', pillar: 'Patients' },
  { label: 'Case acceptance rate', pillar: 'Patients' },
  { label: 'No-show rate & cost', pillar: 'Scheduling' },
  { label: 'Recare scheduled %', pillar: 'Scheduling' },
  { label: 'Unscheduled treatment value', pillar: 'Scheduling' },
  { label: 'Schedule utilization', pillar: 'Scheduling' },
  { label: 'Collection rate', pillar: 'Collections' },
  { label: 'Days in AR', pillar: 'Collections' },
  { label: 'Insurance denial rate', pillar: 'Collections' },
  { label: 'Production vs collection gap', pillar: 'Collections' },
]

const pillarColors: Record<string, string> = {
  Patients: 'bg-primary/10 text-primary',
  Scheduling: 'bg-warm/10 text-warm',
  Collections: 'bg-[hsl(270,60%,58%)]/10 text-[hsl(270,60%,58%)]',
}

const securityPoints = [
  {
    icon: LockIcon,
    title: 'Read-only access',
    description: 'PracticeFront can only read your data — never write, modify, or delete.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'HIPAA-conscious design',
    description: 'Aggregate metrics are calculated locally. Patient PII is never sent to our servers.',
  },
  {
    icon: RefreshCwIcon,
    title: 'You control the connection',
    description: 'Disconnect at any time in 60 seconds. Your data stays yours, always.',
  },
]

const faqs = [
  {
    q: 'Which practice management systems does PracticeFront support?',
    a: 'PracticeFront connects to OpenDental, Dentrix, Eaglesoft, Curve Dental, and other leading PMS platforms. If you don\'t see yours listed, contact us — we may already support it or have it on the roadmap.',
  },
  {
    q: 'Who can see my practice data?',
    a: 'Only you. PracticeFront does not sell or share your practice metrics with anyone, including partner vendors. Partners only see their own performance scores.',
  },
  {
    q: 'How is PracticeFront free for practices?',
    a: 'Partners (billing companies, marketing agencies, etc.) pay $20–25/month to be visible in the accountability layer. That\'s the entire business model — openly, not quietly.',
  },
  {
    q: 'Can I use this if I don\'t have any partners set up?',
    a: 'Yes. The Three Pillars monitoring works independently of the partner layer. You can get your health scan on day one and add partner accountability later.',
  },
  {
    q: 'What if I have multiple practice locations?',
    a: 'Multi-location support is on the roadmap. For now, each location is managed as a separate practice. Reach out if you need a custom setup.',
  },
]

// ─── Data pipeline visualization ──────────────────────────────────────────────

function PipelineDiagram() {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mx-auto mt-10 max-w-lg"
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
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="hiw-hub-g" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="hsl(234 70% 78%)" />
            <stop offset="100%" stopColor="hsl(234 75% 52%)" />
          </radialGradient>
        </defs>
        {/* Route lines */}
        <path d="M 42 40 L 229 40" fill="none" stroke="hsl(234 75% 55%)" strokeWidth="0.8" strokeDasharray="4 6" strokeOpacity="0.30" strokeLinecap="round" />
        <path d="M 251 40 C 330 40 375 14 436 14" fill="none" stroke="hsl(234 75% 55%)" strokeWidth="0.8" strokeDasharray="4 6" strokeOpacity="0.30" strokeLinecap="round" />
        <path d="M 251 40 L 436 40" fill="none" stroke="hsl(28 75% 48%)" strokeWidth="0.8" strokeDasharray="4 6" strokeOpacity="0.30" strokeLinecap="round" />
        <path d="M 251 40 C 330 40 375 66 436 66" fill="none" stroke="hsl(270 60% 58%)" strokeWidth="0.8" strokeDasharray="4 6" strokeOpacity="0.30" strokeLinecap="round" />
        {/* Traveling packets */}
        {!prefersReduced && (
          <>
            <circle r="2.4" fill="hsl(234 75% 55%)" fillOpacity="0.90">
              <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.0s"><mpath href="#hiw-pp0" /></animateMotion>
            </circle>
            <circle r="2.4" fill="hsl(234 75% 55%)" fillOpacity="0.90">
              <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.3s"><mpath href="#hiw-pp1" /></animateMotion>
            </circle>
            <circle r="2.4" fill="hsl(28 75% 48%)" fillOpacity="0.90">
              <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.6s"><mpath href="#hiw-pp2" /></animateMotion>
            </circle>
            <circle r="2.4" fill="hsl(270 60% 58%)" fillOpacity="0.90">
              <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.9s"><mpath href="#hiw-pp3" /></animateMotion>
            </circle>
          </>
        )}
        {/* PMS source node */}
        <circle cx={42} cy={40} r={9} fill="hsl(234 75% 55%)" fillOpacity="0.10" stroke="hsl(234 75% 55%)" strokeWidth="0.8" strokeOpacity="0.38" />
        <text x={42} y={43.5} fontSize="5" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fill="hsl(234 75% 55%)" fillOpacity="0.72">PMS</text>
        {/* Hub */}
        <circle cx={240} cy={40} r={17} fill="none" stroke="hsl(234 75% 55%)" strokeWidth="0.5" strokeOpacity="0.12" />
        <circle cx={240} cy={40} r={11} fill="url(#hiw-hub-g)" fillOpacity="0.82" filter="url(#hiw-glow)" />
        <text x={240} y={43.5} fontSize="3.8" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fill="white" fillOpacity="0.88">PF Hub</text>
        {/* Output pillar nodes + labels */}
        <circle cx={444} cy={14} r={7} fill="hsl(234 75% 55%)" fillOpacity="0.12" stroke="hsl(234 75% 55%)" strokeWidth="0.8" strokeOpacity="0.45" />
        <text x={456} y={17.5} fontSize="5" fontFamily="monospace" fill="hsl(234 75% 55%)" fillOpacity="0.72">Patients</text>
        <circle cx={444} cy={40} r={7} fill="hsl(28 75% 48%)" fillOpacity="0.12" stroke="hsl(28 75% 48%)" strokeWidth="0.8" strokeOpacity="0.45" />
        <text x={456} y={43.5} fontSize="5" fontFamily="monospace" fill="hsl(28 75% 48%)" fillOpacity="0.72">Scheduling</text>
        <circle cx={444} cy={66} r={7} fill="hsl(270 60% 58%)" fillOpacity="0.12" stroke="hsl(270 60% 58%)" strokeWidth="0.8" strokeOpacity="0.45" />
        <text x={456} y={69.5} fontSize="5" fontFamily="monospace" fill="hsl(270 60% 58%)" fillOpacity="0.72">Collections</text>
      </svg>
    </motion.div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background pb-20 pt-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% -10%, hsl(234 75% 55% / 0.08), transparent)',
          }}
        />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>How PracticeFront works</Eyebrow>
            <Heading as="h1" size="2xl" className="mt-4">
              Simple enough to set up{' '}
              <GradientText>before lunch.</GradientText>
            </Heading>
            <Subheading size="lg" className="mt-6">
              Three steps. Under 10 minutes to your first health scan. No tech team required.
            </Subheading>
            <PipelineDiagram />
          </div>
        </Container>
      </section>

      {/* Steps */}
      <section className="py-20 bg-background">
        <Container>
          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.1 }}
                  className="grid gap-8 rounded-3xl border border-border bg-card p-8 lg:grid-cols-2 lg:gap-12 lg:p-12"
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-5xl font-bold text-muted/30 tabular-nums leading-none">
                        {step.number}
                      </span>
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-6" />
                      </div>
                    </div>
                    <h2 className="mt-5 font-display text-2xl tracking-tight text-foreground">
                      {step.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <ul className="space-y-3">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3">
                          <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/10">
                            <CheckIcon className="size-3 text-success" />
                          </div>
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* What we measure */}
      <section className="py-20 bg-secondary/30">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>What we measure</Eyebrow>
            <Heading as="h2" size="xl" className="mt-4">
              Every metric that matters to a healthy practice.
            </Heading>
            <Subheading className="mt-4">
              Pulled directly from your practice management system. No manual input.
            </Subheading>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {dataPoints.map(({ label, pillar }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-heading text-sm font-medium ${pillarColors[pillar]}`}
              >
                {label}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Security */}
      <section className="py-20 bg-background">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Security & privacy</Eyebrow>
            <Heading as="h2" size="xl" className="mt-4">
              Your data stays yours.
            </Heading>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {securityPoints.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary/30">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Eyebrow className="text-center block">FAQ</Eyebrow>
            <Heading as="h2" size="xl" className="mt-4 text-center">
              Common questions.
            </Heading>
            <div className="mt-12 divide-y divide-border">
              {faqs.map(({ q, a }) => (
                <details
                  key={q}
                  className="group py-6 [&>summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4">
                    <span className="font-heading text-base font-semibold text-foreground">{q}</span>
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground group-open:rotate-45 transition-transform">
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

      {/* CTA */}
      <section className="py-20 bg-surface-inverse">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <Heading as="h2" size="xl" className="text-white">
              Ready to see your practice health?
            </Heading>
            <p className="mt-4 text-white/60">
              Takes 10 minutes. No credit card. Free for practices, always.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/console/register"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-heading font-semibold text-white shadow-lg hover:bg-primary/90 transition-all"
              >
                Get Started Free
                <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-white/20 px-8 py-4 font-heading font-semibold text-white/80 hover:border-white/40 hover:text-white transition-all"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
