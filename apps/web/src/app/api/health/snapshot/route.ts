// GET /api/health/snapshot
// Returns the latest health snapshot for the current user's practice.

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { eq, desc } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db, schema } from '@/lib/db'

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const database = db()

  const [practice] = await database
    .select()
    .from(schema.practices)
    .where(eq(schema.practices.ownerId, session.user.id))
    .limit(1)

  if (!practice) {
    return NextResponse.json({ practice: null, snapshot: null })
  }

  const [snapshot] = await database
    .select()
    .from(schema.healthSnapshots)
    .where(eq(schema.healthSnapshots.practiceId, practice.id))
    .orderBy(desc(schema.healthSnapshots.snapshotDate))
    .limit(1)

  return NextResponse.json({ practice, snapshot: snapshot ?? null })
}
