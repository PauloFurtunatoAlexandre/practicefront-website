'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
import { Container } from '@/components/local/container'

export function FinalCTASection() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const glowY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])

  return (
    <section ref={ref} className="relative overflow-hidden py-32 lg:py-48 bg-foreground">
      {/* Parallax radial glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={prefersReduced ? undefined : { backgroundPositionY: glowY }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 110%, hsl(234 85% 68% / 0.22), hsl(270 65% 60% / 0.08) 50%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Top diagonal mask */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-background"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Display headline */}
          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-heading text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight text-white leading-[1.1]"
          >
            You built this practice.
            <br />
            <span className="bg-linear-to-br from-primary via-[hsl(250,80%,68%)] to-[hsl(280,70%,65%)] bg-clip-text text-transparent">
              You should know it&apos;s healthy.
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.15 }}
            className="mt-7 text-lg leading-[1.7] text-white/55"
          >
            Get a clear view of Patients, Scheduling, and Collections — and finally see whether
            the vendors you pay are helping or hurting.
          </motion.p>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.28 }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/console/register"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-primary px-8 py-4 font-heading text-base font-semibold text-white shadow-[0_4px_40px_hsl(234_85%_68%/0.4)] transition-all duration-300 hover:shadow-[0_8px_56px_hsl(234_85%_68%/0.55)] hover:-translate-y-0.5"
            >
              <motion.span
                animate={prefersReduced ? {} : { x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: 'linear', repeatDelay: 3 }}
                className="pointer-events-none absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent"
              />
              Get Started Free — Takes 10 Minutes
              <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-8 py-4 font-heading text-base font-semibold text-white/75 transition-all duration-200 hover:border-white/35 hover:text-white hover:bg-white/5"
            >
              See How It Works
            </Link>
          </motion.div>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="mt-7 font-mono text-[11px] uppercase tracking-widest text-white/25"
          >
            Free for dental practices · No credit card · Setup in 10 minutes
          </motion.p>
        </div>
      </Container>
    </section>
  )
}
