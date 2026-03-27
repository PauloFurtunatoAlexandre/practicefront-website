'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { StarIcon } from 'lucide-react'
import { Container } from '@/components/local/container'
import { Eyebrow, Heading } from '@/components/local/text'

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
      'Finally I can see if my billing company is actually doing what I\'m paying them for. The accountability piece is huge.',
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
  { value: 'Any', label: 'PMS supported' },
]

export function SocialProofSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative py-24 lg:py-32 bg-background">
      <Container>
        {/* Trust stats */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4"
        >
          {trustStats.map(({ value, label }) => (
            <div key={label} className="bg-card px-8 py-8 text-center">
              <div className="font-mono text-4xl font-bold text-primary tabular-nums">{value}</div>
              <p className="mt-2 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="mx-auto mt-24 max-w-2xl text-center">
          <Eyebrow>Early feedback</Eyebrow>
          <Heading as="h2" size="xl" className="mt-4">
            Built to be useful before it asks for anything.
          </Heading>
        </div>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid gap-6 sm:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author + i}
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <StarIcon key={j} className="size-4 fill-warm text-warm" />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 font-display italic text-base leading-relaxed text-foreground/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 font-heading text-xs font-bold text-primary">
                  {t.initials}
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.practice}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust items */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
        >
          {[
            'Works with any PMS',
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
