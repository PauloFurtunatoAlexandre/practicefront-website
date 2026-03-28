// ─── Dentrix PMS adapter ───────────────────────────────────────────────────────
// Dentrix stores data in a proprietary SQL database on Windows. The connector
// agent reads data via one of two approaches:
//
//   (a) CSV export parsing — Dentrix can export standard management reports to
//       CSV. The agent monitors an export directory and parses the latest files.
//       Required exports and the columns we read:
//
//       "Continuing Patient Retention.csv"
//         → patientRetentionRate: retained_patients / active_patients
//         → newPatientsCount: new_patients_30_days
//         → reactivationValue: inactive_18mo_count × avg_tx_value
//
//       "Practice Production.csv"
//         → collectionRate: total_collected / total_billed (current period)
//
//       "Patient Visit Forecast.csv"
//         → recareRate: recare_scheduled / recare_due
//         → unscheduledTxValue: sum(open_tx_plan_value)
//
//       "Aged Accounts Receivable.csv"
//         → daysInAr: (AR_bucket_31_60 × 45.5 + AR_bucket_61_90 × 75.5 + ...) / total_ar
//         → denialRate: denied_claims / total_claims
//
//       "Appointment Book.csv"
//         → noShowRate: no_shows / total_appointments (rolling 30 days)
//
//   (b) Dentrix Enterprise API — Available for larger deployments. Requires
//       API key and endpoint URL from the Dentrix admin console.
//       Set DENTRIX_API_KEY + DENTRIX_API_URL in connectionConfig.
//
// The connector agent sets one of:
//   DENTRIX_EXPORT_PATH   — directory where Dentrix exports CSV files
//   DENTRIX_API_KEY       — API key (Enterprise tier only)
//   DENTRIX_API_URL       — API base URL (Enterprise tier only)
//
// Current status: STUB — returns deterministic demo data seeded from practiceId.
// Replace fetchSnapshot() body with real CSV parsing once connector is ready.

import type { PmsAdapter, PmsAdapterContext, PracticeHealthRaw } from './types'

function seed(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return Math.abs(h) / 2147483647
}

function rng(practiceId: string, key: string, min: number, max: number): number {
  const v = seed(practiceId + 'dentrix_' + key)
  return min + v * (max - min)
}

export const dentrixAdapter: PmsAdapter = {
  pmsType: 'dentrix',

  async fetchSnapshot({ practiceId }: PmsAdapterContext): Promise<PracticeHealthRaw> {
    // TODO: replace with real Dentrix data extraction
    //
    // CSV approach (Phase 5a):
    //   const exportPath = context.connectionConfig['DENTRIX_EXPORT_PATH']
    //   const retention  = await parseDentrixCsv(exportPath, 'Continuing Patient Retention.csv')
    //   const production = await parseDentrixCsv(exportPath, 'Practice Production.csv')
    //   ...
    //
    // API approach (Phase 5b, Enterprise):
    //   const apiKey = context.connectionConfig['DENTRIX_API_KEY']
    //   const apiUrl = context.connectionConfig['DENTRIX_API_URL']
    //   const data = await fetchDentrixApi(apiUrl, apiKey, '/reports/practice-health')
    //
    return {
      patientRetentionRate: rng(practiceId, 'retention', 0.80, 0.97),
      newPatientsCount:     Math.round(rng(practiceId, 'new_pts', 10, 50)),
      reactivationValue:    Math.round(rng(practiceId, 'react_val', 20000, 110000) / 100) * 100,
      noShowRate:           rng(practiceId, 'noshow', 0.05, 0.18),
      recareRate:           rng(practiceId, 'recare', 0.52, 0.90),
      unscheduledTxValue:   Math.round(rng(practiceId, 'unsched', 100000, 900000) / 1000) * 1000,
      collectionRate:       rng(practiceId, 'collect', 0.87, 0.98),
      daysInAr:             rng(practiceId, 'ar', 24, 62),
      denialRate:           rng(practiceId, 'deny', 0.02, 0.13),
    }
  },
}
