import type { Metadata } from 'next'
import { PartnerApplicationForm } from './partner-application-form'

export const metadata: Metadata = {
  title: 'Partner Application — PracticeFront',
  description: 'Apply to join the PracticeFront partner network. Good vendors welcome accountability.',
}

export default function PartnerApplyPage() {
  return (
    <div className="min-h-screen bg-secondary/30 px-4 py-16">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/6 px-4 py-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            Partner Network
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground">
            Good vendors welcome accountability.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            PracticeFront shows practices exactly how their service providers are performing.
            If you&apos;re confident in your work, that&apos;s a competitive advantage.
          </p>
        </div>

        {/* Pricing note */}
        <div className="mb-8 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Cost per connected practice</span>
            <span className="font-mono font-semibold text-foreground">$25 / month</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Revenue share</span>
            <span className="font-mono font-semibold text-success">None — ever</span>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Billing starts only when a practice connects to you. You pay for visibility, not for leads.
          </p>
        </div>

        <PartnerApplicationForm />
      </div>
    </div>
  )
}
