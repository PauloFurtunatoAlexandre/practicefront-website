'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/local/container'

const callouts = [
  { label: 'Top 20% collection rate',   color: 'text-success    bg-success/10    border-success/25'    },
  { label: 'Above industry average',    color: 'text-primary    bg-primary/10    border-primary/25'    },
  { label: 'Revenue sitting in charts', color: 'text-warm       bg-warm/10       border-warm/25'       },
  { label: 'Needs attention this week', color: 'text-destructive bg-destructive/10 border-destructive/25' },
]

export function ProductClaritySection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-secondary/30">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 50%, hsl(234 75% 55% / 0.04), transparent)',
        }}
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr,auto] lg:items-center lg:gap-20">
          {/* Left: copy */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              Designed for owners
            </span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl lg:text-[3rem] leading-[1.1]">
              See what matters.{' '}
              <span className="text-muted-foreground/50">Ignore the noise.</span>
            </h2>
            <p className="mt-6 text-lg leading-[1.75] text-muted-foreground">
              PracticeFront is designed for the owner who has 30 seconds between patients, not
              30 minutes for analytics. Green means healthy. Red means act. The point is not to
              explore more dashboards. The point is to know where attention is needed right now.
            </p>
          </motion.div>

          {/* Right: callout pills */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-3 lg:min-w-[230px]"
          >
            {callouts.map(({ label, color }, i) => (
              <motion.span
                key={label}
                initial={prefersReduced ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className={`inline-flex items-center rounded-xl border px-4 py-3 font-heading text-sm font-semibold ${color}`}
              >
                {label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
