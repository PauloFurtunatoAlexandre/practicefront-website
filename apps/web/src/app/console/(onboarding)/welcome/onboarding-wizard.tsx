'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, ChevronRightIcon, DatabaseIcon, ActivityIcon, ZapIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AuthButton, AuthError } from '@/components/local/auth-ui'

// ─── Types ────────────────────────────────────────────────────────────────────

type PmsType = 'opendental' | 'dentrix' | 'eaglesoft' | 'curve' | 'other'

interface WizardState {
  practiceName: string
  city: string
  state: string
  pmsType: PmsType | ''
  pmsConnected: boolean
}

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: 'practice',  label: 'Your Practice',  icon: DatabaseIcon },
  { id: 'pms',       label: 'Your Software',  icon: ActivityIcon },
  { id: 'connect',   label: 'Connect',        icon: ZapIcon },
]

const PMS_OPTIONS: { value: PmsType; label: string; live: boolean }[] = [
  { value: 'opendental', label: 'OpenDental',   live: true },
  { value: 'dentrix',    label: 'Dentrix',      live: false },
  { value: 'eaglesoft',  label: 'Eaglesoft',    live: false },
  { value: 'curve',      label: 'Curve Dental', live: false },
  { value: 'other',      label: 'Other',        live: false },
]

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
]

// ─── Slide animation variants ─────────────────────────────────────────────────

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
}

// ─── Wizard ───────────────────────────────────────────────────────────────────

export function OnboardingWizard() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [state, setState] = useState<WizardState>({
    practiceName: '',
    city: '',
    state: '',
    pmsType: '',
    pmsConnected: false,
  })

  function goTo(next: number) {
    setDirection(next > step ? 1 : -1)
    setStep(next)
    setError('')
  }

  function updateState(partial: Partial<WizardState>) {
    setState(prev => ({ ...prev, ...partial }))
  }

  async function handleFinish() {
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      })
      if (!res.ok) throw new Error('Failed to save')
      router.push('/console/dashboard')
    } catch {
      setError('Something went wrong saving your practice. Please try again.')
      setSaving(false)
    }
  }

  return (
    <div>
      {/* Progress stepper */}
      <StepIndicator currentStep={step} steps={STEPS} />

      {/* Animated step content */}
      <div className="relative mt-10 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 340, damping: 34 }}
          >
            {step === 0 && (
              <PracticeStep
                values={state}
                onChange={updateState}
                onNext={() => goTo(1)}
              />
            )}
            {step === 1 && (
              <PmsStep
                selected={state.pmsType}
                onChange={(v) => updateState({ pmsType: v })}
                onBack={() => goTo(0)}
                onNext={() => goTo(2)}
              />
            )}
            {step === 2 && (
              <ConnectStep
                pmsType={state.pmsType}
                connected={state.pmsConnected}
                onConnect={() => updateState({ pmsConnected: true })}
                onBack={() => goTo(1)}
                onFinish={handleFinish}
                saving={saving}
                error={error}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ currentStep, steps }: { currentStep: number; steps: typeof STEPS }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => {
        const done = i < currentStep
        const active = i === currentStep
        const Icon = s.icon
        return (
          <div key={s.id} className="flex items-center gap-2">
            <div className={cn(
              'flex size-8 items-center justify-center rounded-full border text-xs font-semibold transition-all',
              done  ? 'border-success bg-success/10 text-success' : '',
              active ? 'border-primary bg-primary/10 text-primary' : '',
              !done && !active ? 'border-border bg-background text-muted-foreground' : '',
            )}>
              {done ? <CheckIcon className="size-4" /> : <Icon className="size-4" />}
            </div>
            <span className={cn(
              'hidden font-heading text-xs font-medium sm:block',
              active ? 'text-foreground' : 'text-muted-foreground',
            )}>
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground/40" />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Step 1: Practice info ────────────────────────────────────────────────────

function PracticeStep({
  values, onChange, onNext,
}: {
  values: WizardState
  onChange: (v: Partial<WizardState>) => void
  onNext: () => void
}) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!values.practiceName.trim()) return
    onNext()
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
        Tell us about your practice
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This helps us personalize your health scan.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="practiceName" className="block font-heading text-sm font-medium text-foreground">
            Practice name <span className="text-destructive">*</span>
          </label>
          <input
            id="practiceName"
            type="text"
            value={values.practiceName}
            onChange={(e) => onChange({ practiceName: e.target.value })}
            placeholder="Smile Dental Group"
            required
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/60"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="city" className="block font-heading text-sm font-medium text-foreground">
              City
            </label>
            <input
              id="city"
              type="text"
              value={values.city}
              onChange={(e) => onChange({ city: e.target.value })}
              placeholder="Austin"
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/60"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="stateSelect" className="block font-heading text-sm font-medium text-foreground">
              State
            </label>
            <select
              id="stateSelect"
              value={values.state}
              onChange={(e) => onChange({ state: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/60"
            >
              <option value="">Select…</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <AuthButton>Continue</AuthButton>
      </form>
    </div>
  )
}

// ─── Step 2: PMS choice ───────────────────────────────────────────────────────

function PmsStep({
  selected, onChange, onBack, onNext,
}: {
  selected: PmsType | ''
  onChange: (v: PmsType) => void
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
        Which practice management software do you use?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        We&apos;ll connect to it in read-only mode — we can never write to your database.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PMS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'group relative flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all',
              selected === opt.value
                ? 'border-primary bg-primary/6 ring-2 ring-primary/20'
                : 'border-border bg-card hover:border-primary/40 hover:bg-accent/40',
            )}
          >
            <span className={cn(
              'font-heading text-sm font-semibold',
              selected === opt.value ? 'text-primary' : 'text-foreground',
            )}>
              {opt.label}
            </span>
            <span className={cn(
              'rounded-full px-2 py-0.5 font-mono text-[10px] font-medium',
              opt.live
                ? 'bg-success/10 text-success'
                : 'bg-muted text-muted-foreground',
            )}>
              {opt.live ? 'Live' : 'Soon'}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <AuthButton type="button" variant="ghost" onClick={onBack}>
          Back
        </AuthButton>
        <AuthButton
          type="button"
          onClick={onNext}
        >
          Continue
        </AuthButton>
      </div>
    </div>
  )
}

// ─── Step 3: Connect ──────────────────────────────────────────────────────────

function ConnectStep({
  pmsType, connected, onConnect, onBack, onFinish, saving, error,
}: {
  pmsType: PmsType | ''
  connected: boolean
  onConnect: () => void
  onBack: () => void
  onFinish: () => void
  saving: boolean
  error: string
}) {
  const isOpenDental = pmsType === 'opendental'
  const pmsLabel = PMS_OPTIONS.find(p => p.value === pmsType)?.label ?? 'your PMS'
  const isLive = PMS_OPTIONS.find(p => p.value === pmsType)?.live ?? false

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
        Connect {pmsLabel}
      </h2>

      {isLive ? (
        <>
          <p className="mt-2 text-sm text-muted-foreground">
            PracticeFront connects via a read-only local agent. It installs in under 5 minutes and never modifies your data.
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary mt-0.5">
                1
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">Download the connector</p>
                <p className="mt-0.5 text-xs text-muted-foreground">A lightweight agent that runs on your server machine. No patient records leave your network.</p>
                <button
                  type="button"
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-primary/8 px-3 py-1.5 font-heading text-xs font-semibold text-primary hover:bg-primary/15 transition-colors"
                  onClick={() => {/* TODO: trigger download */}}
                >
                  Download for Windows / Mac
                </button>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-start gap-4">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary mt-0.5">
                2
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">Run the installer</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Open the downloaded file on the machine that runs {pmsLabel}. Follow the 3-step setup.</p>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-start gap-4">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary mt-0.5">
                3
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">Confirm connection</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Once the agent is running, click the button below to test the connection.</p>
                <button
                  type="button"
                  onClick={onConnect}
                  className={cn(
                    'mt-2 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-heading text-xs font-semibold transition-colors',
                    connected
                      ? 'bg-success/10 text-success cursor-default'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90',
                  )}
                >
                  {connected ? (
                    <><CheckIcon className="size-3.5" /> Connected!</>
                  ) : (
                    'Test Connection'
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
            <ActivityIcon className="size-5 text-muted-foreground" />
          </div>
          <h3 className="font-heading text-base font-semibold text-foreground">
            {pmsLabel} integration coming soon
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            We&apos;re actively building this integration. You&apos;ll be notified by email as soon as it&apos;s ready.
            In the meantime, you can still set up your dashboard and explore the platform.
          </p>
        </div>
      )}

      {error && <AuthError message={error} />}

      <div className="mt-8 flex gap-3">
        <AuthButton type="button" variant="ghost" onClick={onBack}>
          Back
        </AuthButton>
        <AuthButton type="button" onClick={onFinish} loading={saving}>
          {connected ? 'Run My First Health Scan →' : 'Continue to Dashboard'}
        </AuthButton>
      </div>

      {!connected && isLive && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          You can connect your PMS later from the dashboard settings.
        </p>
      )}
    </div>
  )
}
