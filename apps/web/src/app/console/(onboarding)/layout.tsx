import Link from 'next/link'
import { BlocksLogo } from '@/components/local/blocks-logo'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="flex h-14 items-center justify-between px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5">
          <BlocksLogo size={26} className="text-primary" />
          <span className="font-heading font-bold text-base tracking-tight text-foreground">
            Practice<span className="opacity-35">Front</span>
          </span>
        </Link>
        <span className="font-heading text-xs text-muted-foreground">Setup</span>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        {children}
      </main>
    </div>
  )
}
