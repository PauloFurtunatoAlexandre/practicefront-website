import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  // Verify session
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { practiceName, city, state: stateAbbr, pmsType, pmsConnected } = body

  if (!practiceName?.trim()) {
    return NextResponse.json({ error: 'Practice name is required' }, { status: 400 })
  }

  const database = db()

  // Upsert practice record
  const existing = await database
    .select()
    .from(schema.practices)
    .where(eq(schema.practices.ownerId, session.user.id))
    .limit(1)

  if (existing.length > 0) {
    await database
      .update(schema.practices)
      .set({
        name: practiceName.trim(),
        city: city?.trim() || null,
        state: stateAbbr || null,
        pmsType: pmsType || null,
        pmsConnected: Boolean(pmsConnected),
        onboardingComplete: true,
        updatedAt: new Date(),
      })
      .where(eq(schema.practices.ownerId, session.user.id))
  } else {
    await database.insert(schema.practices).values({
      id: crypto.randomUUID(),
      ownerId: session.user.id,
      name: practiceName.trim(),
      city: city?.trim() || null,
      state: stateAbbr || null,
      pmsType: pmsType || null,
      pmsConnected: Boolean(pmsConnected),
      onboardingStep: 3,
      onboardingComplete: true,
    })
  }

  return NextResponse.json({ ok: true })
}
