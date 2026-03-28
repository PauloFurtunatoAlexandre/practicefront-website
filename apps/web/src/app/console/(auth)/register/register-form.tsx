'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/auth-client'
import { AuthField, AuthButton, AuthError } from '@/components/local/auth-ui'

export function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signUp.email({
      name,
      email,
      password,
      callbackURL: '/console/welcome',
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
        <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-success/10 text-success">
          ✓
        </div>
        <h2 className="font-heading text-lg font-semibold text-foreground">Check your email</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We sent a verification link to <strong className="text-foreground">{email}</strong>.
          Click it to activate your account.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AuthField
        id="name"
        label="Your name"
        type="text"
        value={name}
        onChange={setName}
        placeholder="Dr. Jane Smith"
        autoComplete="name"
        required
      />
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
      <AuthField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="At least 8 characters"
        autoComplete="new-password"
        required
        minLength={8}
      />

      {error && <AuthError message={error} />}

      <AuthButton loading={loading}>Create Account</AuthButton>

      <p className="text-center text-[11px] text-muted-foreground">
        By signing up you agree to our{' '}
        <a href="/terms" className="underline underline-offset-2">Terms</a>
        {' '}and{' '}
        <a href="/privacy" className="underline underline-offset-2">Privacy Policy</a>.
      </p>
    </form>
  )
}
