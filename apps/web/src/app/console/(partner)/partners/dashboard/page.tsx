import type { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'
import { eq, desc } from 'drizzle-orm'
import {
  BuildingIcon,
  TrendingUpIcon,
  UsersIcon,
  CreditCardIcon,
  CalendarIcon,
  ArrowRightIcon,
} from 'lucide-react'
import { auth } from '@/lib/auth'
import { db, schema } from '@/lib/db'

export const metadata: Metadata = { title: 'Partner Dashboard — PracticeFront' }

const pillarIcon: Record<string, React.ReactNode> = {
  patients:    <UsersIcon className="size-4 text-primary" />,
  scheduling:  <CalendarIcon className="size-4 text-warm" />,
  collections: <CreditCardIcon className="size-4 text-[hsl(270,60%,58%)]" />,
}

const statusColors = {
  approved:  'bg-success/10 text-success border-success/20',
  pending:   'bg-warm/10 text-warm border-warm/20',
  suspended: 'bg-destructive/10 text-destructive border-destructive/20',
}

function scoreColor(score: number | null): string {
  if (score == null) return 'text-muted-foreground'
  if (score >= 75) return 'text-success'
  if (score >= 50) return 'text-warm'
  return 'text-destructive'
}

export default async function PartnerDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return null

  let partner: typeof schema.partners.$inferSelect | null = null
  let connections: (typeof schema.partnerPractices.$inferSelect & {
    practice: typeof schema.practices.$inferSelect
  })[] = []

  try {
    const database = db()

    const [p] = await database
      .select()
      .from(schema.partners)
      .where(eq(schema.partners.userId, session.user.id))
      .limit(1)

    partner = p ?? null

    if (partner) {
      const rows = await database
        .select({
          pp: schema.partnerPractices,
          practice: schema.practices,
        })
        .from(schema.partnerPractices)
        .innerJoin(schema.practices, eq(schema.partnerPractices.practiceId, schema.practices.id))
        .where(eq(schema.partnerPractices.partnerId, partner.id))
        .orderBy(desc(schema.partnerPractices.createdAt))

      connections = rows.map((r) => ({ ...r.pp, practice: r.practice }))
    }
  } catch {
    // DB not configured yet
  }

  // Not a partner — redirect to apply
  if (!partner) {
    return (
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-6">
        <div className="mx-auto max-w-sm text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
            <BuildingIcon className="size-6 text-primary" />
          </div>
          <h1 className="font-heading text-xl font-bold text-foreground">Not yet a partner</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Apply to join the partner network and become visible in the practices you serve.
          </p>
          <Link
            href="/console/partners/apply"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Apply Now <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    )
  }

  const activeCount = connections.filter((c) => c.status === 'active').length
  const avgScore = connections.length
    ? Math.round(connections.reduce((sum, c) => sum + (c.performanceScore ?? 0), 0) / connections.length)
    : null

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Nav */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/90 px-6 backdrop-blur-sm">
        <Link href="/console/partners/dashboard" className="font-heading font-bold text-sm tracking-tight text-foreground">
          Practice<span className="opacity-35">Front</span>
          <span className="ml-2 font-normal text-muted-foreground">Partner Portal</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/api/auth/sign-out" className="font-heading text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            Sign out
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                {partner.companyName}
              </h1>
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-wide ${statusColors[partner.status as keyof typeof statusColors] ?? statusColors.pending}`}>
                {partner.status}
              </span>
            </div>
            <p className="mt-1 text-sm capitalize text-muted-foreground">
              {partner.pillarCategory} · {partner.serviceType.replace(/_/g, ' ')}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {[
            { label: 'Connected practices', value: String(activeCount), icon: <BuildingIcon className="size-4" /> },
            { label: 'Avg performance score', value: avgScore != null ? `${avgScore}/100` : '—', icon: <TrendingUpIcon className="size-4" /> },
            { label: 'Monthly billing', value: activeCount > 0 ? `$${activeCount * 25}/mo` : '$0/mo', icon: <CreditCardIcon className="size-4" /> },
          ].map(({ label, value, icon }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 text-muted-foreground">{icon}</div>
              <div className="font-mono text-2xl font-bold tabular-nums text-foreground">{value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Pending approval state */}
        {partner.status === 'pending' && (
          <div className="mb-8 rounded-xl border border-warm/30 bg-warm/5 p-5">
            <h2 className="font-heading text-sm font-semibold text-warm">Application under review</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Our team reviews every partner application. You&apos;ll be notified within 1–2 business days.
              Once approved, practices will be able to connect to you.
            </p>
          </div>
        )}

        {/* Connected practices */}
        <div>
          <h2 className="mb-4 font-heading text-base font-semibold text-foreground">
            Connected Practices
          </h2>

          {connections.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
              <BuildingIcon className="mx-auto mb-3 size-8 text-muted-foreground/40" />
              <p className="font-heading text-sm font-medium text-foreground">No practices connected yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Once you&apos;re approved, practices will see you in their dashboard and can connect to you.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {connections.map((conn) => (
                <div
                  key={conn.id}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary/60">
                    {pillarIcon[conn.pillar] ?? <BuildingIcon className="size-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-heading text-sm font-semibold text-foreground truncate">
                      {conn.practice.name}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {conn.practice.city && conn.practice.state
                        ? `${conn.practice.city}, ${conn.practice.state}`
                        : 'Location not set'}
                      {' · '}
                      <span className="capitalize">{conn.pillar}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-mono text-lg font-bold tabular-nums ${scoreColor(conn.performanceScore)}`}>
                      {conn.performanceScore != null ? conn.performanceScore : '—'}
                    </div>
                    <div className="text-[10px] text-muted-foreground">score</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
