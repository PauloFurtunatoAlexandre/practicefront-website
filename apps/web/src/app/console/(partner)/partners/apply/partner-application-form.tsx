'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon, CheckIcon } from 'lucide-react'
import { AuthButton } from '@/components/local/auth-ui'

// ─── Step data ─────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    value: 'patients',
    label: 'Patients',
    description: 'Marketing, patient communication, reactivation, membership plans',
  },
  {
    value: 'scheduling',
    label: 'Scheduling',
    description: 'Recall systems, appointment management, no-show reduction',
  },
  {
    value: 'collections',
    label: 'Collections',
    description: 'Billing, RCM, insurance verification, AR management',
  },
]

const SERVICE_TYPES: Record<string, { label: string; value: string }[]> = {
  patients: [
    { value: 'marketing', label: 'Marketing agency' },
    { value: 'membership', label: 'Membership plan provider' },
    { value: 'patient_comms', label: 'Patient communication platform' },
    { value: 'other', label: 'Other' },
  ],
  scheduling: [
    { value: 'scheduling', label: 'Scheduling software / service' },
    { value: 'recall', label: 'Recall system' },
    { value: 'other', label: 'Other' },
  ],
  collections: [
    { value: 'billing', label: 'Dental billing company' },
    { value: 'rcm', label: 'Revenue cycle management' },
    { value: 'insurance', label: 'Insurance verification' },
    { value: 'other', label: 'Other' },
  ],
}

// ─── Slide variants ────────────────────────────────────────────────────────────

const slide = {
  enter: { opacity: 0, x: 32 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PartnerApplicationForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Form state
  const [companyName, setCompanyName] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')
  const [pillar, setPillar] = useState('')
  const [serviceType, setServiceType] = useState('')

  function nextStep() {
    setError('')
    if (step === 0) {
      if (!companyName.trim()) { setError('Company name is required'); return }
    }
    if (step === 1) {
      if (!pillar) { setError('Select a pillar'); return }
      if (!serviceType) { setError('Select a service type'); return }
    }
    setStep((s) => s + 1)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/partners/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, website, description, pillar, serviceType }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Something went wrong'); return }
      // Redirect to Stripe checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        router.push('/console/partners/pending')
      }
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-8">
      {/* Step indicators */}
      <div className="mb-8 flex items-center gap-2">
        {['Company', 'Category', 'Review'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`flex size-6 items-center justify-center rounded-full font-mono text-[10px] font-bold transition-colors ${
              i < step ? 'bg-success text-white' : i === step ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
            }`}>
              {i < step ? <CheckIcon className="size-3" /> : i + 1}
            </div>
            <span className={`font-heading text-xs font-medium ${i === step ? 'text-foreground' : 'text-muted-foreground'}`}>
              {label}
            </span>
            {i < 2 && <div className="mx-1 h-px w-8 bg-border" />}
          </div>
        ))}
      </div>

      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {step === 0 && (
            <motion.div
              key="step-0"
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="space-y-4"
            >
              <div>
                <h2 className="font-heading text-base font-semibold text-foreground">Tell us about your company</h2>
                <p className="mt-1 text-xs text-muted-foreground">This appears on your partner profile.</p>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="companyName" className="block font-heading text-xs font-semibold text-foreground">Company name</label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Sunshine Dental Billing"
                  required
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="website" className="block font-heading text-xs font-semibold text-foreground">
                  Website <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourcompany.com"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="description" className="block font-heading text-xs font-semibold text-foreground">
                  What do you do? <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="We handle all dental billing, insurance verification, and AR follow-up for practices across the Southeast."
                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="space-y-4"
            >
              <div>
                <h2 className="font-heading text-base font-semibold text-foreground">Which pillar do you serve?</h2>
                <p className="mt-1 text-xs text-muted-foreground">This determines where practices see you in their dashboard.</p>
              </div>

              <div className="space-y-2">
                {PILLARS.map(({ value, label, description: desc }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => { setPillar(value); setServiceType('') }}
                    className={`w-full rounded-xl border p-4 text-left transition-colors ${
                      pillar === value
                        ? 'border-primary bg-primary/6'
                        : 'border-border bg-background hover:border-primary/30'
                    }`}
                  >
                    <div className="font-heading text-sm font-semibold text-foreground">{label}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{desc}</div>
                  </button>
                ))}
              </div>

              {pillar && (
                <div className="space-y-1.5">
                  <label htmlFor="serviceType" className="block font-heading text-xs font-semibold text-foreground">
                    Service type
                  </label>
                  <select
                    id="serviceType"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 font-sans text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                  >
                    <option value="">Select…</option>
                    {(SERVICE_TYPES[pillar] ?? []).map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="space-y-4"
            >
              <div>
                <h2 className="font-heading text-base font-semibold text-foreground">Review your application</h2>
                <p className="mt-1 text-xs text-muted-foreground">After submitting, you&apos;ll set up billing via Stripe. No charge until a practice connects.</p>
              </div>

              <div className="space-y-2 rounded-xl bg-secondary/60 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company</span>
                  <span className="font-medium text-foreground">{companyName}</span>
                </div>
                {website && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Website</span>
                    <span className="font-medium text-foreground">{website}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pillar</span>
                  <span className="font-medium capitalize text-foreground">{pillar}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service type</span>
                  <span className="font-medium text-foreground">{serviceType.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between border-t border-border/50 pt-2">
                  <span className="text-muted-foreground">Billing</span>
                  <span className="font-mono font-semibold text-foreground">$25 / practice / month</span>
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground">
                By submitting, you agree to the PracticeFront Partner Terms. You&apos;ll be redirected to Stripe to set up your payment method. Your card is only charged when a practice connects to you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/8 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-xl border border-border px-5 py-3 font-heading text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Back
          </button>
        )}

        {step < 2 ? (
          <button
            type="button"
            onClick={nextStep}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-heading text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Continue
            <ArrowRightIcon className="size-4" />
          </button>
        ) : (
          <div className="flex-1">
            <AuthButton loading={loading}>
              Submit &amp; Set Up Billing
            </AuthButton>
          </div>
        )}
      </div>
    </form>
  )
}
