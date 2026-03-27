/**
 * Sanity webhook → auto-send newsletter
 *
 * Configure in Sanity:
 *   Dashboard → API → Webhooks
 *   URL: https://yourdomain.com/api/webhook/sanity
 *   Dataset filter: *[_type == "post" && newsletter == true && !defined(newsletterSentAt)]
 *   Trigger: on Create/Update
 *   Secret: set SANITY_WEBHOOK_SECRET env var
 */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'

function verifySignature(body: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(body)
  const digest = hmac.digest('hex')
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
}

interface SanityWebhookPayload {
  _type: string
  _id: string
  title: string
  excerpt: string
  slug: { current: string }
  newsletter: boolean
  newsletterSentAt?: string
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('sanity-webhook-signature') ?? ''
  const secret = process.env.SANITY_WEBHOOK_SECRET ?? ''

  if (secret && !verifySignature(body, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let payload: SanityWebhookPayload
  try {
    payload = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Only send newsletter if flagged and not already sent
  if (!payload.newsletter || payload.newsletterSentAt) {
    return NextResponse.json({ skipped: true })
  }

  try {
    await sendNewsletter({
      title: payload.title,
      excerpt: payload.excerpt,
      slug: payload.slug.current,
      postId: payload._id,
    })

    // Mark as sent in Sanity
    await markNewsletterSent(payload._id)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Newsletter webhook] Error:', err)
    return NextResponse.json({ error: 'Failed to send newsletter' }, { status: 500 })
  }
}

async function sendNewsletter({
  title,
  excerpt,
  slug,
  postId: _postId,
}: {
  title: string
  excerpt: string
  slug: string
  postId: string
}) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://practicefront.com'

  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    console.log('[Newsletter] Missing env vars, skipping send')
    return
  }

  const postUrl = `${BASE_URL}/blog/${slug}`

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #0f1117;">
      <div style="margin-bottom: 24px;">
        <span style="font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #4f51d8;">PracticeFront Blog</span>
      </div>
      <h1 style="font-size: 28px; font-weight: 700; line-height: 1.2; margin: 0 0 16px;">${title}</h1>
      <p style="font-size: 16px; line-height: 1.6; color: #5a5f7a; margin: 0 0 24px;">${excerpt}</p>
      <a href="${postUrl}" style="display: inline-block; background: #4f51d8; color: white; font-weight: 600; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Read the full article →</a>
      <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e8eaf0; font-size: 12px; color: #9ca3af;">
        <p>You're receiving this because you subscribed to PracticeFront blog updates.</p>
        <p><a href="${BASE_URL}/unsubscribe" style="color: #9ca3af;">Unsubscribe</a></p>
      </div>
    </div>
  `

  // Get audience contacts via Resend and send broadcast
  // In production, use Resend Broadcasts API
  const res = await fetch('https://api.resend.com/broadcasts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      audience_id: RESEND_AUDIENCE_ID,
      from: 'PracticeFront <blog@practicefront.com>',
      subject: title,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Resend error: ${JSON.stringify(err)}`)
  }
}

async function markNewsletterSent(postId: string) {
  const token = process.env.SANITY_API_TOKEN
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

  if (!token || !projectId) return

  await fetch(
    `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mutations: [
          {
            patch: {
              id: postId,
              set: { newsletterSentAt: new Date().toISOString() },
            },
          },
        ],
      }),
    },
  )
}
