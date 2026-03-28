'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon } from 'lucide-react'
import { Container } from '@/components/local/container'

const starterFeatures = [
  'Three Pillars dashboard (Patients, Scheduling, Collections)',
  'Daily health score updates',
  'Historical trends \u2014 unlimited',
  'Weekly health email every Monday',
  'OpenDental integration',
]

const proFeatures = [
  'Everything in Starter',
  'Partner accountability tracking',
  'Benchmark comparisons vs peers',
  'Custom alerts',
  'Data export + 3 users per location',
]

export function PricingCalloutSection() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const bgY = useSpring(rawY, { stiffness: 70, damping: 26 })

  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:py-32 bg-secondary/30">
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
            {/* Left: Starter */}
            <div className="relative overflow-hidden p-8 lg:p-12">
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                aria-hidden="true"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 60% at -10% 50%, hsl(234 75% 55% / 0.06), transparent)',
                }}
              />
              <div className="relative">
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Starter
                </p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="font-mono text-5xl font-bold tabular-nums text-foreground leading-none">
                    $0
                  </span>
                  <span className="mb-1 font-heading text-sm text-muted-foreground">/month</span>
                </div>
                <p className="mt-3 font-heading text-base font-semibold text-foreground">
                  The full practice health dashboard, free.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  No credit card. No trial period. Setup in 10 minutes on OpenDental.
                </p>

                <ul className="mt-6 space-y-3">
                  {starterFeatures.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-success/10">
                        <CheckIcon className="size-2.5 text-success" aria-hidden="true" />
                      </div>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    href="/console/register"
                    className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
                  >
                    Get Started Free
                    <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Pro */}
            <div className="relative border-t border-border bg-muted/30 p-8 lg:border-l lg:border-t-0 lg:p-12">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-primary opacity-60 lg:inset-x-0 lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-[2px]" aria-hidden="true" />
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Pro
              </p>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-mono text-5xl font-bold tabular-nums text-foreground leading-none">
                  $49
                </span>
                <span className="mb-1 font-heading text-sm text-muted-foreground">/location/month</span>
              </div>
              <p className="mt-3 font-heading text-base font-semibold text-foreground">
                Add accountability to every vendor you pay.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                or $470/location/year \u2014 includes a 14-day free trial.
              </p>

              <ul className="mt-6 space-y-3">
                {proFeatures.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <CheckIcon className="size-2.5 text-primary" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/console/register"
                  className="group inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 font-heading text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-all"
                >
                  Start Pro Trial
                  <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-heading text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Compare plans
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
