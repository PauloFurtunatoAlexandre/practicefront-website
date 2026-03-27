'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'
import { Container } from '@/components/local/container'

const painPoints = [
  { stat: '1×', unit: '/mo', label: 'Your billing report arrives. By then it\'s too late to act.' },
  { stat: '~3', unit: 'mo', label: 'Before most owners notice the practice is slipping.' },
  { stat: '$0', unit: '', label: 'What practices typically pay for real-time visibility.' },
]

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 24 },
  },
}

export function ProblemSection() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={ref} className="relative overflow-hidden py-28 lg:py-40">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 bg-foreground"
        style={prefersReduced ? undefined : { backgroundPositionY: bgY }}
        aria-hidden="true"
      />

      {/* Diagonal top mask */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-background"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
        aria-hidden="true"
      />

      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Top eyebrow */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="h-px flex-1 bg-white/10" />
          <span className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-primary/70">
            The problem
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-[1fr,1fr] lg:gap-24 items-center">
          {/* Left: headline */}
          <div>
            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-[3.25rem] leading-[1.1]"
            >
              You&apos;re already paying{' '}
              <span className="text-white/30">for answers.</span>
              <br />
              You just can&apos;t get to them{' '}
              <span className="text-white/30">fast enough.</span>
            </motion.h2>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.15 }}
              className="mt-6 text-lg leading-[1.75] text-white/50"
            >
              You&apos;re seeing patients back-to-back. Your billing company sends a monthly
              report you don&apos;t have time to read. Your marketing agency says things are
              great. Your collections are... probably fine?
            </motion.p>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.25 }}
              className="mt-5 text-lg font-semibold text-white/90"
            >
              Most practice owners don&apos;t know their practice is in trouble until it&apos;s
              expensive to fix.
            </motion.p>

            {/* Quote */}
            <motion.blockquote
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.38 }}
              className="mt-10 border-l-2 border-primary/60 pl-5"
            >
              <p className="font-display italic text-xl text-white/70 leading-relaxed">
                &ldquo;Data without action is just anxiety.&rdquo;
              </p>
            </motion.blockquote>
          </div>

          {/* Right: stat cards */}
          <motion.div
            initial={prefersReduced ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="flex flex-col gap-4"
          >
            {painPoints.map(({ stat, unit, label }) => (
              <motion.div
                key={stat}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm transition-colors hover:bg-white/6"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(circle at 30% 50%, hsl(234 85% 68% / 0.08), transparent 60%)' }} />

                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-5xl font-bold tabular-nums text-primary leading-none">
                    {stat}
                  </span>
                  {unit && (
                    <span className="font-mono text-xl text-primary/60 leading-none">{unit}</span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{label}</p>
              </motion.div>
            ))}

            {/* Bottom call */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl border border-primary/25 bg-primary/10 p-6 backdrop-blur-sm"
            >
              <p className="font-heading text-base font-semibold text-white/90">
                PracticeFront is the 10-second answer.
              </p>
              <p className="mt-1.5 text-sm text-white/50">
                Green means healthy. Red means act. That&apos;s it.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Diagonal bottom mask */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-background"
        style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        aria-hidden="true"
      />
    </section>
  )
}
