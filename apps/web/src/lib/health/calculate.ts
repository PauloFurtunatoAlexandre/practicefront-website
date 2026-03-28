// ─── Three Pillars calculation engine ─────────────────────────────────────────
// Takes raw PracticeHealthRaw data from a PMS adapter and computes scored
// pillar results. Thresholds are based on industry benchmarks for US dental
// practices (ADA/MGMA reference data).

import type { PracticeHealthRaw } from '../pms/types'
import type {
  PillarStatus,
  PatientsResult,
  SchedulingResult,
  CollectionsResult,
  PracticeHealthResult,
} from './types'

// ─── Status from score ────────────────────────────────────────────────────────

function scoreToStatus(score: number): PillarStatus {
  if (score >= 75) return 'green'
  if (score >= 50) return 'yellow'
  return 'red'
}

// ─── Patients pillar ──────────────────────────────────────────────────────────
// Benchmarks:
//   Retention ≥ 90%  → excellent | 80–89% → fair | < 80% → poor
//   No-show-free scheduling contributes via recare.

function calcPatients(raw: PracticeHealthRaw): PatientsResult {
  // Retention: 90–100% → 70–100pts, 80–90% → 40–70pts, <80% → 0–40pts
  const retentionScore =
    raw.patientRetentionRate >= 0.9
      ? 70 + (raw.patientRetentionRate - 0.9) / 0.1 * 30
      : raw.patientRetentionRate >= 0.8
        ? 40 + (raw.patientRetentionRate - 0.8) / 0.1 * 30
        : (raw.patientRetentionRate / 0.8) * 40

  // New patients: ≥ 25/mo → full weight, scales down linearly to 0 at 0
  const newPtScore = Math.min(raw.newPatientsCount / 25, 1) * 100

  // Reactivation: having value means patients exist to win back (neutral metric —
  // a high number isn't inherently bad, but flagging it nudges action)
  // Score based on retention primarily, new patients secondary
  const score = Math.round(retentionScore * 0.75 + newPtScore * 0.25)

  return {
    score: Math.min(score, 100),
    status: scoreToStatus(score),
    retentionRate: raw.patientRetentionRate,
    newPatientsCount: raw.newPatientsCount,
    reactivationValue: raw.reactivationValue,
  }
}

// ─── Scheduling pillar ────────────────────────────────────────────────────────
// Benchmarks:
//   No-show ≤ 5%  → excellent | 5–10% → fair | > 10% → poor
//   Recare ≥ 85%  → excellent | 70–85% → fair | < 70% → poor

function calcScheduling(raw: PracticeHealthRaw): SchedulingResult {
  // No-show: invert (lower is better)
  // ≤ 5%  → 100pts, 5–10% → 50–100pts, 10–20% → 0–50pts, > 20% → 0
  const noShowScore =
    raw.noShowRate <= 0.05
      ? 100
      : raw.noShowRate <= 0.1
        ? 100 - ((raw.noShowRate - 0.05) / 0.05) * 50
        : raw.noShowRate <= 0.2
          ? 50 - ((raw.noShowRate - 0.1) / 0.1) * 50
          : 0

  // Recare: ≥ 85% → 100pts, 70–85% → 50–100pts, < 70% → 0–50pts
  const recareScore =
    raw.recareRate >= 0.85
      ? 100
      : raw.recareRate >= 0.7
        ? 50 + ((raw.recareRate - 0.7) / 0.15) * 50
        : (raw.recareRate / 0.7) * 50

  const score = Math.round(noShowScore * 0.6 + recareScore * 0.4)

  return {
    score: Math.min(score, 100),
    status: scoreToStatus(score),
    noShowRate: raw.noShowRate,
    recareRate: raw.recareRate,
    unscheduledTxValue: raw.unscheduledTxValue,
  }
}

// ─── Collections pillar ───────────────────────────────────────────────────────
// Benchmarks:
//   Collection rate ≥ 98%  → excellent | 90–97% → fair | < 90% → poor
//   Days in AR ≤ 30        → excellent | 30–45 → fair | > 45 → poor
//   Denial rate ≤ 5%       → excellent | 5–10% → fair | > 10% → poor

function calcCollections(raw: PracticeHealthRaw): CollectionsResult {
  // Collection rate: ≥ 98% → 100pts, 90–98% → 50–100pts, < 90% → 0–50pts
  const collectScore =
    raw.collectionRate >= 0.98
      ? 100
      : raw.collectionRate >= 0.9
        ? 50 + ((raw.collectionRate - 0.9) / 0.08) * 50
        : (raw.collectionRate / 0.9) * 50

  // Days in AR: ≤ 30 → 100, 30–45 → 50–100, > 45 → 0–50
  const arScore =
    raw.daysInAr <= 30
      ? 100
      : raw.daysInAr <= 45
        ? 100 - ((raw.daysInAr - 30) / 15) * 50
        : Math.max(0, 50 - ((raw.daysInAr - 45) / 30) * 50)

  // Denial rate: ≤ 5% → 100, 5–10% → 50–100, > 10% → 0–50
  const denialScore =
    raw.denialRate <= 0.05
      ? 100
      : raw.denialRate <= 0.1
        ? 100 - ((raw.denialRate - 0.05) / 0.05) * 50
        : Math.max(0, 50 - ((raw.denialRate - 0.1) / 0.1) * 50)

  const score = Math.round(collectScore * 0.5 + arScore * 0.3 + denialScore * 0.2)

  return {
    score: Math.min(score, 100),
    status: scoreToStatus(score),
    collectionRate: raw.collectionRate,
    daysInAr: raw.daysInAr,
    denialRate: raw.denialRate,
  }
}

// ─── Main entry point ─────────────────────────────────────────────────────────

export function calculateHealth(raw: PracticeHealthRaw): PracticeHealthResult {
  const patients = calcPatients(raw)
  const scheduling = calcScheduling(raw)
  const collections = calcCollections(raw)

  // Weighted overall: collections is revenue-critical so weighted slightly higher
  const overallScore = Math.round(
    patients.score * 0.3 + scheduling.score * 0.3 + collections.score * 0.4,
  )

  return {
    patients,
    scheduling,
    collections,
    overallScore,
    overallStatus: scoreToStatus(overallScore),
    computedAt: new Date(),
  }
}
