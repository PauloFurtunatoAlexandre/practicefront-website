'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckIcon, ArrowRightIcon } from 'lucide-react'
import { Container } from '@/components/local/container'
import { Eyebrow, Heading, Subheading, GradientText } from '@/components/local/text'

const tiers = [
  {
    name: 'Practice',
    price: '$0',
    period: '/month',
    tagline: 'Free for dental practices. Always.',
    description: 'Everything you need to monitor your practice health and hold partners accountable.',
    cta: { label: 'Get Started Free', href: '/console/register', primary: true },
    badge: 'Free forever',
    features: [
      'Three Pillars monitoring (Patients, Scheduling, Collections)',
      'Daily health score updates',
      'Partner performance tracking',
      'Vetted partner marketplace access',
      'Unlimited historical data',
      'Any PMS integration',
      'Email alerts when pillars need attention',
      'Practice health dashboard',
    ],
    highlight: true,
  },
  {
    name: 'Partner',
    price: '$20–25',
    period: '/practice/month',
    tagline: 'For service providers who want to be visible.',
    description: 'Be seen by the practices you serve. Your performance data surfaces in their health scan.',
    cta: { label: 'Apply to Partner', href: '/partners#apply', primary: false },
    badge: 'Per connected practice',
    features: [
      'Visible in practice health dashboard',
      'Performance score tracking',
      'Direct connection to motivated practices',
      'Vetted partner badge',
      'Replace underperforming competitors',
      'Flat pricing — no revenue share',
      'Monthly performance reports',
      'Partner support team',
    ],
    highlight: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    tagline: 'For DSOs and large partner organizations.',
    description: 'Multi-location practice groups, enterprise billing companies, and large partner networks.',
    cta: { label: 'Contact Us', href: '/contact', primary: false },
    badge: 'Custom pricing',
    features: [
      'Everything in Practice + Partner',
      'Multi-location support',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom reporting',
      'White-label options',
      'Priority support',
    ],
    highlight: false,
  },
]

const faqs = [
  {
    q: 'Is PracticeFront really free for practices?',
    a: 'Yes, completely free for dental practices. No credit card required. We make money when service providers pay to participate in the partner layer — that alignment is intentional and transparent.',
  },
  {
    q: 'How does partner pricing work exactly?',
    a: 'Partners pay $20–25/month per connected practice (price varies by partner category). If you\'re connected to 50 practices, you pay $1,000–1,250/month. Flat rate, no revenue share, cancel anytime.',
  },
  {
    q: 'What if a practice disconnects a partner?',
    a: 'Billing is prorated. You only pay for active connections.',
  },
  {
    q: 'Is there a free trial for partners?',
    a: 'We offer a 30-day free trial for new partners. Full access, no credit card upfront.',
  },
]

export default function PricingPage() {
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
            <Eyebrow>Pricing</Eyebrow>
            <Heading as="h1" size="2xl" className="mt-4">
              Free for practices.{' '}
              <GradientText>Always.</GradientText>
            </Heading>
            <Subheading size="lg" className="mt-6">
              PracticeFront is free for dental practices. Partners pay to participate.
              That alignment is the whole point.
            </Subheading>
          </div>
        </Container>
      </section>

      {/* Tiers */}
      <section className="py-12 bg-background">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-3xl border p-8 ${
                  tier.highlight
                    ? 'border-primary bg-primary shadow-xl shadow-primary/15'
                    : 'border-border bg-card shadow-sm'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary-foreground px-4 py-1 font-heading text-xs font-bold text-primary shadow-sm">
                      For Practices
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h2 className={`font-heading text-xl font-bold ${tier.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>
                      {tier.name}
                    </h2>
                    <span className={`rounded-full px-2.5 py-0.5 font-mono text-xs ${
                      tier.highlight
                        ? 'bg-white/20 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {tier.badge}
                    </span>
                  </div>

                  <div className={`mt-4 flex items-end gap-1 ${tier.highlight ? 'text-white' : 'text-foreground'}`}>
                    <span className="font-mono text-5xl font-bold tabular-nums">{tier.price}</span>
                    {tier.period && (
                      <span className={`mb-1 font-heading text-sm ${tier.highlight ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {tier.period}
                      </span>
                    )}
                  </div>

                  <p className={`mt-3 text-sm leading-relaxed ${tier.highlight ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {tier.description}
                  </p>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ${
                        tier.highlight ? 'bg-white/20' : 'bg-success/10'
                      }`}>
                        <CheckIcon className={`size-2.5 ${tier.highlight ? 'text-white' : 'text-success'}`} />
                      </div>
                      <span className={`text-sm ${tier.highlight ? 'text-white/80' : 'text-muted-foreground'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    href={tier.cta.href}
                    className={`group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-heading font-semibold transition-all ${
                      tier.cta.primary
                        ? 'bg-white text-primary hover:bg-white/90'
                        : tier.highlight
                        ? 'border border-white/30 text-white hover:bg-white/10'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    {tier.cta.label}
                    <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Transparency note */}
      <section className="py-16 bg-secondary/30">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center">
            <h3 className="font-display text-lg text-foreground">
              The business model, openly.
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Partners pay $20–25/month per connected practice to be visible in the accountability
              layer. That&apos;s how PracticeFront makes money. We tell you this because the
              alignment matters — if a partner is paying to be listed, they have a strong incentive
              to actually perform. Bad vendors get replaced. Good vendors gain practices.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading as="h2" size="xl" className="text-center">Pricing questions.</Heading>
            <div className="mt-10 divide-y divide-border">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group py-5 [&>summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4">
                    <span className="font-heading text-base font-semibold text-foreground">{q}</span>
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
