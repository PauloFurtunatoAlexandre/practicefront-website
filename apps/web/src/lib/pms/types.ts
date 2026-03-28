// ─── Normalized practice health data ──────────────────────────────────────────
// Every PMS adapter returns this shape. The calculation engine works entirely
// from this type — it never touches PMS-specific data directly.

export interface PracticeHealthRaw {
  // Patients
  patientRetentionRate: number   // 0–1  (e.g. 0.942 = 94.2%)
  newPatientsCount: number       // last 30 days
  reactivationValue: number      // USD — patients 18+ months inactive × avg production
  // Scheduling
  noShowRate: number             // 0–1  (e.g. 0.087 = 8.7%)
  recareRate: number             // 0–1  proportion due for recare who are scheduled
  unscheduledTxValue: number     // USD — open treatment plans not yet scheduled
  // Collections
  collectionRate: number         // 0–1  (collected / billed, current period)
  daysInAr: number               // average days outstanding in accounts receivable
  denialRate: number             // 0–1  (claims denied / claims submitted)
}

// Each PMS adapter must implement this interface
export interface PmsAdapter {
  readonly pmsType: string
  fetchSnapshot(context: PmsAdapterContext): Promise<PracticeHealthRaw>
}

export interface PmsAdapterContext {
  practiceId: string
  // Connection info varies by PMS; adapters pull what they need from here
  connectionConfig: Record<string, string>
}
