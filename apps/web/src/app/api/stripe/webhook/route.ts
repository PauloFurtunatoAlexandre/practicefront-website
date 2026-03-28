// POST /api/stripe/webhook
// Handles Stripe subscription lifecycle events for the partner billing layer.
// Set STRIPE_WEBHOOK_SECRET from the Stripe dashboard → Webhooks → signing secret.
//
// Events handled:
//   checkout.session.completed   → activate partner (status: approved)
//   customer.subscription.deleted → suspend partner

import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { db, schema } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret || !signature) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const database = db()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const partnerId = session.metadata?.partnerId
      if (!partnerId || session.mode !== 'subscription') break

      await database
        .update(schema.partners)
        .set({
          status: 'approved',
          stripeSubscriptionId: session.subscription as string,
          updatedAt: new Date(),
        })
        .where(eq(schema.partners.id, partnerId))
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const partnerId = sub.metadata?.partnerId
      if (!partnerId) break

      await database
        .update(schema.partners)
        .set({ status: 'suspended', stripeSubscriptionId: null, updatedAt: new Date() })
        .where(eq(schema.partners.id, partnerId))

      // Also mark all their practice connections inactive
      await database
        .update(schema.partnerPractices)
        .set({ status: 'inactive' })
        .where(eq(schema.partnerPractices.partnerId, partnerId))
      break
    }

    case 'customer.subscription.updated': {
      // Handle subscription reactivation (e.g. failed payment resolved)
      const sub = event.data.object as Stripe.Subscription
      const partnerId = sub.metadata?.partnerId
      if (!partnerId) break

      if (sub.status === 'active') {
        await database
          .update(schema.partners)
          .set({ status: 'approved', updatedAt: new Date() })
          .where(eq(schema.partners.id, partnerId))
      }
      break
    }

    default:
      break
  }

  return NextResponse.json({ received: true })
}
