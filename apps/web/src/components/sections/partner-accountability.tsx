'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheckIcon, AlertCircleIcon, ArrowRightIcon, CheckCircle2Icon } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/local/container'
import { Eyebrow, Heading, Subheading } from '@/components/local/text'

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
  'See which partner touches which part of the business',
  'Connect outcomes to what you are already paying for',
  'Replace guesswork with accountability',
  'Good vendors should welcome this visibility',
]

// ─── Partner network visualization ────────────────────────────────────────────

const PARTNER_NET_ROUTES = [
  { id: 'pnr0', d: 'M 50 28 C 155 28 230 50 302 50', color: 'hsl(152 55% 38%)', pDur: '2.4s', delay: '0.0s' },
  { id: 'pnr1', d: 'M 50 50 C 155 50 230 50 302 50', color: 'hsl(28 75% 48%)',  pDur: '2.8s', delay: '0.5s' },
  { id: 'pnr2', d: 'M 50 72 C 155 72 230 50 302 50', color: 'hsl(0 72% 51%)',   pDur: '2.2s', delay: '1.0s' },
]

const PARTNER_NET_NODES = [
  { id: 'pnn0', cx: 50, cy: 28, r: 6, color: 'hsl(152 55% 38%)', score: '94', label: 'Billing'   },
  { id: 'pnn1', cx: 50, cy: 50, r: 6, color: 'hsl(28 75% 48%)',  score: '61', label: 'Marketing' },
  { id: 'pnn2', cx: 50, cy: 72, r: 6, color: 'hsl(0 72% 51%)',   score: '43', label: 'Recall'    },
]

function PartnerNetworkCard({ prefersReduced }: { prefersReduced: boolean | null }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="font-heading text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
          Performance Network
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 animate-pulse rounded-full bg-success" />
          <span className="font-mono text-[9px] text-muted-foreground">live</span>
        </span>
      </div>
      <svg viewBox="0 0 360 100" className="w-full" aria-hidden="true">
        <defs>
          {PARTNER_NET_ROUTES.map(({ id, d }) => (
            <path key={`mp-${id}`} id={`pnmp-${id}`} d={d} fill="none" />
          ))}
          <filter id="pn-node-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="pn-hub-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="pn-hub-g" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="hsl(234 70% 78%)" />
            <stop offset="100%" stopColor="hsl(234 75% 52%)" />
          </radialGradient>
        </defs>
        {/* Route lines */}
        {PARTNER_NET_ROUTES.map(({ id, d, color }) => (
          <path
            key={id}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            strokeDasharray="3 8"
            strokeOpacity="0.28"
            strokeLinecap="round"
          />
        ))}
        {/* Traveling particles */}
        {!prefersReduced && PARTNER_NET_ROUTES.map(({ id, color, pDur, delay }) => (
          <circle key={`pp-${id}`} r="2.4" fill={color} fillOpacity="0.90">
            <animateMotion dur={pDur} repeatCount="indefinite" begin={delay}>
              <mpath href={`#pnmp-${id}`} />
            </animateMotion>
          </circle>
        ))}
        {/* Partner nodes */}
        {PARTNER_NET_NODES.map(({ id, cx, cy, r, color }) => (
          <g key={id} filter="url(#pn-node-glow)">
            <circle cx={cx} cy={cy} r={r + 5} fill="none" stroke={color} strokeWidth="0.4" strokeOpacity="0.18" />
            <circle cx={cx} cy={cy} r={r} fill={color} fillOpacity="0.16" stroke={color} strokeWidth="0.8" strokeOpacity="0.52" />
          </g>
        ))}
        {/* Score + label text */}
        {PARTNER_NET_NODES.map(({ id, cx, cy, color, score, label }) => (
          <g key={`lbl-${id}`}>
            <text x={cx + 14} y={cy - 1} fontSize="5.5" fontFamily="monospace" fill={color} fillOpacity="0.92" fontWeight="bold">{score}</text>
            <text x={cx + 14} y={cy + 6} fontSize="4.5" fontFamily="sans-serif" fill={color} fillOpacity="0.40">{label}</text>
          </g>
        ))}
        {/* Hub outer pulse ring */}
        <motion.circle
          cx={302} cy={50} r={20}
          fill="none"
          stroke="hsl(234 75% 55%)"
          strokeWidth="0.5"
          animate={prefersReduced ? {} : { opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />
        {/* Hub core */}
        <circle cx={302} cy={50} r={13} fill="url(#pn-hub-g)" fillOpacity="0.88" filter="url(#pn-hub-glow)" />
        {/* Hub label below */}
        <text x={302} y={71} fontSize="4.5" fontFamily="monospace" textAnchor="middle" fill="hsl(234 75% 55%)" fillOpacity="0.60">Practice</text>
      </svg>
    </div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────────

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
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-24">
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
                <span className="text-primary">earning their fees.</span>
              </Heading>
              <Subheading size="lg" className="mt-6">
                When a pillar turns red, PracticeFront does not just tell you what is
                wrong — it shows you which partner is responsible and connects you to a vetted
                alternative if you need one.
              </Subheading>
              <p className="mt-4 font-semibold text-foreground">
                Your billing company either improves their numbers or loses the account.
                That is how it should work.
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

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.3 }}
              className="mt-10 border-t border-border pt-6"
            >
              <p className="font-display italic text-lg text-foreground/60">
                &ldquo;Data without action is just anxiety.&rdquo;
              </p>
            </motion.div>

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

          {/* Right: network viz + partner score cards */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-4"
          >
            <PartnerNetworkCard prefersReduced={prefersReduced} />
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
