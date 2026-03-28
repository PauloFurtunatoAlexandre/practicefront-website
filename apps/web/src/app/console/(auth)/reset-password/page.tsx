import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ResetPasswordForm } from './reset-password-form'

export const metadata: Metadata = {
  title: 'Set New Password',
}

export default function ResetPasswordPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Set a new password
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Choose a strong password for your account.
        </p>
      </div>

      <Suspense fallback={<div className="h-48 rounded-xl bg-muted/30 animate-pulse" />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}
