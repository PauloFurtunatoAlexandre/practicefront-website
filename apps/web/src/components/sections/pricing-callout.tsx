'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon } from 'lucide-react'
import { Container } from '@/components/local/container'
import { Heading, Subheading } from '@/components/local/text'

const included = [
  'Three Pillars monitoring (Patients, Scheduling, Collections)',
  'Partner performance tracking',
  'Vetted partner marketplace access',
  'Daily health score updates',
  'Unlimited historical data',
]

export function PricingCalloutSection() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const bgY = useSpring(rawY, { stiffness: 70, damping: 26 })

  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:py-32 bg-secondary/30">
      {/* Parallax background accent */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={prefersReduced ? undefined : { y: bgY }}
        aria-hidden="true"
      >
        <div
          className="absolute right-0 top-0 h-full w-1/2 opacity-50"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 80% 50%, hsl(234 75% 55% / 0.06), transparent)',
          }}
        />
      </motion.div>

      <Container className="relative">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl"
        >
          <div className="grid lg:grid-cols-2">
            {/* Left: pricing */}
            <div className="relative overflow-hidden p-8 lg:p-12">
              <div
                className="pointer-events-none absolute inset-0 opacity-50"
                aria-hidden="true"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 60% at -10% 50%, hsl(234 75% 55% / 0.08), transparent)',
                }}
              />
              <div className="relative">
                <Heading as="h2" size="xl" className="mt-0">
                  Free for practices. Always.
                </Heading>
                <div className="mt-6 flex items-end gap-2">
                  <span className="font-mono text-6xl font-bold tabular-nums text-foreground">$0</span>
                  <span className="mb-2 text-muted-foreground font-heading">/month for practices</span>
                </div>
                <Subheading className="mt-4">
                  PracticeFront is free for dental practices. Full Three Pillars monitoring,
                  partner performance tracking, and marketplace access are included. We make money
                  when partners pay to participate — openly, not quietly.
                </Subheading>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/console/register"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md transition-all"
                  >
                    Get Started Free
                    <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3 font-heading text-sm font-semibold text-foreground hover:bg-accent transition-colors"
                  >
                    See Pricing Details
                  </Link>
                </div>

                <p className="mt-4 font-mono text-xs text-muted-foreground">
                  Partners pay $20–25 per connected practice · That alignment matters
                </p>
              </div>
            </div>

            {/* Right: what's included */}
            <div className="border-t border-border bg-muted/40 p-8 lg:border-l lg:border-t-0 lg:p-12">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Everything included
              </h3>
              <ul className="mt-6 space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/10">
                      <CheckIcon className="size-3 text-success" />
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-border bg-card p-4">
                <p className="font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  For Partners
                </p>
                <p className="text-sm text-muted-foreground">
                  Service providers pay $20–25/month per connected practice to be visible
                  in the accountability layer.
                </p>
                <Link
                  href="/partners"
                  className="mt-3 inline-flex items-center gap-1 font-heading text-xs font-semibold text-primary hover:gap-2 transition-all"
                >
                  Apply to partner <ArrowRightIcon className="size-3" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
