import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { Resend } from 'resend'
import { db, schema } from './db'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
}

function createAuth() {
  return betterAuth({
    database: drizzleAdapter(db(), {
      provider: 'pg',
      schema: {
        user: schema.users,
        session: schema.sessions,
        account: schema.accounts,
        verification: schema.verifications,
      },
    }),

    baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
    secret: process.env.BETTER_AUTH_SECRET ?? 'dev-secret-change-in-production',

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      sendResetPassword: async ({ user, url }) => {
        await getResend().emails.send({
          from: 'PracticeFront <noreply@practicefront.com>',
          to: user.email,
          subject: 'Reset your PracticeFront password',
          html: resetPasswordEmail(url),
        })
      },
    },

    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        await getResend().emails.send({
          from: 'PracticeFront <noreply@practicefront.com>',
          to: user.email,
          subject: 'Verify your PracticeFront account',
          html: verifyEmail(url, user.name),
        })
      },
      sendOnSignUp: true,
    },
  })
}

// Lazy singleton — only instantiated on first request, not at module load
let _auth: ReturnType<typeof createAuth> | null = null

export function getAuth() {
  if (!_auth) _auth = createAuth()
  return _auth
}

// Convenience proxy for `auth.api.*` and `auth.$Infer` usage in server code
export const auth = new Proxy({} as ReturnType<typeof createAuth>, {
  get(_, prop) {
    return getAuth()[prop as keyof ReturnType<typeof createAuth>]
  },
})

export type Session = ReturnType<typeof createAuth>['$Infer']['Session']
export type AuthUser = ReturnType<typeof createAuth>['$Infer']['Session']['user']

// ─── Email templates ──────────────────────────────────────────────────────────

function verifyEmail(url: string, name: string) {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, sans-serif; background: #f5f5f7; padding: 40px 20px;">
  <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px; border: 1px solid #e5e7eb;">
    <div style="margin-bottom: 24px;">
      <span style="font-weight: 700; font-size: 18px; color: #1a1a2e;">PracticeFront</span>
    </div>
    <h1 style="font-size: 22px; font-weight: 600; color: #1a1a2e; margin: 0 0 12px;">Verify your email</h1>
    <p style="color: #6b7280; line-height: 1.6; margin: 0 0 24px;">Hi ${name}, click the button below to verify your email and access your practice health dashboard.</p>
    <a href="${url}" style="display: inline-block; background: #3b4fd9; color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">Verify Email</a>
    <p style="color: #9ca3af; font-size: 13px; margin: 24px 0 0;">Link expires in 24 hours. If you didn't sign up, ignore this email.</p>
  </div>
</body>
</html>`
}

function resetPasswordEmail(url: string) {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, sans-serif; background: #f5f5f7; padding: 40px 20px;">
  <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px; border: 1px solid #e5e7eb;">
    <div style="margin-bottom: 24px;">
      <span style="font-weight: 700; font-size: 18px; color: #1a1a2e;">PracticeFront</span>
    </div>
    <h1 style="font-size: 22px; font-weight: 600; color: #1a1a2e; margin: 0 0 12px;">Reset your password</h1>
    <p style="color: #6b7280; line-height: 1.6; margin: 0 0 24px;">Click the button below to set a new password for your PracticeFront account.</p>
    <a href="${url}" style="display: inline-block; background: #3b4fd9; color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">Reset Password</a>
    <p style="color: #9ca3af; font-size: 13px; margin: 24px 0 0;">Link expires in 1 hour. If you didn't request this, ignore this email.</p>
  </div>
</body>
</html>`
}
