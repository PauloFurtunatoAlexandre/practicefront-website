'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheckIcon, AlertCircleIcon, ArrowRightIcon, CheckCircle2Icon } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/local/container'
import { Eyebrow, Heading, Subheading, GradientText } from '@/components/local/text'

const partners = [
  {
    type: 'Billing Company',
    pillar: 'Collections',
    score: 94,
    status: 'healthy',
    metric: '96.4% collection rate',
    note: 'Above industry average',
  },
  {
    type: 'Marketing Agency',
    pillar: 'Patients',
    score: 61,
    status: 'warning',
    metric: '8 new patients/mo',
    note: 'Below your target of 15',
  },
  {
    type: 'Recall Software',
    pillar: 'Scheduling',
    score: 43,
    status: 'critical',
    metric: '71% recare scheduled',
    note: 'Needs attention this week',
  },
]

const statusConfig = {
  healthy: { bar: 'bg-success', text: 'text-success', badge: 'bg-success/10 text-success border-success/20', label: 'Performing' },
  warning: { bar: 'bg-warm', text: 'text-warm', badge: 'bg-warm/10 text-warm border-warm/20', label: 'Review Needed' },
  critical: { bar: 'bg-destructive', text: 'text-destructive', badge: 'bg-destructive/10 text-destructive border-destructive/20', label: 'Act Now' },
}

const benefits = [
  'See which partner touches which part of your business',
  'Connect outcomes to what you\'re already paying for',
  'Replace guesswork with accountability',
  'Good vendors should welcome this visibility',
]

export function PartnerAccountabilitySection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-background">
      {/* Background accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 70% 50%, hsl(234 75% 55% / 0.06), transparent)',
        }}
      />

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <Eyebrow>Partner accountability</Eyebrow>
              <Heading as="h2" size="2xl" className="mt-4">
                Know if your vendors are{' '}
                <GradientText>earning their fees.</GradientText>
              </Heading>
              <Subheading size="lg" className="mt-6">
                When a pillar turns red, PracticeFront doesn&apos;t just tell you what&apos;s
                wrong — it shows you which partner is responsible and connects you to a vetted
                alternative if you need one.
              </Subheading>
              <p className="mt-4 font-semibold text-foreground">
                Your billing company either improves their numbers or loses the account.
                That&apos;s how it should work.
              </p>
            </motion.div>

            <motion.ul
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.2 }}
              className="mt-8 space-y-3"
            >
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2Icon className="mt-0.5 size-5 shrink-0 text-success" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </motion.ul>

            <motion.blockquote
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.3 }}
              className="mt-10 rounded-xl border-l-4 border-primary bg-primary/5 py-4 pl-6 pr-4"
            >
              <p className="font-display italic text-lg text-foreground/80">
                &ldquo;Data without action is just anxiety.&rdquo;
              </p>
            </motion.blockquote>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Link
                href="/partners"
                className="group inline-flex items-center gap-2 font-heading text-sm font-semibold text-primary hover:gap-3 transition-all"
              >
                Learn about partner accountability
                <ArrowRightIcon className="size-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right: partner score cards */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-4"
          >
            {partners.map((partner, i) => {
              const cfg = statusConfig[partner.status as keyof typeof statusConfig]
              return (
                <motion.div
                  key={partner.type}
                  initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-heading text-sm font-semibold text-foreground">
                        {partner.type}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Touches: <span className="font-medium text-foreground">{partner.pillar}</span>
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-heading text-xs font-semibold ${cfg.badge}`}
                    >
                      {partner.status === 'healthy' ? (
                        <ShieldCheckIcon className="size-3" />
                      ) : (
                        <AlertCircleIcon className="size-3" />
                      )}
                      {cfg.label}
                    </span>
                  </div>

                  {/* Score bar */}
                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">Performance</span>
                      <span className={`font-mono text-sm font-bold ${cfg.text}`}>
                        {partner.score}/100
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${partner.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${cfg.bar}`}
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-sm text-foreground">{partner.metric}</span>
                    <span className="text-xs text-muted-foreground">{partner.note}</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
