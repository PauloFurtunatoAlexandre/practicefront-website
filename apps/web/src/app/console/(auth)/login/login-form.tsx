'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from '@/lib/auth-client'
import { AuthField, AuthButton, AuthError } from '@/components/local/auth-ui'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn.email({
      email,
      password,
      callbackURL: '/console/dashboard',
    })

    setLoading(false)

    if (result.error) {
      const msg = result.error.message ?? ''
      if (msg.toLowerCase().includes('verify')) {
        setError('Please verify your email before signing in. Check your inbox.')
      } else if (msg.toLowerCase().includes('invalid')) {
        setError('Email or password is incorrect.')
      } else {
        setError(msg || 'Something went wrong. Please try again.')
      }
      return
    }

    router.push('/console/dashboard')
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

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block font-heading text-sm font-medium text-foreground">
            Password
          </label>
          <Link
            href="/console/forgot-password"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          autoComplete="current-password"
          required
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/60 transition-shadow"
        />
      </div>

      {error && <AuthError message={error} />}

      <AuthButton loading={loading}>Sign In</AuthButton>
    </form>
  )
}
