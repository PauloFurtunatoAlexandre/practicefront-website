// ─── Eaglesoft PMS adapter ─────────────────────────────────────────────────────
// Eaglesoft (Patterson Dental) stores data in SQL Server / MSDE on Windows.
// The connector agent connects via ODBC or a direct SQL Server client using
// read-only credentials provisioned by the practice's IT admin.
//
// Real implementation — SQL queries against Eaglesoft's schema:
//
//   Patient retention:
//     SELECT COUNT(*) FROM patient
//       WHERE last_visit >= DATEADD(month, -12, GETDATE())   -- retained
//     SELECT COUNT(*) FROM patient
//       WHERE first_visit >= DATEADD(month, -1, GETDATE())   -- new this month
//
//   Reactivation value:
//     SELECT COUNT(*), SUM(outstanding_balance) FROM patient
//       WHERE last_visit < DATEADD(month, -18, GETDATE())
//       AND status = 'A'
//
//   No-show rate:
//     SELECT
//       SUM(CASE WHEN status = 'N' THEN 1 ELSE 0 END) AS no_shows,
//       COUNT(*) AS total
//     FROM appointment
//       WHERE appt_date >= DATEADD(day, -30, GETDATE())
//
//   Recare:
//     SELECT
//       SUM(CASE WHEN recare_scheduled = 1 THEN 1 ELSE 0 END) AS scheduled,
//       COUNT(*) AS due
//     FROM patient_recare
//       WHERE due_date <= DATEADD(day, 30, GETDATE())
//
//   Unscheduled treatment:
//     SELECT SUM(fee) FROM treatment_plan_procedure
//       WHERE status = 'TP'   -- treatment planned, not scheduled
//
//   Collections:
//     SELECT SUM(payment_amount), SUM(charge_amount)
//     FROM ledger
//       WHERE entry_date >= DATEADD(month, -1, GETDATE())
//
//   AR days:
//     SELECT SUM(balance) / NULLIF(SUM(charge_amount)/30, 0)
//     FROM patient
//       WHERE balance > 0
//
//   Denial rate:
//     SELECT
//       SUM(CASE WHEN status = 'D' THEN 1 ELSE 0 END) AS denied,
//       COUNT(*) AS total
//     FROM claim
//       WHERE date_submitted >= DATEADD(month, -3, GETDATE())
//
// The connector agent sets these in connectionConfig:
//   EAGLESOFT_SERVER     — SQL Server hostname or IP
//   EAGLESOFT_DATABASE   — database name (usually 'Eaglesoft')
//   EAGLESOFT_USER       — read-only SQL Server user
//   EAGLESOFT_PASSWORD   — password
//   EAGLESOFT_PORT       — defaults to 1433
//
// Current status: STUB — returns deterministic demo data seeded from practiceId.
// Replace fetchSnapshot() body with real SQL queries once connector is ready.

import type { PmsAdapter, PmsAdapterContext, PracticeHealthRaw } from './types'

function seed(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return Math.abs(h) / 2147483647
}

function rng(practiceId: string, key: string, min: number, max: number): number {
  const v = seed(practiceId + 'eaglesoft_' + key)
  return min + v * (max - min)
}

export const eaglesoftAdapter: PmsAdapter = {
  pmsType: 'eaglesoft',

  async fetchSnapshot({ practiceId }: PmsAdapterContext): Promise<PracticeHealthRaw> {
    // TODO: replace with real Eaglesoft SQL queries
    //
    //   const server   = context.connectionConfig['EAGLESOFT_SERVER']
    //   const database = context.connectionConfig['EAGLESOFT_DATABASE']
    //   const user     = context.connectionConfig['EAGLESOFT_USER']
    //   const password = context.connectionConfig['EAGLESOFT_PASSWORD']
    //   const port     = context.connectionConfig['EAGLESOFT_PORT'] ?? '1433'
    //
    //   const sql = await connectSqlServer({ server, database, user, password, port })
    //   const [retention] = await sql.query`
    //     SELECT
    //       SUM(CASE WHEN last_visit >= DATEADD(month,-12,GETDATE()) THEN 1 ELSE 0 END) as retained,
    //       COUNT(*) as total
    //     FROM patient WHERE status = 'A'
    //   `
    //   ...
    //
    return {
      patientRetentionRate: rng(practiceId, 'retention', 0.81, 0.96),
      newPatientsCount:     Math.round(rng(practiceId, 'new_pts', 11, 48)),
      reactivationValue:    Math.round(rng(practiceId, 'react_val', 22000, 105000) / 100) * 100,
      noShowRate:           rng(practiceId, 'noshow', 0.04, 0.17),
      recareRate:           rng(practiceId, 'recare', 0.54, 0.91),
      unscheduledTxValue:   Math.round(rng(practiceId, 'unsched', 115000, 920000) / 1000) * 1000,
      collectionRate:       rng(practiceId, 'collect', 0.86, 0.99),
      daysInAr:             rng(practiceId, 'ar', 21, 60),
      denialRate:           rng(practiceId, 'deny', 0.02, 0.12),
    }
  },
}
