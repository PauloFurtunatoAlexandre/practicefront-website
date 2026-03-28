// ─── Health score types ────────────────────────────────────────────────────────

export type PillarStatus = 'green' | 'yellow' | 'red'

export interface PillarScore {
  score: number        // 0–100
  status: PillarStatus
}

export interface PatientsResult extends PillarScore {
  retentionRate: number       // 0–1
  newPatientsCount: number
  reactivationValue: number   // USD
}

export interface SchedulingResult extends PillarScore {
  noShowRate: number          // 0–1
  recareRate: number          // 0–1
  unscheduledTxValue: number  // USD
}

export interface CollectionsResult extends PillarScore {
  collectionRate: number      // 0–1
  daysInAr: number
  denialRate: number          // 0–1
}

export interface PracticeHealthResult {
  patients: PatientsResult
  scheduling: SchedulingResult
  collections: CollectionsResult
  overallScore: number        // weighted average
  overallStatus: PillarStatus
  computedAt: Date
}
