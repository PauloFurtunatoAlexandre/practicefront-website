import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined'
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
})

// Convenience re-exports so components import from one place
export const { signIn, signUp, signOut, useSession } = authClient
