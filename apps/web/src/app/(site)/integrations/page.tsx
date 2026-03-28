'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon } from 'lucide-react'
import { Container } from '@/components/local/container'
import { Eyebrow } from '@/components/local/text'

// ─── Data ─────────────────────────────────────────────────────────────────────

const integrations = [
  {
    id: 'opendental',
    name: 'OpenDental',
    status: 'live' as const,
    statusLabel: 'Live',
    description:
      'Connects via a read-only local agent installed on the machine running OpenDental. The agent reads directly from the OpenDental MySQL/MariaDB database. No data leaves your network.',
    connectionMethod: 'Local agent — MySQL read-only',
    setupTime: 'Under 10 minutes',
    metrics: [
      'Patient retention rate & trends',
      'New patient volume',
      'Reactivation opportunity value',
      'No-show rate & cost',
      'Recare scheduled %',
      'Unscheduled treatment value',
      'Collection rate',
      'Days in accounts receivable',
      'Insurance denial rate',
    ],
  },
  {
    id: 'dentrix',
    name: 'Dentrix',
    status: 'coming' as const,
    statusLabel: 'Coming 2026',
    description:
      'Dentrix integration is in development for 2026. We will support both CSV export parsing (works with any Dentrix tier) and direct API access for Dentrix Enterprise customers.',
    connectionMethod: 'CSV export parser + Enterprise API (planned)',
    setupTime: 'TBD',
    metrics: [
      'All Three Pillars metrics',
      'Same data as OpenDental integration',
    ],
  },
  {
    id: 'eaglesoft',
    name: 'Eaglesoft',
    status: 'coming' as const,
    statusLabel: 'Coming 2026',
    description:
      'Eaglesoft integration is in development for 2026. We will connect via a read-only SQL Server / ODBC connection to the Eaglesoft database, with credentials provisioned by your IT admin.',
    connectionMethod: 'SQL Server read-only via ODBC (planned)',
    setupTime: 'TBD',
    metrics: [
      'All Three Pillars metrics',
      'Same data as OpenDental integration',
    ],
  },
]

const securityPoints = [
  { label: 'Read-only access', detail: 'The connector agent can never write to, modify, or delete your data.' },
  { label: 'No patient PII stored', detail: 'Aggregate metrics are calculated locally. No patient names, DOB, or clinical data touch our servers.' },
  { label: 'AES-256 at rest, TLS 1.3 in transit', detail: 'All data in transit and at rest is encrypted to current standards.' },
  { label: 'You control the connection', detail: 'Uninstall the agent at any time. Your PMS data stays in your PMS.' },
]

// ─── Request form ─────────────────────────────────────────────────────────────

function RequestForm() {
  const prefersReduced = useReducedMotion()
  const [email, setEmail] = useState('')
  const [pmsName, setPmsName] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !pmsName) return
    setStatus('submitting')
    try {
      const res = await fetch('/api/pms-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pmsName, source: 'integrations' }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-success/20 bg-success/5 p-8"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success/10">
            <CheckIcon className="size-4 text-success" aria-hidden="true" />
          </div>
          <div>
            <p className="font-heading text-sm font-semibold text-foreground">
              Request received
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              We&apos;ll email you at {email} when {pmsName} support is available.
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="pmsName" className="block font-heading text-sm font-medium text-foreground">
            Your PMS <span className="text-destructive">*</span>
          </label>
          <input
            id="pmsName"
            type="text"
            value={pmsName}
            onChange={(e) => setPmsName(e.target.value)}
            placeholder="e.g. Curve Dental, Denticon, Practice-Web"
            required
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/60"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="requestEmail" className="block font-heading text-sm font-medium text-foreground">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="requestEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@practice.com"
            required
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/60"
          />
        </div>
      </div>
      {status === 'error' && (
        <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-all"
      >
        {status === 'submitting' ? 'Sending\u2026' : 'Notify Me'}
      </button>
    </form>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function IntegrationsPage() {
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
              'radial-gradient(ellipse 70% 55% at 25% 50%, hsl(234 75% 55% / 0.13), transparent 65%)',
          }}
        />
        <Container className="relative">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl"
          >
            <Eyebrow className="text-primary/70">Integrations</Eyebrow>
            <h1 className="mt-5 font-display text-4xl tracking-tight text-white sm:text-5xl leading-[1.08]">
              Connect to your practice management system.
            </h1>
            <p className="mt-6 text-lg leading-[1.75] text-white/60">
              PracticeFront works with OpenDental today. Dentrix and Eaglesoft are coming in 2026.
              The connector is read-only \u2014 we can never write to your database, and no patient
              records leave your network.
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
                href="/how-it-works"
                className="inline-flex items-center rounded-xl border border-white/20 px-7 py-3.5 font-heading text-sm font-semibold text-white/80 hover:border-white/40 hover:text-white transition-all"
              >
                How It Works
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Integration status ── */}
      <section className="py-24 lg:py-32 bg-background">
        <Container>
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-xl"
          >
            <Eyebrow>Integration status</Eyebrow>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              Supported systems.
            </h2>
          </motion.div>

          <div className="mt-12">
            {integrations.map((integration, i) => (
              <motion.div
                key={integration.id}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.07 }}
                className="grid gap-8 border-t border-border py-12 lg:grid-cols-[240px,1fr] lg:gap-16 lg:items-start"
              >
                {/* Left: name + status */}
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      {integration.name}
                    </h3>
                    <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold ${
                      integration.status === 'live'
                        ? 'bg-success/10 text-success'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {integration.status === 'live' && (
                        <span className="size-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
                      )}
                      {integration.statusLabel}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div>
                      <p className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        Connection method
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{integration.connectionMethod}</p>
                    </div>
                    {integration.setupTime !== 'TBD' && (
                      <div>
                        <p className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                          Setup time
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">{integration.setupTime}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: description + metrics */}
                <div>
                  <p className="leading-[1.75] text-muted-foreground">{integration.description}</p>

                  {integration.status === 'live' && (
                    <div className="mt-6">
                      <p className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        Metrics tracked
                      </p>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {integration.metrics.map((metric) => (
                          <li key={metric} className="flex items-center gap-2">
                            <span className="size-1.5 shrink-0 rounded-full bg-primary/50" aria-hidden="true" />
                            <span className="text-sm text-muted-foreground">{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {integration.status === 'coming' && (
                    <div className="mt-6 rounded-xl bg-muted/40 px-5 py-4">
                      <p className="text-sm text-muted-foreground">
                        Want to be notified when {integration.name} is ready?{' '}
                        <a
                          href="#request"
                          className="font-semibold text-primary hover:underline"
                        >
                          Request this integration \u2193
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </Container>
      </section>

      {/* ── Security ── */}
      <section className="py-24 bg-secondary/30">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-24">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <Eyebrow>Security &amp; privacy</Eyebrow>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                Your data never leaves your building.
              </h2>
              <p className="mt-5 leading-[1.75] text-muted-foreground">
                The PracticeFront connector is a lightweight local agent that runs on the server
                machine where your PMS is installed. It calculates aggregate health metrics
                locally \u2014 no patient names, dates of birth, or clinical records are ever
                transmitted to our servers.
              </p>
              <p className="mt-4 leading-[1.75] text-muted-foreground">
                The agent connects to your database in read-only mode using credentials you
                provision. You can revoke access and uninstall in under a minute.
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

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.15 }}
              className="space-y-0"
            >
              {securityPoints.map((point, i) => (
                <motion.div
                  key={point.label}
                  initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="border-t border-border py-6"
                >
                  <div className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    <div>
                      <p className="font-heading text-sm font-semibold text-foreground">{point.label}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{point.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-border" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Request your PMS ── */}
      <section id="request" className="py-24 bg-background">
        <Container>
          <div className="max-w-2xl">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <Eyebrow>Don&apos;t see your PMS?</Eyebrow>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                Request your practice management system.
              </h2>
              <p className="mt-5 leading-[1.75] text-muted-foreground">
                Tell us what you use and we&apos;ll notify you when that integration is ready.
                High-demand systems move up the roadmap.
              </p>
            </motion.div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.1 }}
              className="mt-10"
            >
              <RequestForm />
            </motion.div>
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
                On OpenDental? You can start today.
              </h2>
              <p className="mt-4 text-white/60">
                Free dashboard. Setup in 10 minutes. No credit card required.
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
