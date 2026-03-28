// POST /api/pms-request
// Stores a "request my PMS" submission from /integrations or the onboarding wizard.
// Inserts a row into pms_requests for the product team to prioritize.

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db, schema } from '@/lib/db'

interface RequestBody {
  email: string
  pmsName: string
  source?: 'integrations' | 'onboarding'
}

export async function POST(request: Request) {
  let body: RequestBody
  try {
    body = await request.json() as RequestBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { email, pmsName, source = 'integrations' } = body

  if (!email || !pmsName) {
    return NextResponse.json({ error: 'email and pmsName are required' }, { status: 422 })
  }

  // Email validation — basic
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 422 })
  }

  // Optionally attach to the logged-in practice
  let practiceId: string | null = null
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (session?.user) {
      const database = db()
      const [practice] = await database
        .select({ id: schema.practices.id })
        .from(schema.practices)
        .where(eq(schema.practices.ownerId, session.user.id))
        .limit(1)
      if (practice) practiceId = practice.id
    }
  } catch {
    // Not authenticated — that's fine, field is optional
  }

  const database = db()
  await database.insert(schema.pmsRequests).values({
    id: crypto.randomUUID(),
    email,
    pmsName: pmsName.trim(),
    practiceId,
    source,
  })

  return NextResponse.json({ ok: true })
}
