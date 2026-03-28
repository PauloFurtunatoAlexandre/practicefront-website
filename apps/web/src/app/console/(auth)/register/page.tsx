import type { Metadata } from 'next'
import Link from 'next/link'
import { RegisterForm } from './register-form'

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Sign up for PracticeFront — free for dental practices.',
}

export default function RegisterPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Create your account
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Free for dental practices. No credit card required.
        </p>
      </div>

      <RegisterForm />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/console/login"
          className="font-medium text-primary hover:underline underline-offset-2"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
