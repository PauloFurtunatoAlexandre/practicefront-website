'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { DatabaseIcon, ActivityIcon, ZapIcon, ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/local/container'

const steps = [
  {
    number: '01',
    icon: DatabaseIcon,
    title: 'Connect',
    description:
      'Link your practice management system in 10 minutes. Read-only. No migration, no disruption.',
    detail: 'Your data never leaves your network',
  },
  {
    number: '02',
    icon: ActivityIcon,
    title: 'Monitor',
    description:
      'Your Three Pillars update daily. Green means healthy. Red means act. That\'s it.',
    detail: 'Updated every 24 hours · Alerts when needed',
  },
  {
    number: '03',
    icon: ZapIcon,
    title: 'Act',
    description:
      'See which partner to call, or connect with a vetted alternative from our marketplace.',
    detail: 'Replace what\'s not working — fast',
  },
]

export function HowItWorksSection() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineScale = useTransform(scrollYProgress, [0.1, 0.7], [0, 1])

  return (
    <section id="how-it-works" ref={ref} className="relative py-28 lg:py-40 bg-background overflow-hidden">
      {/* Dot grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(234 75% 55%) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <Container className="relative">
        {/* Header */}
        <div className="mx-auto max-w-xl text-center">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              How it works
            </span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              Ruthlessly simple.
            </h2>
            <p className="mt-5 text-lg leading-[1.7] text-muted-foreground">
              Designed for the owner with 30 seconds between patients — not 30 minutes for analytics.
            </p>
          </motion.div>
        </div>

        {/* Steps with animated connecting line */}
        <div className="relative mt-20">
          {/* Vertical progress line */}
          <div className="absolute left-[22px] top-8 bottom-8 w-px bg-border lg:left-1/2 lg:-translate-x-px" aria-hidden="true">
            <motion.div
              className="absolute inset-x-0 top-0 bg-primary rounded-full"
              style={prefersReduced ? { height: '100%' } : { scaleY: lineScale, originY: 0, height: '100%' }}
            />
          </div>

          <div className="space-y-10 lg:space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={step.number}
                  initial={prefersReduced ? false : { opacity: 0, x: isLeft ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 260, damping: 24 }}
                  className="relative grid lg:grid-cols-2 lg:gap-16 items-center"
                >
                  {/* Number node on the line */}
                  <div className="absolute left-0 top-0 flex size-11 items-center justify-center rounded-full border-2 border-primary bg-background z-10 lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2">
                    <span className="font-mono text-xs font-bold text-primary">{step.number}</span>
                  </div>

                  {/* Content — alternates left/right on lg */}
                  <div className={`pl-16 lg:pl-0 ${isLeft ? 'lg:text-right' : 'lg:order-2 lg:text-left lg:pl-16'}`}>
                    <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'lg:justify-end' : ''}`}>
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="font-display text-xl text-foreground">{step.title}</h3>
                    </div>
                    <p className="leading-[1.75] text-muted-foreground">{step.description}</p>
                    <p className="mt-3 font-mono text-xs text-muted-foreground border-t border-border pt-3 inline-block">
                      {step.detail}
                    </p>
                  </div>

                  {/* Empty opposite column spacer */}
                  <div className={isLeft ? 'hidden lg:block' : 'hidden lg:block lg:order-1'} />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <Link
            href="/how-it-works"
            className="group inline-flex items-center gap-2 font-heading text-sm font-semibold text-primary hover:gap-3 transition-all duration-200"
          >
            See the full walkthrough
            <ArrowRightIcon className="size-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
