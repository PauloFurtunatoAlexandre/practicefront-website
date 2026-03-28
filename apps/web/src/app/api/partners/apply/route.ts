// POST /api/partners/apply
// Creates the partner record and opens a Stripe Checkout session.
// The partner pays $25/mo per connected practice (quantity = 1 to start,
// updated by webhook as practices connect).

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db, schema } from '@/lib/db'
import { getStripe, STRIPE_PARTNER_PRICE_ID } from '@/lib/stripe'

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { companyName, website, description, pillar, serviceType } = body

  if (!companyName?.trim()) return NextResponse.json({ error: 'Company name is required' }, { status: 400 })
  if (!pillar) return NextResponse.json({ error: 'Pillar is required' }, { status: 400 })
  if (!serviceType) return NextResponse.json({ error: 'Service type is required' }, { status: 400 })

  const database = db()

  // Idempotent — don't create a second partner record for the same user
  const [existing] = await database
    .select()
    .from(schema.partners)
    .where(eq(schema.partners.userId, session.user.id))
    .limit(1)

  let partnerId: string
  let stripeCustomerId: string | null = null

  if (existing) {
    partnerId = existing.id
    stripeCustomerId = existing.stripeCustomerId
  } else {
    partnerId = crypto.randomUUID()
    await database.insert(schema.partners).values({
      id: partnerId,
      userId: session.user.id,
      companyName: companyName.trim(),
      website: website?.trim() || null,
      description: description?.trim() || null,
      pillarCategory: pillar,
      serviceType,
      status: 'pending',
    })
  }

  // Create / reuse Stripe customer
  const stripe = getStripe()

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      name: companyName.trim(),
      email: session.user.email,
      metadata: { partnerId, userId: session.user.id },
    })
    stripeCustomerId = customer.id
    await database
      .update(schema.partners)
      .set({ stripeCustomerId, updatedAt: new Date() })
      .where(eq(schema.partners.id, partnerId))
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  // Create checkout session — subscription starts with quantity 1 (minimum billing unit)
  const checkoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    mode: 'subscription',
    line_items: [{ price: STRIPE_PARTNER_PRICE_ID, quantity: 1 }],
    success_url: `${appUrl}/console/partners/dashboard?activated=1`,
    cancel_url: `${appUrl}/console/partners/apply`,
    metadata: { partnerId },
    subscription_data: {
      metadata: { partnerId },
      trial_period_days: 0,
    },
    allow_promotion_codes: true,
  })

  return NextResponse.json({ checkoutUrl: checkoutSession.url })
}
