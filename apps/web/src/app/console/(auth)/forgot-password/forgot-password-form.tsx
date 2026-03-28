'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { AuthField, AuthButton, AuthError } from '@/components/local/auth-ui'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await authClient.requestPasswordReset({
      email,
      redirectTo: '/console/reset-password',
    })

    setLoading(false)

    if (result.error) {
      setError(result.error.message ?? 'Something went wrong. Please try again.')
      return
    }

    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <p className="font-heading text-sm font-semibold text-foreground">Reset link sent!</p>
        <p className="mt-2 text-sm text-muted-foreground">
          If <strong className="text-foreground">{email}</strong> is registered, you&apos;ll receive a password reset link within a minute.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AuthField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@yourpractice.com"
        autoComplete="email"
        required
      />

      {error && <AuthError message={error} />}

      <AuthButton loading={loading}>Send Reset Link</AuthButton>
    </form>
  )
}
