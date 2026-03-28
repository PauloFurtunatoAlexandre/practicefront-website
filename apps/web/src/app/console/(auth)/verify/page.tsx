import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Verify Email',
}

export default function VerifyPage() {
  return (
    <div className="text-center">
      <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-primary/10">
        <svg className="size-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      </div>

      <h1 className="font-heading text-xl font-bold tracking-tight text-foreground">
        Check your email
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        We sent you a verification link. Click it to activate your account and access your practice dashboard.
      </p>
      <p className="mt-5 text-xs text-muted-foreground">
        Didn&apos;t receive it?{' '}
        <Link href="/console/register" className="text-primary hover:underline underline-offset-2">
          Try again
        </Link>
        {' '}or check your spam folder.
      </p>
    </div>
  )
}
