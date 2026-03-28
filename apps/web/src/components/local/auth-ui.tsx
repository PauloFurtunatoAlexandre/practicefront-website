'use client'

import { cn } from '@/lib/utils'

// ─── Field ────────────────────────────────────────────────────────────────────

interface AuthFieldProps {
  id: string
  label: string
  type: 'text' | 'email' | 'password'
  value: string
  onChange: (v: string) => void
  placeholder?: string
  autoComplete?: string
  required?: boolean
  minLength?: number
}

export function AuthField({
  id, label, type, value, onChange, placeholder, autoComplete, required, minLength,
}: AuthFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block font-heading text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/60 transition-shadow"
      />
    </div>
  )
}

// ─── Button ───────────────────────────────────────────────────────────────────

interface AuthButtonProps {
  loading?: boolean
  children: React.ReactNode
  type?: 'submit' | 'button'
  onClick?: () => void
  variant?: 'primary' | 'ghost'
}

export function AuthButton({
  loading, children, type = 'submit', onClick, variant = 'primary',
}: AuthButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={cn(
        'w-full rounded-xl px-5 py-3 font-heading text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60',
        variant === 'primary'
          ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
          : 'border border-border text-foreground hover:bg-accent',
      )}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Loading…
        </span>
      ) : children}
    </button>
  )
}

// ─── Error ────────────────────────────────────────────────────────────────────

export function AuthError({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-destructive/30 bg-destructive/8 px-4 py-3 text-sm text-destructive">
      {message}
    </div>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────

export function AuthDivider({ label = 'or' }: { label?: string }) {
  return (
    <div className="relative flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-border" />
      <span className="font-heading text-xs text-muted-foreground">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}
