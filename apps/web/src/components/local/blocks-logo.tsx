import { cn } from '@/lib/utils'

interface BlocksLogoProps {
  size?: number
  className?: string
}

export function BlocksLogo({ size = 32, className }: BlocksLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={cn(className)}
      aria-hidden="true"
    >
      <rect x="4" y="6" width="38" height="24" rx="4" fill="currentColor" opacity="0.3" />
      <rect x="12" y="18" width="38" height="24" rx="4" fill="currentColor" opacity="0.55" />
      <rect x="20" y="30" width="40" height="28" rx="4" fill="currentColor" opacity="0.9" />
    </svg>
  )
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <BlocksLogo size={28} className="text-primary" />
      <span className="font-heading font-bold text-base tracking-tight text-foreground">
        Practice<span className="opacity-35">Front</span>
      </span>
    </div>
  )
}
