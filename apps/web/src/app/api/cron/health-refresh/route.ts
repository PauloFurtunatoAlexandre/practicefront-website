// GET /api/cron/health-refresh
// Vercel Cron endpoint — runs daily to refresh health snapshots for all
// practices that have a connected PMS.
//
// Register in vercel.json:
//   { "crons": [{ "path": "/api/cron/health-refresh", "schedule": "0 6 * * *" }] }
//
// Protected by CRON_SECRET — Vercel sets the Authorization header automatically.

import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db, schema } from '@/lib/db'
import { getAdapter } from '@/lib/pms'
import { calculateHealth } from '@/lib/health'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  // Verify cron secret (Vercel sets this automatically in production)
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const database = db()
  const today = new Date().toISOString().slice(0, 10)

  // Fetch all connected practices
  const connectedPractices = await database
    .select()
    .from(schema.practices)
    .where(eq(schema.practices.pmsConnected, true))

  let refreshed = 0
  let failed = 0

  for (const practice of connectedPractices) {
    if (!practice.pmsType) continue

    const adapter = getAdapter(practice.pmsType)
    if (!adapter) continue

    try {
      const raw = await adapter.fetchSnapshot({
        practiceId: practice.id,
        connectionConfig: {},
      })

      const result = calculateHealth(raw)

      const snapshotData = {
        practiceId: practice.id,
        snapshotDate: today,
        patientRetentionRate: result.patients.retentionRate,
        newPatientsCount: result.patients.newPatientsCount,
        reactivationValue: result.patients.reactivationValue,
        patientScore: result.patients.score,
        patientStatus: result.patients.status,
        noShowRate: result.scheduling.noShowRate,
        recareRate: result.scheduling.recareRate,
        unscheduledTxValue: result.scheduling.unscheduledTxValue,
        schedulingScore: result.scheduling.score,
        schedulingStatus: result.scheduling.status,
        collectionRate: result.collections.collectionRate,
        daysInAr: result.collections.daysInAr,
        denialRate: result.collections.denialRate,
        collectionsScore: result.collections.score,
        collectionsStatus: result.collections.status,
      }

      // Check if today's snapshot already exists
      const existing = await database
        .select({ id: schema.healthSnapshots.id })
        .from(schema.healthSnapshots)
        .where(eq(schema.healthSnapshots.practiceId, practice.id))
        .limit(1)

      if (existing.length > 0) {
        await database
          .update(schema.healthSnapshots)
          .set(snapshotData)
          .where(eq(schema.healthSnapshots.id, existing[0].id))
      } else {
        await database
          .insert(schema.healthSnapshots)
          .values({ id: crypto.randomUUID(), ...snapshotData })
      }

      refreshed++
    } catch {
      failed++
    }
  }

  return NextResponse.json({
    ok: true,
    date: today,
    total: connectedPractices.length,
    refreshed,
    failed,
  })
}
