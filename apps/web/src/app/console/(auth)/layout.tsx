import Link from 'next/link'
import { BlocksLogo } from '@/components/local/blocks-logo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="flex h-14 items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5 group">
          <BlocksLogo size={26} className="text-primary" />
          <span className="font-heading font-bold text-base tracking-tight text-foreground">
            Practice<span className="opacity-35">Front</span>
          </span>
        </Link>
      </header>

      {/* Centered content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </main>

      {/* Bottom note */}
      <footer className="py-4 text-center">
        <p className="text-xs text-muted-foreground">
          Free for dental practices.{' '}
          <Link href="/pricing" className="underline underline-offset-2 hover:text-foreground transition-colors">
            See how it works
          </Link>
        </p>
      </footer>
    </div>
  )
}
