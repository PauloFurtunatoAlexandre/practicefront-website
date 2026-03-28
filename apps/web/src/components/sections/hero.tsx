'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import type { MotionValue } from 'framer-motion'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  animate,
  useInView,
  useMotionValue,
} from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon } from 'lucide-react'
import { Container } from '@/components/local/container'

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedNumber({
  value, prefix = '', suffix = '', decimals = 0, className,
}: {
  value: number; prefix?: string; suffix?: string; decimals?: number; className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  useEffect(() => {
    if (!inView || !ref.current) return
    const ctrl = animate(0, value, {
      duration: 1.4, ease: 'easeOut',
      onUpdate(v) { if (ref.current) ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}` },
    })
    return ctrl.stop
  }, [inView, value, prefix, suffix, decimals])
  return <span ref={ref} className={className}>{prefix}0{suffix}</span>
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const HUB = { x: 280, y: 340 }

// Primary nodes: anchor cards + decorative
const NODES = [
  { id: 'n1', x: 92,  y: 158, r: 4,   color: 'hsl(152 55% 38%)', dur: 2.8, delay: 0.5 },
  { id: 'n2', x: 478, y: 132, r: 3.5, color: 'hsl(234 75% 55%)', dur: 3.2, delay: 1.1 },
  { id: 'n3', x: 108, y: 490, r: 3.5, color: 'hsl(234 75% 55%)', dur: 3.5, delay: 0.8 },
  { id: 'n4', x: 400, y: 490, r: 4,   color: 'hsl(28 75% 48%)',  dur: 2.6, delay: 0.3 },
  { id: 'n5', x: 218, y: 574, r: 3.5, color: 'hsl(152 55% 38%)', dur: 3.0, delay: 1.4 },
  // Small depth nodes
  { id: 'n6', x: 186, y: 240, r: 2.2, color: 'hsl(234 75% 55%)', dur: 4.0, delay: 0.6 },
  { id: 'n7', x: 372, y: 214, r: 2.2, color: 'hsl(152 55% 38%)', dur: 3.8, delay: 1.2 },
  { id: 'n8', x: 320, y: 448, r: 2.2, color: 'hsl(28 75% 48%)',  dur: 3.4, delay: 0.9 },
  { id: 'n9', x: 348, y: 298, r: 1.8, color: 'hsl(270 60% 58%)', dur: 4.2, delay: 1.7 },
]

// Connector paths — quadratic beziers
const ROUTES = [
  { id: 'c0', d: `M ${HUB.x} ${HUB.y} Q 186 248 92 158`,   color: 'hsl(152 55% 38%)', pDur: '4.2s', bDur: 6, bDly: 0.0 },
  { id: 'c1', d: `M ${HUB.x} ${HUB.y} Q 379 236 478 132`,  color: 'hsl(234 75% 55%)', pDur: '3.8s', bDur: 5, bDly: 0.9 },
  { id: 'c2', d: `M ${HUB.x} ${HUB.y} Q 194 415 108 490`,  color: 'hsl(234 75% 55%)', pDur: '4.5s', bDur: 6, bDly: 0.5 },
  { id: 'c3', d: `M ${HUB.x} ${HUB.y} Q 340 415 400 490`,  color: 'hsl(28 75% 48%)',  pDur: '3.6s', bDur: 5, bDly: 1.3 },
  { id: 'c4', d: `M ${HUB.x} ${HUB.y} Q 249 457 218 574`,  color: 'hsl(152 55% 38%)', pDur: '4.0s', bDur: 6, bDly: 0.7 },
  { id: 'c5', d: 'M 92 158 Q 285 110 478 132',              color: 'hsl(234 75% 55%)', pDur: '5.5s', bDur: 7, bDly: 1.0 },
  { id: 'c6', d: 'M 92 158 Q 100 324 108 490',              color: 'hsl(152 55% 38%)', pDur: '5.0s', bDur: 7, bDly: 0.4 },
  { id: 'c7', d: 'M 478 132 Q 439 311 400 490',             color: 'hsl(28 75% 48%)',  pDur: '5.2s', bDur: 7, bDly: 1.6 },
  { id: 'c8', d: 'M 108 490 Q 163 532 218 574',             color: 'hsl(152 55% 38%)', pDur: '2.8s', bDur: 4, bDly: 0.8 },
  { id: 'c9', d: 'M 400 490 Q 309 532 218 574',             color: 'hsl(28 75% 48%)',  pDur: '3.2s', bDur: 4, bDly: 1.1 },
]

// ─── Orchestration SVG ────────────────────────────────────────────────────────

function OrchestratorSVG({
  prefersReduced,
  cursorSvgX,
  cursorSvgY,
  hubGlowOpacity,
}: {
  prefersReduced: boolean
  cursorSvgX: MotionValue<number>
  cursorSvgY: MotionValue<number>
  hubGlowOpacity: MotionValue<number>
}) {
  return (
    <svg
      viewBox="0 0 560 680"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Fine dot grid */}
        <pattern id="sv-grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.7" fill="hsl(234 75% 55%)" fillOpacity="0.13" />
        </pattern>

        {/* Filters */}
        <filter id="sv-ng"   x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="sv-hg"   x="-500%" y="-500%" width="1100%" height="1100%">
          <feGaussianBlur stdDeviation="12" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="sv-rg"   x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Cursor spotlight — very heavy blur */}
        <filter id="sv-spot" x="-500%" y="-500%" width="1100%" height="1100%">
          <feGaussianBlur stdDeviation="38" />
        </filter>

        {/* Hub gradient */}
        <radialGradient id="sv-hub-g" cx="38%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="hsl(234 70% 78%)" />
          <stop offset="55%"  stopColor="hsl(234 75% 62%)" />
          <stop offset="100%" stopColor="hsl(234 75% 52%)" />
        </radialGradient>

        {/* Ambient bloom */}
        <radialGradient id="sv-amb" cx="50%" cy="49%" r="56%">
          <stop offset="0%"   stopColor="hsl(234 75% 55%)" stopOpacity="0.11" />
          <stop offset="42%"  stopColor="hsl(270 60% 58%)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="hsl(234 75% 55%)" stopOpacity="0"   />
        </radialGradient>

        {/* Invisible route paths for animateMotion */}
        {ROUTES.map(({ id, d }) => (
          <path key={`mp-${id}`} id={`sv-mp-${id}`} d={d} fill="none" />
        ))}
      </defs>

      {/* ── Layer 0: background ── */}
      <rect x="0" y="0" width="560" height="680" fill="url(#sv-grid)" />
      <ellipse cx="280" cy="330" rx="275" ry="295" fill="url(#sv-amb)" />

      {/* Cursor spotlight — follows mouse, very soft */}
      {!prefersReduced && (
        <motion.circle
          cx={cursorSvgX}
          cy={cursorSvgY}
          r={120}
          fill="hsl(234 75% 62%)"
          fillOpacity="0.055"
          filter="url(#sv-spot)"
        />
      )}

      {/* ── Layer 1: connector paths ── */}
      {ROUTES.map(({ id, d, color, bDur, bDly }) => (
        <motion.path
          key={id}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="0.65"
          strokeDasharray="4 10"
          strokeLinecap="round"
          filter="url(#sv-rg)"
          initial={{ strokeOpacity: 0.05 }}
          animate={prefersReduced ? {} : { strokeOpacity: [0.05, 0.20, 0.05] }}
          transition={{ duration: bDur, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: bDly }}
        />
      ))}

      {/* ── Layer 2: traveling particles ── */}
      {!prefersReduced && ROUTES.map(({ id, color, pDur }, i) => (
        <circle key={`p-${id}`} r="1.9" fill={color} fillOpacity="0.92">
          <animateMotion dur={pDur} repeatCount="indefinite" begin={`${(i * 0.75).toFixed(2)}s`}>
            <mpath href={`#sv-mp-${id}`} />
          </animateMotion>
        </circle>
      ))}

      {/* ── Layer 3: mini data-card fragments ── */}

      {/* Fragment A — upper right: bar-chart widget */}
      <motion.g
        animate={prefersReduced ? {} : { y: [0, -5, 0] }}
        transition={{ duration: 6.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 0.8 }}
      >
        <rect x="384" y="62" width="138" height="98" rx="11"
          fill="hsl(234 75% 55%)" fillOpacity="0.06"
          stroke="hsl(234 75% 55%)" strokeOpacity="0.20" strokeWidth="0.6" />
        {/* Shine */}
        <rect x="384" y="62" width="138" height="1" rx="0.5" fill="white" fillOpacity="0.22" />
        {/* Header label */}
        <rect x="396" y="76"  width="48"  height="3.5" rx="1.75" fill="white"              fillOpacity="0.30" />
        <rect x="452" y="76"  width="16"  height="3.5" rx="1.75" fill="hsl(152 55% 38%)"  fillOpacity="0.55" />
        {/* Divider */}
        <rect x="396" y="85"  width="114" height="0.5" rx="0.25" fill="white" fillOpacity="0.08" />
        {/* Bar chart — 5 bars */}
        <rect x="398" y="118" width="14" height="18" rx="2.5" fill="hsl(234 75% 55%)" fillOpacity="0.32" />
        <rect x="416" y="108" width="14" height="28" rx="2.5" fill="hsl(234 75% 55%)" fillOpacity="0.40" />
        <rect x="434" y="100" width="14" height="36" rx="2.5" fill="hsl(234 75% 55%)" fillOpacity="0.50" />
        <rect x="452" y="112" width="14" height="24" rx="2.5" fill="hsl(234 75% 55%)" fillOpacity="0.36" />
        <rect x="470" y="104" width="14" height="32" rx="2.5" fill="hsl(152 55% 38%)" fillOpacity="0.55" />
        {/* Footer line */}
        <rect x="396" y="143" width="60" height="2"   rx="1"   fill="white" fillOpacity="0.14" />
        <rect x="462" y="143" width="30" height="2"   rx="1"   fill="white" fillOpacity="0.07" />
      </motion.g>

      {/* Fragment B — lower left: progress bars widget */}
      <motion.g
        animate={prefersReduced ? {} : { y: [0, -4, 0] }}
        transition={{ duration: 5.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 2.0 }}
      >
        <rect x="14" y="422" width="126" height="90" rx="11"
          fill="hsl(234 75% 55%)" fillOpacity="0.055"
          stroke="hsl(234 75% 55%)" strokeOpacity="0.18" strokeWidth="0.6" />
        <rect x="14" y="422" width="126" height="1" rx="0.5" fill="white" fillOpacity="0.20" />
        {/* Header */}
        <rect x="26" y="436" width="42"  height="3.5" rx="1.75" fill="white"             fillOpacity="0.28" />
        <rect x="26" y="445" width="100" height="0.5" rx="0.25" fill="white" fillOpacity="0.07" />
        {/* Progress bars */}
        <rect x="26" y="454" width="100" height="4" rx="2" fill="white" fillOpacity="0.06" />
        <rect x="26" y="454" width="78"  height="4" rx="2" fill="hsl(152 55% 38%)" fillOpacity="0.50" />
        <rect x="26" y="464" width="100" height="4" rx="2" fill="white" fillOpacity="0.06" />
        <rect x="26" y="464" width="54"  height="4" rx="2" fill="hsl(28 75% 48%)"  fillOpacity="0.55" />
        <rect x="26" y="474" width="100" height="4" rx="2" fill="white" fillOpacity="0.06" />
        <rect x="26" y="474" width="88"  height="4" rx="2" fill="hsl(234 75% 55%)" fillOpacity="0.50" />
        {/* Footer */}
        <rect x="26" y="490" width="50"  height="2"  rx="1" fill="white" fillOpacity="0.12" />
        <rect x="84" y="490" width="30"  height="2"  rx="1" fill="white" fillOpacity="0.07" />
      </motion.g>

      {/* Fragment C — mid right: sparkline widget */}
      <motion.g
        animate={prefersReduced ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 7.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 1.3 }}
      >
        <rect x="420" y="262" width="122" height="86" rx="11"
          fill="hsl(28 75% 48%)" fillOpacity="0.06"
          stroke="hsl(28 75% 48%)" strokeOpacity="0.22" strokeWidth="0.6" />
        <rect x="420" y="262" width="122" height="1" rx="0.5" fill="white" fillOpacity="0.22" />
        {/* Header */}
        <rect x="432" y="276" width="40"  height="3.5" rx="1.75" fill="white"            fillOpacity="0.28" />
        <rect x="480" y="275" width="12"  height="5"   rx="2.5"  fill="hsl(28 75% 48%)" fillOpacity="0.55" />
        <rect x="432" y="285" width="98"  height="0.5" rx="0.25" fill="white" fillOpacity="0.07" />
        {/* Sparkline dots + line */}
        <polyline
          points="432,325 448,318 464,322 480,310 496,314 512,306 528,312"
          fill="none"
          stroke="hsl(28 75% 48%)"
          strokeOpacity="0.45"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Sparkline dots */}
        {([[432,325],[448,318],[464,322],[480,310],[496,314],[512,306],[528,312]] as [number,number][]).map(([sx, sy]) => (
          <circle key={`${sx}-${sy}`} cx={sx} cy={sy} r="2" fill="hsl(28 75% 48%)" fillOpacity="0.70" />
        ))}
        {/* Footer */}
        <rect x="432" y="336" width="46"  height="2"  rx="1" fill="white" fillOpacity="0.14" />
        <rect x="486" y="336" width="26"  height="2"  rx="1" fill="white" fillOpacity="0.08" />
      </motion.g>

      {/* ── Layer 4: satellite nodes ── */}
      {NODES.map(({ id, x, y, r, color, dur, delay }) => (
        <g key={id}>
          {!prefersReduced && (
            <>
              <motion.circle cx={x} cy={y} r={r + 1.5}
                fill="none" stroke={color} strokeWidth="0.5"
                animate={{ r: [r + 1.5, r + 14, r + 1.5], strokeOpacity: [0.35, 0, 0.35] }}
                transition={{ duration: dur, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut', delay }}
              />
              {r >= 3.5 && (
                <motion.circle cx={x} cy={y} r={r}
                  fill="none" stroke={color} strokeWidth="0.4"
                  animate={{ r: [r, r + 7, r], strokeOpacity: [0.22, 0, 0.22] }}
                  transition={{ duration: dur, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut', delay: delay + dur * 0.42 }}
                />
              )}
            </>
          )}
          <circle cx={x} cy={y} r={r}     fill={color} fillOpacity="0.88" filter="url(#sv-ng)" />
          <circle cx={x} cy={y} r={r * 0.9} fill={color} fillOpacity="0.35" />
          <circle cx={x - r*0.28} cy={y - r*0.28} r={r * 0.32} fill="white" fillOpacity="0.58" />
        </g>
      ))}

      {/* ── Layer 5: central hub ── */}
      <g>
        {/* Reactive glow — intensifies when cursor is near hub */}
        <motion.circle cx={HUB.x} cy={HUB.y} r={44}
          fill="hsl(234 75% 55%)"
          style={{ fillOpacity: hubGlowOpacity }}
          filter="url(#sv-hg)"
        />

        {!prefersReduced && (
          <>
            {/* Outermost pulse */}
            <motion.circle cx={HUB.x} cy={HUB.y} r={10}
              fill="none" stroke="hsl(234 75% 55%)" strokeWidth="0.5"
              animate={{ r: [10, 44, 10], strokeOpacity: [0.24, 0, 0.24] }}
              transition={{ duration: 4.0, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut', delay: 0 }}
            />
            <motion.circle cx={HUB.x} cy={HUB.y} r={7}
              fill="none" stroke="hsl(234 75% 55%)" strokeWidth="0.5"
              animate={{ r: [7, 24, 7], strokeOpacity: [0.30, 0, 0.30] }}
              transition={{ duration: 4.0, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut', delay: 1.4 }}
            />

            {/* Slow rotating orbit rings */}
            <motion.circle cx={HUB.x} cy={HUB.y} r={32}
              fill="none" stroke="hsl(234 75% 55%)" strokeWidth="0.5"
              strokeDasharray="5 13" strokeOpacity="0.18"
              animate={{ rotate: 360 }}
              style={{ originX: `${HUB.x}px`, originY: `${HUB.y}px` }}
              transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            />
            <motion.circle cx={HUB.x} cy={HUB.y} r={48}
              fill="none" stroke="hsl(270 60% 58%)" strokeWidth="0.4"
              strokeDasharray="3 18" strokeOpacity="0.11"
              animate={{ rotate: -360 }}
              style={{ originX: `${HUB.x}px`, originY: `${HUB.y}px` }}
              transition={{ duration: 36, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            />

            {/* Static ambient ring */}
            <motion.circle cx={HUB.x} cy={HUB.y} r={20}
              fill="none" stroke="hsl(234 75% 55%)" strokeWidth="0.4"
              animate={{ strokeOpacity: [0.09, 0.20, 0.09] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            />
          </>
        )}

        {/* Glow bloom */}
        <circle cx={HUB.x} cy={HUB.y} r={18} fill="hsl(234 75% 55%)" fillOpacity="0.10" filter="url(#sv-hg)" />
        {/* Core */}
        <circle cx={HUB.x} cy={HUB.y} r={7}  fill="url(#sv-hub-g)" filter="url(#sv-hg)" />
        {/* Inner ring */}
        <circle cx={HUB.x} cy={HUB.y} r={7}  fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.25" />
        {/* Specular */}
        <circle cx={HUB.x - 2.4} cy={HUB.y - 2.4} r={2.6} fill="white" fillOpacity="0.40" />
        <circle cx={HUB.x - 1.2} cy={HUB.y - 1.2} r={1.0} fill="white" fillOpacity="0.65" />
      </g>
    </svg>
  )
}

// ─── Orchestration scene wrapper (3D tilt + cursor data) ──────────────────────

function HeroOrchestration({
  mouseX, mouseY,
  panelMouseX, panelMouseY,
  prefersReduced,
}: {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  panelMouseX: MotionValue<number>
  panelMouseY: MotionValue<number>
  prefersReduced: boolean
}) {
  // 3D tilt from section-level mouse (−1 to 1)
  const rawRX = useTransform(mouseY, [-1, 1], prefersReduced ? [0, 0] : [1.5, -1.5])
  const rawRY = useTransform(mouseX, [-1, 1], prefersReduced ? [0, 0] : [-2, 2])
  const rotX  = useSpring(rawRX, { stiffness: 38, damping: 28 })
  const rotY  = useSpring(rawRY, { stiffness: 38, damping: 28 })

  // Cursor SVG coordinates (panel 0-1 → viewBox 0-560, 0-680)
  const cursorSvgX = useTransform(panelMouseX, [0, 1], [0, 560])
  const cursorSvgY = useTransform(panelMouseY, [0, 1], [0, 680])

  // Distance from cursor to hub — drives hub glow intensity
  const hubGlowOpacity = useTransform(
    [panelMouseX, panelMouseY],
    ([mx, my]) => {
      const dx = (mx as number) - (HUB.x / 560)
      const dy = (my as number) - (HUB.y / 680)
      const dist = Math.sqrt(dx * dx + dy * dy)
      // 0.07 at rest, up to 0.22 when cursor is directly on hub
      return Math.max(0.07, 0.22 - dist * 0.8)
    }
  )
  const hubGlowSpring = useSpring(hubGlowOpacity, { stiffness: 60, damping: 20 })

  return (
    <div className="absolute inset-0" style={{ perspective: '1800px' }} aria-hidden="true">
      <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="absolute inset-0">
        <OrchestratorSVG
          prefersReduced={prefersReduced}
          cursorSvgX={cursorSvgX}
          cursorSvgY={cursorSvgY}
          hubGlowOpacity={hubGlowSpring}
        />
      </motion.div>
    </div>
  )
}

// ─── Floating metric card ─────────────────────────────────────────────────────

const STATUS = {
  healthy:     { bar: 'from-success to-success/40',  num: 'text-success', badge: 'bg-success/8 text-success border-success/20',  dot: 'bg-success', label: 'On Track'    },
  warning:     { bar: 'from-warm to-warm/40',        num: 'text-warm',    badge: 'bg-warm/8 text-warm border-warm/20',            dot: 'bg-warm',    label: 'Attention'   },
  opportunity: { bar: 'from-primary to-primary/40',  num: 'text-primary', badge: 'bg-primary/8 text-primary border-primary/20',  dot: 'bg-primary', label: 'Opportunity' },
} as const

interface FloatingCardProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  depth?: number
  label: string
  value: string
  status: keyof typeof STATUS
  description: string
  delay?: number
  floatDur?: number
  floatDelay?: number
  className?: string
  animateNum?: { value: number; prefix?: string; suffix?: string; decimals?: number }
}

function FloatingCard({
  mouseX, mouseY, depth = 0.6,
  label, value, status, description,
  delay = 0, floatDur = 5, floatDelay = 0,
  className, animateNum,
}: FloatingCardProps) {
  const prefersReduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const s = STATUS[status]

  // Parallax per card depth
  const rawX = useTransform(mouseX, [-1, 1], prefersReduced ? [0, 0] : [-15 * depth, 15 * depth])
  const rawY = useTransform(mouseY, [-1, 1], prefersReduced ? [0, 0] : [-10 * depth, 10 * depth])
  const px   = useSpring(rawX, { stiffness: 46, damping: 20 })
  const py   = useSpring(rawY, { stiffness: 46, damping: 20 })

  return (
    <motion.div
      style={{ x: px, y: py }}
      initial={prefersReduced ? false : { opacity: 0, y: 28, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: hovered ? 1.04 : 1 }}
      transition={{
        delay: hovered ? 0 : delay,
        type: 'spring',
        stiffness: hovered ? 340 : 180,
        damping: 24,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`absolute z-10 cursor-default ${className}`}
    >
      <motion.div
        animate={prefersReduced ? {} : { y: hovered ? -10 : [0, -6, 0] }}
        transition={
          hovered
            ? { type: 'spring', stiffness: 300, damping: 26 }
            : { duration: floatDur, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: floatDelay }
        }
        className="relative w-[214px] overflow-hidden rounded-2xl border border-border/40 bg-card/96 backdrop-blur-2xl transition-shadow duration-300"
        style={{
          boxShadow: hovered
            ? '0 32px 80px -8px rgba(0,0,0,0.28), 0 8px 24px -4px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.65)'
            : '0 20px 56px -8px rgba(0,0,0,0.20), 0 4px 16px -4px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.55)',
        }}
      >
        {/* Top edge shine */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/65 to-transparent" />

        <div className="p-4">
          <p className="font-heading text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60">
            {label}
          </p>

          {/* Metric — colored glow on hover */}
          <div className="relative mt-2">
            {hovered && (
              <div className={`absolute -inset-1 rounded-lg blur-md opacity-20 ${
                status === 'healthy' ? 'bg-success' : status === 'warning' ? 'bg-warm' : 'bg-primary'
              }`} />
            )}
            <p className={`relative font-mono text-[1.625rem] font-bold tabular-nums leading-none ${s.num}`}>
              {animateNum ? <AnimatedNumber {...animateNum} className={s.num} /> : value}
            </p>
          </div>

          <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold tracking-wide ${s.badge}`}>
            <motion.span
              animate={hovered ? { scale: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.5 }}
              className={`size-1.5 rounded-full ${s.dot}`}
              aria-hidden="true"
            />
            {s.label}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Trust items ──────────────────────────────────────────────────────────────

const TRUST = ['Works with OpenDental', 'No credit card required', 'Setup in 10 minutes'] as const

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function HeroSection() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const rawCY = useTransform(scrollYProgress, [0, 1], [0, 38])
  const contentY = useSpring(rawCY, { stiffness: 100, damping: 30 })
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const rawVY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const visY = useSpring(rawVY, { stiffness: 75, damping: 26 })
  const visOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0])

  // Section-level mouse (−1 to 1) — drives 3D tilt and card parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  // Panel-local mouse (0 to 1) — drives cursor spotlight + hub reactivity
  const panelMouseX = useMotionValue(0.5)
  const panelMouseY = useMotionValue(0.5)

  const panelRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced) return
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set(((e.clientX - r.left) / r.width) * 2 - 1)
    mouseY.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }, [prefersReduced, mouseX, mouseY])

  const handlePanelMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return
    const r = e.currentTarget.getBoundingClientRect()
    panelMouseX.set((e.clientX - r.left) / r.width)
    panelMouseY.set((e.clientY - r.top) / r.height)
  }, [prefersReduced, panelMouseX, panelMouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    panelMouseX.set(0.5)
    panelMouseY.set(0.5)
  }, [mouseX, mouseY, panelMouseX, panelMouseY])

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-svh overflow-hidden bg-background"
    >
      {/* ── Background ── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 68% 8%, hsl(234 75% 55% / 0.12) 0%, hsl(270 60% 58% / 0.06) 50%, transparent 72%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          animate={prefersReduced ? {} : { scale: [1, 1.14, 1], opacity: [0.26, 0.44, 0.26] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          className="absolute -left-56 top-[28%] size-[700px] rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={prefersReduced ? {} : { scale: [1, 1.1, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 5 }}
          className="absolute -right-44 top-[22%] size-[560px] rounded-full bg-[hsl(270,60%,58%)]/5 blur-3xl"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Full-bleed visual panel ── */}
      <motion.div
        ref={panelRef}
        style={prefersReduced ? { width: '56vw' } : { y: visY, opacity: visOpacity, width: '56vw' }}
        onMouseMove={handlePanelMouseMove}
        className="pointer-events-auto absolute inset-y-0 right-0 hidden lg:block"
        aria-hidden="true"
      >
        <HeroOrchestration
          mouseX={mouseX}
          mouseY={mouseY}
          panelMouseX={panelMouseX}
          panelMouseY={panelMouseY}
          prefersReduced={!!prefersReduced}
        />

        {/* ── Floating metric cards ── */}
        <FloatingCard
          mouseX={mouseX} mouseY={mouseY} depth={0.28}
          label="Patient Retention"
          value="94.2%"
          animateNum={{ value: 94.2, suffix: '%', decimals: 1 }}
          status="healthy"
          description="Retention rate above benchmark"
          delay={0.55} floatDur={5.6} floatDelay={0}
          className="top-[10%] left-[5%] pointer-events-auto"
        />
        <FloatingCard
          mouseX={mouseX} mouseY={mouseY} depth={0.92}
          label="No-Show Rate"
          value="8.7%"
          animateNum={{ value: 8.7, suffix: '%', decimals: 1 }}
          status="warning"
          description="Needs immediate action"
          delay={0.70} floatDur={4.9} floatDelay={1.5}
          className="top-[50%] right-[6%] pointer-events-auto"
        />
        <FloatingCard
          mouseX={mouseX} mouseY={mouseY} depth={0.52}
          label="Unscheduled TX"
          value="$743K"
          status="opportunity"
          description="Sitting in treatment plans"
          delay={0.84} floatDur={6.2} floatDelay={2.6}
          className="bottom-[14%] left-[17%] pointer-events-auto"
        />

        {/* Live badge */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, scale: 0.78 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.05, type: 'spring', stiffness: 250, damping: 22 }}
          className="absolute top-[30%] right-[8%] z-10 flex items-center gap-2 rounded-full border border-border/40 bg-card/95 px-3 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.09)] backdrop-blur-2xl pointer-events-auto"
        >
          <motion.span
            animate={prefersReduced ? {} : { opacity: [1, 0.18, 1] }}
            transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
            className="size-[7px] rounded-full bg-success"
            aria-hidden="true"
          />
          <span className="font-heading text-[10px] font-semibold tracking-wide text-foreground/70">
            Live · 3 pillar scan
          </span>
        </motion.div>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-52" aria-hidden="true"
          style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32" aria-hidden="true"
          style={{ background: 'linear-gradient(to bottom, hsl(var(--background)), transparent)' }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28" aria-hidden="true"
          style={{ background: 'linear-gradient(to top, hsl(var(--background)), transparent)' }} />
      </motion.div>

      {/* ── Left content ── */}
      <motion.div
        style={prefersReduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex min-h-svh items-center"
      >
        <Container className="pt-28 pb-20">
          <div className="lg:max-w-[480px] xl:max-w-[520px]">

            {/* Eyebrow */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-1.5 font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                <motion.span
                  animate={prefersReduced ? {} : { opacity: [1, 0.2, 1] }}
                  transition={{ duration: 2.0, repeat: Number.POSITIVE_INFINITY }}
                  className="size-[5px] rounded-full bg-primary"
                  aria-hidden="true"
                />
                OpenDental · Dentrix · Eaglesoft &amp; more
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={prefersReduced ? false : { opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 font-display text-[clamp(3rem,5.5vw,5rem)] leading-[1.02] tracking-[-0.025em] text-foreground"
            >
              Know practice
              <br />
              health{' '}
              <span className="relative whitespace-nowrap">
                <span className="bg-linear-to-r from-primary via-[hsl(250,80%,63%)] to-[hsl(280,72%,66%)] bg-clip-text text-transparent">
                  in 10 seconds.
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.1, duration: 0.52, ease: 'easeOut' }}
                  className="absolute -bottom-2 left-0 right-0 h-[2px] origin-left rounded-full bg-linear-to-r from-primary/50 to-[hsl(280,72%,66%)]/50"
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.70, delay: 0.18, ease: 'easeOut' }}
              className="mt-6 text-[1.0625rem] leading-[1.78] text-muted-foreground"
            >
              Fast, clear insight into Patients, Scheduling, and Collections.
              Plus accountability for every vendor you pay.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.60, delay: 0.30 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/console/register"
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-primary px-7 py-3.5 font-heading text-[0.9375rem] font-semibold text-primary-foreground shadow-[0_4px_28px_hsl(234_75%_55%/0.30)] transition-all duration-300 hover:shadow-[0_8px_44px_hsl(234_75%_55%/0.44)] hover:-translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <motion.span
                  animate={prefersReduced ? {} : { x: ['-100%', '200%'] }}
                  transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: 'linear', repeatDelay: 3 }}
                  className="pointer-events-none absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/14 to-transparent"
                  aria-hidden="true"
                />
                Get Started Free
                <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/55 px-7 py-3.5 font-heading text-[0.9375rem] font-semibold text-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/25 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                See How It Works
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.50, duration: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {TRUST.map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <CheckIcon className="size-3.5 shrink-0 text-success" aria-hidden="true" />
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Mobile cards */}
            <div className="mt-10 grid grid-cols-2 gap-3 lg:hidden">
              {([
                { label: 'Patient Retention', value: '94.2%', status: 'healthy'     as const, desc: 'Above target' },
                { label: 'No-Show Rate',      value: '8.7%',  status: 'warning'     as const, desc: 'Needs attention' },
                { label: 'Collection Rate',   value: '96.4%', status: 'healthy'     as const, desc: 'On track' },
                { label: 'Unscheduled TX',    value: '$743K', status: 'opportunity' as const, desc: 'In treatment plans' },
              ] as const).map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.07, type: 'spring', stiffness: 220, damping: 24 }}
                  className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/90 p-4 shadow-sm backdrop-blur-sm"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
                  <p className="font-heading text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60">{c.label}</p>
                  <p className={`mt-1.5 font-mono text-xl font-bold tabular-nums leading-none ${STATUS[c.status].num}`}>{c.value}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{c.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-10 font-display italic text-[0.9375rem] text-muted-foreground/55"
            >
              Monitor what matters. Ignore the noise.
            </motion.p>
          </div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-border/50 p-1"
        >
          <div className="h-1.5 w-0.5 rounded-full bg-muted-foreground/40" />
        </motion.div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/35">scroll</span>
      </motion.div>
    </section>
  )
}
