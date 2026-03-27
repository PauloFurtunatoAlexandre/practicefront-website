'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon, BarChart3Icon, UsersIcon, ZapIcon, ShieldCheckIcon } from 'lucide-react'
import { Container } from '@/components/local/container'
import { Eyebrow, Heading, Subheading, GradientText } from '@/components/local/text'

const partnerTypes = [
  {
    icon: BarChart3Icon,
    title: 'Billing Companies',
    description: 'Your collection rate, days in AR, and denial rates are tracked daily. Good performance builds trust with practice owners.',
    pillar: 'Collections',
  },
  {
    icon: UsersIcon,
    title: 'Marketing Agencies',
    description: 'New patient acquisition, retention trends, and reactivation rates are attributed to your work. Make your results visible.',
    pillar: 'Patients',
  },
  {
    icon: ZapIcon,
    title: 'Recall & Scheduling Software',
    description: 'Recare scheduled rates, no-show patterns, and unscheduled treatment recovery show whether your software is delivering.',
    pillar: 'Scheduling',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Other Service Providers',
    description: 'Membership plan providers, practice consultants, and technology vendors can all connect their services to practice outcomes.',
    pillar: 'Various',
  },
]

const benefits = [
  {
    title: 'Visibility to practice owners',
    description: 'Be seen by the practices you serve. Your performance data surfaces automatically when a practice views their health scan.',
  },
  {
    title: 'Competitive differentiation',
    description: 'If your results are strong, PracticeFront makes them visible. Let the data speak for you.',
  },
  {
    title: 'A marketplace of motivated buyers',
    description: 'When a practice sees a red pillar, they\'re actively looking for a better solution. Be the vetted alternative they find.',
  },
  {
    title: 'Flat, transparent pricing',
    description: '$20–25/month per connected practice. No revenue share, no hidden fees. You know exactly what you\'re paying and why.',
  },
]

export default function PartnersPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState('submitting')
    // In production, wire to a real form handler / CRM
    await new Promise((r) => setTimeout(r, 1200))
    setFormState('success')
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% -10%, hsl(234 85% 68% / 0.15), transparent)',
          }}
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="text-primary/80">For partners</Eyebrow>
            <Heading as="h1" size="2xl" className="mt-4 text-white">
              Good vendors should welcome{' '}
              <GradientText>accountability.</GradientText>
            </Heading>
            <Subheading size="lg" className="mt-6 text-white/60">
              PracticeFront connects your services to practice outcomes. If your work is strong,
              the data will prove it. Apply to be in the partner layer.
            </Subheading>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#apply"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-heading font-semibold text-white shadow-lg hover:bg-primary/90 transition-all"
              >
                Apply to Partner
                <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/how-it-works"
                className="rounded-xl border border-white/20 px-8 py-4 font-heading font-semibold text-white/80 hover:border-white/40 hover:text-white transition-all"
              >
                How It Works
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Partner types */}
      <section className="py-24 bg-background">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Who partners with PracticeFront</Eyebrow>
            <Heading as="h2" size="xl" className="mt-4">
              If you serve dental practices, you belong here.
            </Heading>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {partnerTypes.map(({ icon: Icon, title, description, pillar }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                    {pillar}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-secondary/30">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Why partner</Eyebrow>
            <Heading as="h2" size="xl" className="mt-4">
              What you get from the accountability layer.
            </Heading>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {benefits.map(({ title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/10">
                  <CheckIcon className="size-3 text-success" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pricing callout */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto mt-12 max-w-lg rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center"
          >
            <div className="font-mono text-4xl font-bold text-foreground">$20–25</div>
            <div className="mt-1 font-heading text-lg font-semibold text-muted-foreground">per connected practice / month</div>
            <p className="mt-4 text-sm text-muted-foreground">
              Flat pricing. No revenue share. No setup fees. Cancel anytime.
              The cost of one hour of your team&apos;s time, for ongoing practice relationships.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Application form */}
      <section id="apply" className="py-24 bg-background">
        <Container>
          <div className="mx-auto max-w-xl">
            <div className="text-center">
              <Eyebrow>Apply to partner</Eyebrow>
              <Heading as="h2" size="xl" className="mt-4">
                Ready to make your results visible?
              </Heading>
              <Subheading className="mt-4">
                We review applications within 2 business days. If you&apos;re a good fit,
                we&apos;ll walk you through the setup.
              </Subheading>
            </div>

            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 rounded-2xl border border-success/20 bg-success/5 p-8 text-center"
              >
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success/10">
                  <CheckIcon className="size-6 text-success" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-foreground">Application received</h3>
                <p className="mt-2 text-muted-foreground">
                  We&apos;ll review it and be in touch within 2 business days.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block font-heading text-sm font-medium text-foreground mb-1.5">
                      Company name <span className="text-destructive">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="company"
                      placeholder="Your company"
                      className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-sm font-medium text-foreground mb-1.5">
                      Your name <span className="text-destructive">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Full name"
                      className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-heading text-sm font-medium text-foreground mb-1.5">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block font-heading text-sm font-medium text-foreground mb-1.5">
                    Service type <span className="text-destructive">*</span>
                  </label>
                  <select
                    required
                    name="type"
                    className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select your service...</option>
                    <option value="billing">Billing / RCM Company</option>
                    <option value="marketing">Marketing Agency</option>
                    <option value="recall">Recall / Scheduling Software</option>
                    <option value="membership">Membership Plan Provider</option>
                    <option value="consulting">Practice Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-heading text-sm font-medium text-foreground mb-1.5">
                    How many dental practices do you currently serve?
                  </label>
                  <select
                    name="practices"
                    className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select range...</option>
                    <option value="1-10">1–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-200">51–200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>
                <div>
                  <label className="block font-heading text-sm font-medium text-foreground mb-1.5">
                    Anything else we should know?
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us about your service and why you'd be a good fit..."
                    className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full rounded-xl bg-primary px-6 py-4 font-heading font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-60 transition-all"
                >
                  {formState === 'submitting' ? 'Submitting...' : 'Apply to Partner →'}
                </button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}
