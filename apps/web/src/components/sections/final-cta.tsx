'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
import { Container } from '@/components/local/container'

// ─── Ambient node field ────────────────────────────────────────────────────────

const AMBIENT_CTA_NODES = [
  { id: 'ac1',  cx:   80, cy:  60, r: 2.0, color: 'hsl(234 85% 68%)', dur: 5.2, delay: 0.0 },
  { id: 'ac2',  cx:  180, cy: 185, r: 1.5, color: 'hsl(270 65% 65%)', dur: 6.8, delay: 1.2 },
  { id: 'ac3',  cx:   38, cy: 305, r: 2.5, color: 'hsl(152 58% 46%)', dur: 4.5, delay: 2.1 },
  { id: 'ac4',  cx:  225, cy: 445, r: 1.8, color: 'hsl(234 85% 68%)', dur: 7.0, delay: 0.7 },
  { id: 'ac5',  cx:  115, cy: 535, r: 1.5, color: 'hsl(28 80% 58%)',  dur: 5.8, delay: 1.8 },
  { id: 'ac6',  cx: 1105, cy:  88, r: 2.0, color: 'hsl(152 58% 46%)', dur: 6.2, delay: 0.3 },
  { id: 'ac7',  cx:  978, cy: 205, r: 1.5, color: 'hsl(234 85% 68%)', dur: 4.8, delay: 1.5 },
  { id: 'ac8',  cx: 1145, cy: 342, r: 2.5, color: 'hsl(270 65% 65%)', dur: 5.5, delay: 0.9 },
  { id: 'ac9',  cx: 1052, cy: 462, r: 1.8, color: 'hsl(28 80% 58%)',  dur: 7.2, delay: 2.4 },
  { id: 'ac10', cx:  918, cy: 542, r: 1.5, color: 'hsl(152 58% 46%)', dur: 4.2, delay: 0.6 },
  { id: 'ac11', cx:  418, cy:  28, r: 1.5, color: 'hsl(234 85% 68%)', dur: 6.5, delay: 1.0 },
  { id: 'ac12', cx:  782, cy:  52, r: 1.8, color: 'hsl(270 65% 65%)', dur: 5.0, delay: 1.9 },
  { id: 'ac13', cx:  348, cy: 572, r: 1.5, color: 'hsl(28 80% 58%)',  dur: 6.0, delay: 0.4 },
  { id: 'ac14', cx:  852, cy: 568, r: 2.0, color: 'hsl(0 72% 62%)',   dur: 4.7, delay: 2.6 },
]

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

      {/* Ambient data node field */}
      <svg
        viewBox="0 0 1200 600"
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Sparse hairline connections */}
        <line x1="80"  y1="60"  x2="180" y2="185" stroke="hsl(234 85% 68%)" strokeWidth="0.4" strokeOpacity="0.07" />
        <line x1="38"  y1="305" x2="225" y2="445" stroke="hsl(234 85% 68%)" strokeWidth="0.4" strokeOpacity="0.07" />
        <line x1="1105" y1="88" x2="978" y2="205" stroke="hsl(234 85% 68%)" strokeWidth="0.4" strokeOpacity="0.07" />
        <line x1="1145" y1="342" x2="1052" y2="462" stroke="hsl(234 85% 68%)" strokeWidth="0.4" strokeOpacity="0.07" />
        <line x1="418" y1="28"  x2="782" y2="52"  stroke="hsl(234 85% 68%)" strokeWidth="0.4" strokeOpacity="0.05" />
        {/* Breathing dots */}
        {AMBIENT_CTA_NODES.map(({ id, cx, cy, r, color, dur, delay }) => (
          <motion.circle
            key={id}
            cx={cx} cy={cy} r={r}
            fill={color}
            fillOpacity="0.06"
            animate={{ fillOpacity: [0.06, 0.22, 0.06] }}
            transition={{ duration: dur, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay }}
          />
        ))}
      </svg>

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
            className="font-display text-[clamp(2rem,5vw,4rem)] tracking-tight text-white leading-[1.1]"
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
