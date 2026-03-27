'use client'

import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  animate,
  useInView,
} from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon } from 'lucide-react'
import { useEffect } from 'react'
import { Container } from '@/components/local/container'

// ─── Animated counting number ───────────────────────────────────────────────
function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`
        }
      },
    })
    return controls.stop
  }, [inView, value, prefix, suffix, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}

// ─── Floating metric card ────────────────────────────────────────────────────
interface MetricCardProps {
  label: string
  metric: string
  status: 'healthy' | 'warning' | 'opportunity'
  description: string
  delay?: number
  className?: string
  animateNumber?: { value: number; prefix?: string; suffix?: string; decimals?: number }
}

const statusDot: Record<string, string> = {
  healthy: 'bg-success',
  warning: 'bg-warm',
  opportunity: 'bg-primary',
}
const statusMetricColor: Record<string, string> = {
  healthy: 'text-success',
  warning: 'text-warm',
  opportunity: 'text-primary',
}
const statusLabel: Record<string, string> = {
  healthy: 'On Track',
  warning: 'Attention',
  opportunity: 'Opportunity',
}
const statusBadge: Record<string, string> = {
  healthy: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warm/10 text-warm border-warm/20',
  opportunity: 'bg-primary/10 text-primary border-primary/20',
}
const statusBar: Record<string, string> = {
  healthy: 'bg-success',
  warning: 'bg-warm',
  opportunity: 'bg-primary',
}

function MetricCard({ label, metric, status, description, delay = 0, className, animateNumber }: MetricCardProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 24 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-2xl border border-border/60 bg-card/95 shadow-xl backdrop-blur-md ${className}`}
    >
      {/* Top accent bar */}
      <div className={`absolute inset-x-0 top-0 h-0.5 ${statusBar[status]}`} />

      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-heading text-[10px] font-semibold ${statusBadge[status]}`}>
            <span className={`size-1.5 rounded-full ${statusDot[status]} ${status !== 'opportunity' ? '' : ''}`} />
            {statusLabel[status]}
          </span>
        </div>

        <div className={`mt-2.5 font-mono text-3xl font-bold tabular-nums leading-none ${statusMetricColor[status]}`}>
          {animateNumber ? (
            <AnimatedNumber {...animateNumber} className={statusMetricColor[status]} />
          ) : (
            metric
          )}
        </div>

        <p className="mt-1.5 text-xs leading-snug text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
const trustItems = [
  'Works with any PMS',
  'No credit card required',
  'Setup in 10 minutes',
]

export function HeroSection() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const rawY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const parallaxY = useSpring(rawY, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-background flex flex-col items-center justify-center"
    >
      {/* ── Background layers ── */}

      {/* Large radial spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% -5%, hsl(234 75% 55% / 0.12) 0%, hsl(270 60% 58% / 0.06) 50%, transparent 75%)',
        }}
      />

      {/* Grid overlay */}
      <motion.div
        style={prefersReduced ? undefined : { y: parallaxY, opacity }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(234 75% 55% / 1) 1px, transparent 1px), linear-gradient(to right, hsl(234 75% 55% / 1) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </motion.div>

      {/* Floating orbs */}
      <motion.div
        animate={prefersReduced ? {} : {
          scale: [1, 1.12, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-32 top-1/4 size-[500px] rounded-full bg-primary/8 blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        animate={prefersReduced ? {} : {
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 3 }}
        className="pointer-events-none absolute -right-32 bottom-1/4 size-[400px] rounded-full bg-[hsl(270,60%,58%)]/6 blur-3xl"
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <Container className="relative z-10 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-[1fr_420px] lg:gap-16 xl:gap-24 items-center">

          {/* Left column: copy */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/6 px-4 py-2 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                <motion.span
                  animate={prefersReduced ? {} : { scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="size-1.5 rounded-full bg-primary"
                />
                Works with OpenDental, Dentrix, Eaglesoft & more
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={prefersReduced ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-7 font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.08] tracking-tight text-foreground"
            >
              Your practice health,
              <br />
              <span className="relative">
                in a{' '}
                <span className="relative inline-block">
                  <span className="bg-linear-to-br from-primary via-[hsl(250,80%,62%)] to-[hsl(280,70%,65%)] bg-clip-text text-transparent">
                    10-second scan.
                  </span>
                  {/* Underline accent */}
                  <motion.span
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
                    className="absolute -bottom-1 left-0 right-0 h-0.5 origin-left bg-linear-to-r from-primary to-[hsl(280,70%,65%)] rounded-full"
                  />
                </span>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: 'easeOut' }}
              className="mt-7 text-lg leading-[1.7] text-muted-foreground sm:text-xl"
            >
              PracticeFront monitors your patients, scheduling, and collections — and tells you
              exactly which partner to call when something&apos;s off.{' '}
              <strong className="font-semibold text-foreground">
                Free for dental practices.
              </strong>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/console/register"
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-primary px-7 py-4 font-heading text-base font-semibold text-primary-foreground shadow-[0_4px_32px_hsl(234_75%_55%/0.35)] transition-all duration-300 hover:shadow-[0_8px_48px_hsl(234_75%_55%/0.5)] hover:-translate-y-0.5"
              >
                {/* Shimmer */}
                <motion.span
                  animate={prefersReduced ? {} : { x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: 'linear', repeatDelay: 2 }}
                  className="pointer-events-none absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent"
                />
                Get Started Free
                <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="#how-it-works"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/50 px-7 py-4 font-heading text-base font-semibold text-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-accent"
              >
                See How It Works
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {trustItems.map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckIcon className="size-3.5 text-success" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right column: metric cards stacked/floating */}
          <div className="relative mt-16 lg:mt-0 h-[480px] hidden lg:block">
            {/* Background card glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background: 'radial-gradient(ellipse 80% 80% at 50% 50%, hsl(234 75% 55% / 0.06), transparent)',
              }}
            />

            <MetricCard
              label="Patients"
              metric="94.2%"
              animateNumber={{ value: 94.2, suffix: '%', decimals: 1 }}
              status="healthy"
              description="Retention above target"
              delay={0.55}
              className="absolute left-0 top-0 w-56"
            />
            <MetricCard
              label="Scheduling"
              metric="8.7%"
              animateNumber={{ value: 8.7, suffix: '%', decimals: 1 }}
              status="warning"
              description="No-show rate needs attention"
              delay={0.68}
              className="absolute right-0 top-16 w-56"
            />
            <MetricCard
              label="Collections"
              metric="96.4%"
              animateNumber={{ value: 96.4, suffix: '%', decimals: 1 }}
              status="healthy"
              description="Collection rate on target"
              delay={0.81}
              className="absolute left-4 top-[220px] w-56"
            />
            <MetricCard
              label="Unscheduled TX"
              metric="$743K"
              status="opportunity"
              description="Sitting in treatment plans"
              delay={0.94}
              className="absolute right-4 top-[300px] w-56"
            />

            {/* Connecting lines SVG */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <motion.path
                d="M 112 60 Q 200 120 224 176"
                stroke="hsl(234 75% 55% / 0.15)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              />
              <motion.path
                d="M 224 236 Q 160 260 116 280"
                stroke="hsl(234 75% 55% / 0.15)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
              />
            </svg>
          </div>
        </div>

        {/* Mobile metric cards grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 lg:hidden">
          {[
            { label: 'Patients', metric: '94.2%', status: 'healthy' as const, description: 'Retention above target' },
            { label: 'Scheduling', metric: '8.7%', status: 'warning' as const, description: 'No-show rate: attention' },
            { label: 'Collections', metric: '96.4%', status: 'healthy' as const, description: 'Collection rate' },
            { label: 'Unscheduled', metric: '$743K', status: 'opportunity' as const, description: 'In treatment plans' },
          ].map((card, i) => (
            <MetricCard key={card.label} {...card} delay={0.4 + i * 0.1} />
          ))}
        </div>

        {/* Supporting italic line */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-10 text-center font-display italic text-lg text-muted-foreground lg:text-left"
        >
          Monitor what matters. Ignore the noise.
        </motion.p>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-border/60 p-1"
        >
          <div className="h-1.5 w-0.5 rounded-full bg-muted-foreground/60" />
        </motion.div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
          scroll
        </span>
      </motion.div>
    </section>
  )
}
