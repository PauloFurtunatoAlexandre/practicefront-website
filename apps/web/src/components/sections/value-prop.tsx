'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/local/container'

const points = [
  {
    number: '10s',
    label: 'Health scan',
    desc: 'One view across Patients, Scheduling, and Collections.',
  },
  {
    number: '24h',
    label: 'Score refresh',
    desc: 'Updated daily from your practice management system.',
  },
  {
    number: '3',
    label: 'Pillars tracked',
    desc: 'Green means healthy. Red means act. No guesswork.',
  },
]

export function ValuePropSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-20 lg:py-28 bg-background">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, hsl(234 75% 55% / 0.04), transparent)',
        }}
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Left: headline */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              The solution
            </span>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] leading-[1.15]">
              A simple view of practice health,{' '}
              <span className="text-muted-foreground/60">built for busy owners.</span>
            </h2>
            <p className="mt-6 text-lg leading-[1.75] text-muted-foreground">
              PracticeFront gives you a fast, trustworthy view across Patients, Scheduling, and
              Collections — so you can spot problems sooner and act before they get expensive.
            </p>
          </motion.div>

          {/* Right: stat rows — no cards */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {points.map(({ number, label, desc }, i) => (
              <motion.div
                key={label}
                initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-6 border-t border-border py-6"
              >
                <span className="font-mono text-2xl font-bold text-primary tabular-nums shrink-0 w-10 pt-0.5">
                  {number}
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">{label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
