'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Container } from '@/components/local/container'

const testimonials = [
  {
    quote:
      'I knew more about my practice health in 10 seconds than I usually get from a monthly report.',
    author: 'Beta Practice Owner',
    practice: 'General Dentistry · Phoenix, AZ',
    initials: 'JS',
  },
  {
    quote:
      "Finally I can see if my billing company is actually doing what I'm paying them for. The accountability piece is huge.",
    author: 'Beta Practice Owner',
    practice: 'Family Dentistry · Austin, TX',
    initials: 'MR',
  },
  {
    quote:
      'The setup really was 10 minutes. I connected our practice management system and had my first health scan before lunch.',
    author: 'Beta Practice Owner',
    practice: 'Cosmetic & General · Denver, CO',
    initials: 'AK',
  },
]

const trustStats = [
  { value: '10 min', label: 'Average setup time' },
  { value: 'Free', label: 'For dental practices, always' },
  { value: '3', label: 'Pillars monitored daily' },
  { value: 'OpenDental', label: 'First PMS supported' },
]

export function SocialProofSection() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const bgY = useSpring(rawY, { stiffness: 60, damping: 24 })

  const featured = testimonials[0]
  const secondary = testimonials.slice(1)

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-background overflow-hidden">
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={prefersReduced ? undefined : { y: bgY }}
        aria-hidden="true"
      >
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(ellipse, hsl(234 75% 55% / 0.07) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      <Container className="relative">
        {/* Trust stats */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4"
        >
          {trustStats.map(({ value, label }) => (
            <div key={label} className="bg-card px-8 py-7 text-center">
              <div className="font-mono text-3xl font-bold text-primary tabular-nums">{value}</div>
              <p className="mt-1.5 text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Section label */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mt-20 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-border" />
          <span className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground shrink-0">
            Early feedback
          </span>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        {/* Featured quote — editorial */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6"
        >
          <div
            className="font-display text-[6rem] leading-none text-primary/12 select-none -mb-8"
            aria-hidden="true"
          >
            &ldquo;
          </div>
          <blockquote className="font-display text-2xl sm:text-3xl lg:text-[2rem] italic leading-[1.32] text-foreground max-w-3xl">
            {featured.quote}
          </blockquote>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <span className="font-heading text-[10px] font-bold text-primary">{featured.initials}</span>
            </div>
            <p className="font-heading text-sm font-medium text-foreground">{featured.author}</p>
            <span className="text-border" aria-hidden="true">·</span>
            <p className="text-sm text-muted-foreground">{featured.practice}</p>
          </div>
        </motion.div>

        {/* Secondary testimonials — border-divided, no cards */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid sm:grid-cols-2"
        >
          {secondary.map((t, i) => (
            <div
              key={t.quote}
              className={`border-t border-border py-8 ${
                i === 0 ? 'sm:pr-10 sm:border-r' : 'sm:pl-10'
              }`}
            >
              <p className="font-display italic text-base leading-relaxed text-foreground/65">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted">
                  <span className="font-heading text-[8px] font-bold text-muted-foreground">
                    {t.initials}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/70">{t.author}</span>
                  {' · '}
                  {t.practice}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Trust pills */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
        >
          {[
            'Built for OpenDental',
            'Free for practices',
            'Designed for owners, not analysts',
            'Light enough to understand in one glance',
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-muted px-4 py-2 font-heading text-sm font-medium text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
