'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'
import { Container } from '@/components/local/container'

// ─── Frozen ecosystem background ──────────────────────────────────────────────

const FROZEN_HUB = { cx: 268, cy: 292 }

const FROZEN_NODES = [
  { id: 'fn1', cx: 310, cy:  88, r: 5.5, dur: 5.8, delay: 0.0 },
  { id: 'fn2', cx:  72, cy: 160, r: 4.0, dur: 4.9, delay: 1.3 },
  { id: 'fn3', cx: 348, cy: 248, r: 3.5, dur: 6.2, delay: 0.6 },
  { id: 'fn4', cx: 112, cy: 320, r: 5.0, dur: 4.7, delay: 1.9 },
  { id: 'fn5', cx: 284, cy: 400, r: 4.0, dur: 5.5, delay: 0.9 },
  { id: 'fn6', cx:  56, cy: 432, r: 3.0, dur: 4.3, delay: 2.2 },
  { id: 'fn7', cx: 364, cy: 468, r: 2.5, dur: 6.8, delay: 0.4 },
  { id: 'fn8', cx: 196, cy: 200, r: 1.8, dur: 5.1, delay: 1.7 },
  { id: 'fn9', cx: 160, cy:  80, r: 1.5, dur: 4.6, delay: 2.8 },
]

const FROZEN_ROUTES = [
  { id: 'fr0', d: 'M 268 292 Q 289 190 310 88'  },
  { id: 'fr1', d: 'M 268 292 Q 170 226 72 160'  },
  { id: 'fr2', d: 'M 268 292 Q 308 270 348 248' },
  { id: 'fr3', d: 'M 268 292 Q 190 306 112 320' },
  { id: 'fr4', d: 'M 268 292 Q 276 346 284 400' },
  { id: 'fr5', d: 'M 268 292 Q 162 362 56 432'  },
  { id: 'fr6', d: 'M 268 292 Q 316 380 364 468' },
  { id: 'fr7', d: 'M 310 88 Q 235 134 196 200'  },
]

function FrozenEcosystemSVG({ prefersReduced }: { prefersReduced: boolean | null }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 420 560"
        className="absolute right-0 top-0 h-full w-1/2"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Frozen routes — dashed, no particles, dim */}
        {FROZEN_ROUTES.map(({ id, d }) => (
          <path
            key={id}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.055)"
            strokeWidth="0.8"
            strokeDasharray="3 14"
            strokeLinecap="round"
          />
        ))}
        {/* Hub — no glow, locked */}
        <circle cx={FROZEN_HUB.cx} cy={FROZEN_HUB.cy} r={32} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <circle cx={FROZEN_HUB.cx} cy={FROZEN_HUB.cy} r={19} fill="rgba(255,255,255,0.02)" />
        <circle cx={FROZEN_HUB.cx} cy={FROZEN_HUB.cy} r={6}  fill="rgba(255,255,255,0.05)" />
        {/* Satellite nodes — very slow ghostly pulse */}
        {FROZEN_NODES.map(({ id, cx, cy, r, dur, delay }) => (
          <g key={id}>
            <motion.circle
              cx={cx} cy={cy} r={r + 6}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.6"
              animate={prefersReduced ? {} : { opacity: [0.6, 0.08, 0.6] }}
              transition={{ duration: dur, repeat: Number.POSITIVE_INFINITY, delay, ease: 'easeInOut' }}
            />
            <motion.circle
              cx={cx} cy={cy} r={r}
              fill="rgba(255,255,255,0.07)"
              animate={prefersReduced ? {} : { opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: dur, repeat: Number.POSITIVE_INFINITY, delay, ease: 'easeInOut' }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

// ─── Section data ──────────────────────────────────────────────────────────────

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
        className="absolute inset-0 bg-surface-inverse"
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

      {/* Frozen data ecosystem — right half background */}
      <FrozenEcosystemSVG prefersReduced={prefersReduced} />

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
              report you do not have time to read. Your marketing agency says things are
              great. Your collections are... probably fine? Most practice owners do not know
              their practice is in trouble until it is expensive to fix.
            </motion.p>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.25 }}
              className="mt-5 text-lg leading-[1.75] text-white/50"
            >
              You do not need another dashboard to babysit. You need a faster way to know
              whether the practice is healthy and whether the people you pay are actually helping.
            </motion.p>

          </div>

          {/* Right: stat cards */}
          <motion.div
            initial={prefersReduced ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="flex flex-col"
          >
            {painPoints.map(({ stat, unit, label }) => (
              <motion.div
                key={stat}
                variants={staggerItem}
                className="flex items-end justify-between gap-6 border-t border-white/10 py-7"
              >
                <div className="flex items-baseline gap-1.5 shrink-0">
                  <span className="font-mono text-6xl font-bold tabular-nums text-primary/90 leading-none tracking-tight">
                    {stat}
                  </span>
                  {unit && (
                    <span className="font-mono text-xl text-primary/30 leading-none">{unit}</span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-white/40 text-right max-w-[190px]">{label}</p>
              </motion.div>
            ))}
            <div className="border-t border-white/10" />
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
