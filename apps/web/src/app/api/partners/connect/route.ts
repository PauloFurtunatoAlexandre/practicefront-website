// POST /api/partners/connect
// A practice owner connects a partner to one of their pillars.
// Updates Stripe subscription quantity to reflect new connected practice count.

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { eq, and, count } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db, schema } from '@/lib/db'
import { getStripe } from '@/lib/stripe'

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { partnerId, pillar } = await request.json()
  if (!partnerId || !pillar) {
    return NextResponse.json({ error: 'partnerId and pillar are required' }, { status: 400 })
  }

  const database = db()

  // Find the practice for this user
  const [practice] = await database
    .select()
    .from(schema.practices)
    .where(eq(schema.practices.ownerId, session.user.id))
    .limit(1)

  if (!practice) return NextResponse.json({ error: 'No practice found' }, { status: 404 })

  // Verify partner is approved
  const [partner] = await database
    .select()
    .from(schema.partners)
    .where(eq(schema.partners.id, partnerId))
    .limit(1)

  if (!partner || partner.status !== 'approved') {
    return NextResponse.json({ error: 'Partner not found or not approved' }, { status: 400 })
  }

  // Idempotent insert
  const [existing] = await database
    .select()
    .from(schema.partnerPractices)
    .where(
      and(
        eq(schema.partnerPractices.partnerId, partnerId),
        eq(schema.partnerPractices.practiceId, practice.id),
      ),
    )
    .limit(1)

  if (!existing) {
    await database.insert(schema.partnerPractices).values({
      id: crypto.randomUUID(),
      partnerId,
      practiceId: practice.id,
      pillar,
      status: 'active',
    })

    // Update Stripe subscription quantity if partner has an active subscription
    if (partner.stripeSubscriptionId) {
      try {
        const stripe = getStripe()
        const [{ count: activeCount }] = await database
          .select({ count: count() })
          .from(schema.partnerPractices)
          .where(
            and(
              eq(schema.partnerPractices.partnerId, partnerId),
              eq(schema.partnerPractices.status, 'active'),
            ),
          )

        const subscription = await stripe.subscriptions.retrieve(partner.stripeSubscriptionId)
        const itemId = subscription.items.data[0]?.id
        if (itemId) {
          await stripe.subscriptions.update(partner.stripeSubscriptionId, {
            items: [{ id: itemId, quantity: Number(activeCount) }],
            proration_behavior: 'create_prorations',
          })
        }
      } catch {
        // Don't fail the connection if Stripe update fails — handle via webhook reconciliation
      }
    }
  }

  return NextResponse.json({ ok: true })
}
