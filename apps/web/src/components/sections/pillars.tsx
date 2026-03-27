'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { UsersIcon, CalendarIcon, BarChart3Icon } from 'lucide-react'
import { Container } from '@/components/local/container'
import { cn } from '@/lib/utils'

const pillars = [
  {
    id: 'patients',
    icon: UsersIcon,
    title: 'Patients',
    tagline: 'Are you keeping and growing your patient base?',
    description:
      'See retention, new patient trend, case acceptance, and reactivation opportunity before empty chairs become a revenue problem.',
    color: 'primary' as const,
    accentFrom: 'hsl(234 75% 55%)',
    accentTo: 'hsl(250 75% 60%)',
    metrics: [
      { label: 'Retention rate', value: '94.2%', status: 'healthy', trend: '+1.8%' },
      { label: 'New patients / mo', value: '47', status: 'healthy', trend: '+6 this month' },
      { label: 'Reactivation value', value: '$124K', status: 'opportunity', trend: 'In charts' },
    ],
  },
  {
    id: 'scheduling',
    icon: CalendarIcon,
    title: 'Scheduling',
    tagline: 'Is your schedule working as hard as it should?',
    description:
      'Track no-show cost, recare coverage, and unscheduled treatment so hidden production doesn\'t stay trapped in charts.',
    color: 'warm' as const,
    accentFrom: 'hsl(28 75% 48%)',
    accentTo: 'hsl(38 85% 55%)',
    metrics: [
      { label: 'No-show rate', value: '8.7%', status: 'warning', trend: '↑ 2.1% vs last mo' },
      { label: 'Recare scheduled', value: '71%', status: 'warning', trend: '↓ from 78%' },
      { label: 'Unscheduled TX', value: '$743K', status: 'opportunity', trend: 'Sitting in charts' },
    ],
  },
  {
    id: 'collections',
    icon: BarChart3Icon,
    title: 'Collections',
    tagline: 'Are you actually collecting what you produce?',
    description:
      'See collection rate, days in AR, and denial pressure at a glance — without digging through billing reports.',
    color: 'chart-4' as const,
    accentFrom: 'hsl(270 60% 58%)',
    accentTo: 'hsl(290 65% 62%)',
    metrics: [
      { label: 'Collection rate', value: '96.4%', status: 'healthy', trend: 'Top 20%' },
      { label: 'Days in AR', value: '31', status: 'healthy', trend: 'Under target' },
      { label: 'Denial rate', value: '4.1%', status: 'warning', trend: '↑ from 2.8%' },
    ],
  },
]

const statusStyle: Record<string, string> = {
  healthy: 'text-success',
  warning: 'text-warm',
  opportunity: 'text-primary',
}

const statusDot: Record<string, string> = {
  healthy: 'bg-success',
  warning: 'bg-warm',
  opportunity: 'bg-primary',
}

export function PillarsSection() {
  const [active, setActive] = useState(0)
  const prefersReduced = useReducedMotion()
  const pillar = pillars[active]

  return (
    <section id="pillars" className="relative py-28 lg:py-40 bg-background overflow-hidden">
      {/* Background glow that shifts with active pillar */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 80% 50%, ${pillar.accentFrom}0d, transparent 60%)`,
          }}
          aria-hidden="true"
        />
      </AnimatePresence>

      <Container className="relative">
        {/* Section header */}
        <div className="max-w-2xl">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              Three pillars of practice health
            </span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl lg:text-[3rem]">
              One view.{' '}
              <span className="bg-linear-to-br from-primary via-[hsl(250,80%,62%)] to-[hsl(280,70%,65%)] bg-clip-text text-transparent">
                Three signals.
              </span>
            </h2>
            <p className="mt-5 text-lg leading-[1.7] text-muted-foreground">
              Most dental software gives you more data. PracticeFront gives you a clearer signal.
              In one view, see whether your patient base is healthy, your schedule is productive,
              and you&apos;re collecting what you produce.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[280px,1fr] lg:gap-12">
          {/* Pillar switcher — vertical tabs */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:pb-0"
          >
            {pillars.map((p, i) => {
              const Icon = p.icon
              const isActive = i === active
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    'relative flex shrink-0 items-center gap-3 rounded-2xl px-5 py-4 text-left transition-all duration-200 lg:w-full',
                    isActive
                      ? 'bg-card shadow-md border border-border'
                      : 'hover:bg-card/60 border border-transparent',
                  )}
                >
                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="pillar-indicator"
                      className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    />
                  )}

                  <div className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors',
                    isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground',
                  )}>
                    <Icon className="size-4.5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'font-heading text-sm font-bold truncate',
                      isActive ? 'text-foreground' : 'text-muted-foreground',
                    )}>
                      {p.title}
                    </p>
                    {isActive && (
                      <p className="mt-0.5 text-xs text-muted-foreground truncate hidden lg:block">
                        {p.tagline}
                      </p>
                    )}
                  </div>
                </button>
              )
            })}
          </motion.div>

          {/* Active pillar content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-3xl border border-border bg-card overflow-hidden shadow-lg"
            >
              {/* Gradient accent band */}
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: `linear-gradient(to right, ${pillar.accentFrom}, ${pillar.accentTo})` }}
              />

              <div className="p-8 lg:p-10">
                <div className="grid gap-8 lg:grid-cols-[1fr,280px] items-start">
                  {/* Left: copy */}
                  <div>
                    <h3 className="font-display text-3xl tracking-tight text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 font-heading text-base font-medium text-muted-foreground">
                      {pillar.tagline}
                    </p>
                    <p className="mt-4 leading-[1.75] text-muted-foreground">
                      {pillar.description}
                    </p>

                    {/* Subtle quote */}
                    <div className="mt-8 flex items-start gap-3 rounded-xl bg-muted/60 px-4 py-3">
                      <span className="mt-0.5 size-1.5 rounded-full bg-primary shrink-0" />
                      <p className="font-display italic text-sm text-muted-foreground">
                        {pillar.id === 'patients' && 'Know before your retention rate becomes a recruiting problem.'}
                        {pillar.id === 'scheduling' && '$743K in unscheduled treatment is the industry average. How much is sitting in your charts?'}
                        {pillar.id === 'collections' && 'The difference between 94% and 98% collection rate is worth tens of thousands per year.'}
                      </p>
                    </div>
                  </div>

                  {/* Right: metric cards */}
                  <div className="flex flex-col gap-3">
                    {pillar.metrics.map((metric, i) => (
                      <motion.div
                        key={metric.label}
                        initial={prefersReduced ? false : { opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="rounded-xl border border-border bg-background px-4 py-3.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-muted-foreground truncate">
                            {metric.label}
                          </span>
                          <span className="flex items-center gap-1 shrink-0">
                            <span className={`size-1.5 rounded-full ${statusDot[metric.status]}`} />
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-end justify-between gap-2">
                          <span className={`font-mono text-2xl font-bold tabular-nums leading-none ${statusStyle[metric.status]}`}>
                            {metric.value}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground text-right leading-tight">
                            {metric.trend}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
