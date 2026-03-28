import type { Metadata } from 'next'
import Link from 'next/link'
import { ClockIcon, CheckIcon } from 'lucide-react'

export const metadata: Metadata = { title: 'Application Submitted — PracticeFront' }

export default function PartnerPendingPage() {
  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-6">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-success/10">
          <CheckIcon className="size-8 text-success" />
        </div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Application submitted
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          We review every partner application manually — usually within 1–2 business days.
          You&apos;ll get an email when you&apos;re approved.
        </p>

        <div className="mt-8 rounded-xl border border-border bg-card p-5 text-left space-y-3">
          {[
            'Application submitted',
            'Manual review (1–2 business days)',
            'Billing activated — practices can now connect to you',
          ].map((step, i) => (
            <div key={step} className="flex items-start gap-3">
              <div className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold ${
                i === 0 ? 'bg-success text-white' : 'bg-secondary text-muted-foreground'
              }`}>
                {i === 0 ? <CheckIcon className="size-3" /> : i + 1}
              </div>
              <span className={`text-sm ${i === 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ClockIcon className="size-3.5" />
          Questions? Email <a href="mailto:partners@practicefront.com" className="text-primary hover:underline">partners@practicefront.com</a>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block font-heading text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to PracticeFront
        </Link>
      </div>
    </div>
  )
}
