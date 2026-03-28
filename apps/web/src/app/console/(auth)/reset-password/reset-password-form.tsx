'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { AuthField, AuthButton, AuthError } from '@/components/local/auth-ui'

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (!token) {
      setError('Invalid or expired reset link. Please request a new one.')
      return
    }

    setLoading(true)

    const result = await authClient.resetPassword({ newPassword: password, token })

    setLoading(false)

    if (result.error) {
      setError(result.error.message ?? 'Something went wrong. Please try again.')
      return
    }

    router.push('/console/login?reset=1')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AuthField
        id="password"
        label="New password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="At least 8 characters"
        autoComplete="new-password"
        required
        minLength={8}
      />
      <AuthField
        id="confirm"
        label="Confirm password"
        type="password"
        value={confirm}
        onChange={setConfirm}
        placeholder="Same password again"
        autoComplete="new-password"
        required
        minLength={8}
      />

      {error && <AuthError message={error} />}

      <AuthButton loading={loading}>Set New Password</AuthButton>
    </form>
  )
}
