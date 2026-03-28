// POST /api/health/refresh
// Triggers a fresh health snapshot for the current user's practice.
// Called from the dashboard "Refresh" button and the daily cron.

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { eq, and } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db, schema } from '@/lib/db'
import { getAdapter } from '@/lib/pms'
import { calculateHealth } from '@/lib/health'

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const database = db()

  // Load practice
  const [practice] = await database
    .select()
    .from(schema.practices)
    .where(eq(schema.practices.ownerId, session.user.id))
    .limit(1)

  if (!practice) {
    return NextResponse.json({ error: 'No practice found' }, { status: 404 })
  }

  if (!practice.pmsType) {
    return NextResponse.json({ error: 'No PMS connected' }, { status: 400 })
  }

  const adapter = getAdapter(practice.pmsType)
  if (!adapter) {
    return NextResponse.json({ error: `No adapter for PMS: ${practice.pmsType}` }, { status: 400 })
  }

  // Fetch raw metrics from PMS adapter
  const raw = await adapter.fetchSnapshot({
    practiceId: practice.id,
    connectionConfig: {}, // connection details would come from a secure store
  })

  // Calculate pillar scores
  const result = calculateHealth(raw)

  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

  // Upsert today's snapshot (one per practice per day)
  const existing = await database
    .select({ id: schema.healthSnapshots.id })
    .from(schema.healthSnapshots)
    .where(
      and(
        eq(schema.healthSnapshots.practiceId, practice.id),
        eq(schema.healthSnapshots.snapshotDate, today),
      ),
    )
    .limit(1)

  const snapshotData = {
    practiceId: practice.id,
    snapshotDate: today,
    // Patients
    patientRetentionRate: result.patients.retentionRate,
    newPatientsCount: result.patients.newPatientsCount,
    reactivationValue: result.patients.reactivationValue,
    patientScore: result.patients.score,
    patientStatus: result.patients.status,
    // Scheduling
    noShowRate: result.scheduling.noShowRate,
    recareRate: result.scheduling.recareRate,
    unscheduledTxValue: result.scheduling.unscheduledTxValue,
    schedulingScore: result.scheduling.score,
    schedulingStatus: result.scheduling.status,
    // Collections
    collectionRate: result.collections.collectionRate,
    daysInAr: result.collections.daysInAr,
    denialRate: result.collections.denialRate,
    collectionsScore: result.collections.score,
    collectionsStatus: result.collections.status,
  }

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

  return NextResponse.json({ ok: true, result })
}
