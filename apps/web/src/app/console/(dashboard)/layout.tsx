import Link from 'next/link'
import { BlocksLogo } from '@/components/local/blocks-logo'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Top nav */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/90 px-6 backdrop-blur-sm">
        <Link href="/console/dashboard" className="flex items-center gap-2.5">
          <BlocksLogo size={24} className="text-primary" />
          <span className="font-heading font-bold text-sm tracking-tight text-foreground">
            Practice<span className="opacity-35">Front</span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/console/settings"
            className="font-heading text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Settings
          </Link>
          <Link
            href="/api/auth/sign-out"
            className="font-heading text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign out
          </Link>
        </div>
      </header>

      <main className="p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
