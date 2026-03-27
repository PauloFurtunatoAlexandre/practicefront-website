import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const formData = body ?? Object.fromEntries(await request.formData())
    const { email } = schema.parse(formData)

    // Integrate with your email provider here
    // Example: Resend audience / Mailchimp / Loops / ConvertKit
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID

    if (RESEND_API_KEY && RESEND_AUDIENCE_ID) {
      const res = await fetch(
        `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, unsubscribed: false }),
        },
      )

      if (!res.ok) {
        const err = await res.json()
        console.error('Resend error:', err)
        return NextResponse.json(
          { error: 'Failed to subscribe. Please try again.' },
          { status: 500 },
        )
      }
    } else {
      // Log for local dev / missing env
      console.log('[Newsletter] Subscriber:', email)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }
    console.error('[Newsletter] Error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
