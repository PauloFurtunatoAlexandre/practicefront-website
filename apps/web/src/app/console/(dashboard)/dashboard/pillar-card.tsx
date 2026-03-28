'use client'

import { motion } from 'framer-motion'
import type { PillarStatus } from '@/lib/health'

interface PillarCardProps {
  label: string
  icon: React.ReactNode
  score: number
  status: PillarStatus
  primaryMetric: string
  primaryLabel: string
  secondaryMetric: string
  secondaryLabel: string
  tertiaryMetric: string
  tertiaryLabel: string
  delay?: number
}

const statusRing: Record<PillarStatus, string> = {
  green:  'ring-1 ring-success/30',
  yellow: 'ring-1 ring-warm/30',
  red:    'ring-1 ring-destructive/30',
}
const statusBar: Record<PillarStatus, string> = {
  green:  'bg-success',
  yellow: 'bg-warm',
  red:    'bg-destructive',
}
const statusScore: Record<PillarStatus, string> = {
  green:  'text-success',
  yellow: 'text-warm',
  red:    'text-destructive',
}
const statusBadge: Record<PillarStatus, string> = {
  green:  'bg-success/10 text-success border-success/20',
  yellow: 'bg-warm/10 text-warm border-warm/20',
  red:    'bg-destructive/10 text-destructive border-destructive/20',
}
const statusLabel: Record<PillarStatus, string> = {
  green:  'Healthy',
  yellow: 'Attention',
  red:    'Critical',
}

export function PillarCard({
  label,
  icon,
  score,
  status,
  primaryMetric,
  primaryLabel,
  secondaryMetric,
  secondaryLabel,
  tertiaryMetric,
  tertiaryLabel,
  delay = 0,
}: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 24 }}
      className={`relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm ${statusRing[status]}`}
    >
      {/* Top accent bar */}
      <div className={`absolute inset-x-0 top-0 h-0.5 ${statusBar[status]}`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-secondary/60">
              {icon}
            </div>
            <h2 className="font-heading text-sm font-semibold text-foreground">{label}</h2>
          </div>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-wide ${statusBadge[status]}`}>
            <span className={`size-1.5 rounded-full ${statusBar[status]}`} aria-hidden="true" />
            {statusLabel[status]}
          </span>
        </div>

        {/* Score */}
        <div className="mt-5 flex items-end gap-2">
          <span className={`font-mono text-5xl font-bold tabular-nums leading-none ${statusScore[status]}`}>
            {score}
          </span>
          <span className="mb-1 font-mono text-sm text-muted-foreground">/100</span>
        </div>

        {/* Score bar */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            className={`h-full rounded-full ${statusBar[status]}`}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ delay: delay + 0.3, duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Metrics grid */}
        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border/50 pt-4">
          {[
            { metric: primaryMetric, label: primaryLabel },
            { metric: secondaryMetric, label: secondaryLabel },
            { metric: tertiaryMetric, label: tertiaryLabel },
          ].map(({ metric, label: metricLabel }) => (
            <div key={metricLabel}>
              <div className="font-mono text-sm font-semibold tabular-nums text-foreground">
                {metric}
              </div>
              <div className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                {metricLabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
