// ─── OpenDental PMS adapter ────────────────────────────────────────────────────
// Connects to the OpenDental MySQL/MariaDB database via a read-only user.
// The connector agent (desktop app) establishes a secure tunnel and sets
// OD_HOST, OD_PORT, OD_USER, OD_PASSWORD, OD_DATABASE in the connection config.
//
// Current status: STUB — returns deterministic demo data seeded from practiceId.
// Replace the body of fetchSnapshot() with real DB queries once the connector
// agent is distributable.

import type { PmsAdapter, PmsAdapterContext, PracticeHealthRaw } from './types'

// Simple deterministic seed from a string (no crypto needed — just for demo)
function seed(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return Math.abs(h) / 2147483647
}

// Seeded random in [min, max] — same practiceId always returns the same value
function rng(practiceId: string, key: string, min: number, max: number): number {
  const v = seed(practiceId + key)
  return min + v * (max - min)
}

export const openDentalAdapter: PmsAdapter = {
  pmsType: 'opendental',

  async fetchSnapshot({ practiceId }: PmsAdapterContext): Promise<PracticeHealthRaw> {
    // TODO: replace with real OpenDental queries
    // SELECT COUNT(*), ... FROM patient WHERE ...
    // SELECT SUM(production), SUM(income) FROM procedurelog WHERE ...
    return {
      patientRetentionRate: rng(practiceId, 'retention', 0.82, 0.98),
      newPatientsCount:     Math.round(rng(practiceId, 'new_pts', 12, 45)),
      reactivationValue:    Math.round(rng(practiceId, 'react_val', 18000, 95000) / 100) * 100,
      noShowRate:           rng(practiceId, 'noshow', 0.04, 0.16),
      recareRate:           rng(practiceId, 'recare', 0.55, 0.92),
      unscheduledTxValue:   Math.round(rng(practiceId, 'unsched', 120000, 980000) / 1000) * 1000,
      collectionRate:       rng(practiceId, 'collect', 0.88, 0.99),
      daysInAr:             rng(practiceId, 'ar', 22, 58),
      denialRate:           rng(practiceId, 'deny', 0.02, 0.14),
    }
  },
}
