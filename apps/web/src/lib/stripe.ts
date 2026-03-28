// ─── Stripe singleton ──────────────────────────────────────────────────────────
// Lazy to avoid build-time crash when STRIPE_SECRET_KEY is not set.

import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY environment variable is not set')
    _stripe = new Stripe(key, { apiVersion: '2026-03-25.dahlia' })
  }
  return _stripe
}

// Price IDs — create these in your Stripe dashboard and set in env
// Price is per-practice per-month (quantity = # connected practices)
export const STRIPE_PARTNER_PRICE_ID =
  process.env.STRIPE_PARTNER_PRICE_ID ?? 'price_partner_per_practice'
