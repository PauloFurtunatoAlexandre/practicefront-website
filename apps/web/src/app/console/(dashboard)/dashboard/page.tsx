import type { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'
import { eq, desc } from 'drizzle-orm'
import {
  UsersIcon,
  CalendarIcon,
  CreditCardIcon,
  ArrowRightIcon,
  PlugZapIcon,
  ClockIcon,
  SearchIcon,
} from 'lucide-react'
import { auth } from '@/lib/auth'
import { db, schema } from '@/lib/db'
import type { PillarStatus } from '@/lib/health'
import { PillarCard } from './pillar-card'
import { RefreshButton } from './refresh-button'

export const metadata: Metadata = {
  title: 'Dashboard — PracticeFront',
}

// ─── Formatters ───────────────────────────────────────────────────────────────

function pct(v: number | null | undefined): string {
  if (v == null) return '—'
  return `${(v * 100).toFixed(1)}%`
}

function usd(v: number | null | undefined): string {
  if (v == null) return '—'
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `$${Math.round(v / 1_000)}K`
  return `$${Math.round(v)}`
}

function days(v: number | null | undefined): string {
  if (v == null) return '—'
  return `${v.toFixed(1)} days`
}

// ─── Partner accountability row ────────────────────────────────────────────────

interface PartnerRowProps {
  partner: typeof schema.partners.$inferSelect
  connection: typeof schema.partnerPractices.$inferSelect
}

function PartnerRow({ partner, connection }: PartnerRowProps) {
  const score = connection.performanceScore
  const scoreColor = score == null ? 'text-muted-foreground' : score >= 75 ? 'text-success' : score >= 50 ? 'text-warm' : 'text-destructive'

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-secondary/40 px-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="font-heading text-xs font-semibold text-foreground truncate">
          {partner.companyName}
        </div>
        <div className="mt-0.5 text-[10px] capitalize text-muted-foreground">
          {partner.serviceType.replace(/_/g, ' ')}
        </div>
      </div>
      <div className="text-right">
        <div className={`font-mono text-sm font-bold tabular-nums ${scoreColor}`}>
          {score != null ? score : '—'}
        </div>
        <div className="text-[9px] text-muted-foreground">score</div>
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function ConnectPmsCta() {
  return (
    <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
        <PlugZapIcon className="size-6 text-primary" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-foreground">
        Connect your PMS to see real data
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Takes under 10 minutes. Read-only — we cannot modify your data. Works with
        OpenDental, Dentrix, Eaglesoft, and more.
      </p>
      <Link
        href="/console/welcome"
        className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Connect My PMS
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return null

  let practice: typeof schema.practices.$inferSelect | null = null
  let snapshot: typeof schema.healthSnapshots.$inferSelect | null = null
  // Map pillar → [{partner, connection}]
  type PartnerEntry = { partner: typeof schema.partners.$inferSelect; connection: typeof schema.partnerPractices.$inferSelect }
  const partnersByPillar: Record<string, PartnerEntry[]> = { patients: [], scheduling: [], collections: [] }

  try {
    const database = db()

    const [p] = await database
      .select()
      .from(schema.practices)
      .where(eq(schema.practices.ownerId, session.user.id))
      .limit(1)

    practice = p ?? null

    if (practice) {
      const [s] = await database
        .select()
        .from(schema.healthSnapshots)
        .where(eq(schema.healthSnapshots.practiceId, practice.id))
        .orderBy(desc(schema.healthSnapshots.snapshotDate))
        .limit(1)

      snapshot = s ?? null

      // Load active partner connections for this practice
      const rows = await database
        .select({ partner: schema.partners, connection: schema.partnerPractices })
        .from(schema.partnerPractices)
        .innerJoin(schema.partners, eq(schema.partnerPractices.partnerId, schema.partners.id))
        .where(eq(schema.partnerPractices.practiceId, practice.id))

      for (const row of rows) {
        const pillar = row.connection.pillar
        if (pillar in partnersByPillar) {
          partnersByPillar[pillar].push(row)
        }
      }
    }
  } catch {
    // DB not configured yet — show empty state gracefully
  }

  const practiceConnected = practice?.pmsConnected && practice?.onboardingComplete

  const lastUpdated = snapshot?.createdAt
    ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(snapshot.createdAt))
    : null

  // Pillar config for rendering
  const pillars = [
    {
      key: 'patients',
      label: 'Patients',
      icon: <UsersIcon className="size-4 text-primary" />,
      score: snapshot?.patientScore ?? 0,
      status: (snapshot?.patientStatus ?? 'red') as PillarStatus,
      primaryMetric: pct(snapshot?.patientRetentionRate),
      primaryLabel: 'Retention',
      secondaryMetric: String(snapshot?.newPatientsCount ?? '—'),
      secondaryLabel: 'New / 30 days',
      tertiaryMetric: usd(snapshot?.reactivationValue),
      tertiaryLabel: 'Reactivation $',
      delay: 0,
    },
    {
      key: 'scheduling',
      label: 'Scheduling',
      icon: <CalendarIcon className="size-4 text-warm" />,
      score: snapshot?.schedulingScore ?? 0,
      status: (snapshot?.schedulingStatus ?? 'red') as PillarStatus,
      primaryMetric: pct(snapshot?.noShowRate),
      primaryLabel: 'No-show rate',
      secondaryMetric: pct(snapshot?.recareRate),
      secondaryLabel: 'Recare rate',
      tertiaryMetric: usd(snapshot?.unscheduledTxValue),
      tertiaryLabel: 'Unscheduled TX',
      delay: 0.08,
    },
    {
      key: 'collections',
      label: 'Collections',
      icon: <CreditCardIcon className="size-4 text-[hsl(270,60%,58%)]" />,
      score: snapshot?.collectionsScore ?? 0,
      status: (snapshot?.collectionsStatus ?? 'red') as PillarStatus,
      primaryMetric: pct(snapshot?.collectionRate),
      primaryLabel: 'Collection rate',
      secondaryMetric: days(snapshot?.daysInAr),
      secondaryLabel: 'Days in AR',
      tertiaryMetric: pct(snapshot?.denialRate),
      tertiaryLabel: 'Denial rate',
      delay: 0.16,
    },
  ]

  return (
    <div className="mx-auto max-w-4xl">
      {/* Page header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            {practice?.name ?? 'Your Practice Health'}
          </h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            {lastUpdated ? (
              <>
                <ClockIcon className="size-3.5" aria-hidden="true" />
                Last updated {lastUpdated}
              </>
            ) : (
              'Connect your PMS to see your live Three Pillars health scan.'
            )}
          </p>
        </div>

        {practiceConnected && <RefreshButton />}
      </div>

      {/* Pillar cards + partner accountability */}
      {snapshot !== null ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.key} className="space-y-2">
                <PillarCard
                  label={pillar.label}
                  icon={pillar.icon}
                  score={pillar.score}
                  status={pillar.status}
                  primaryMetric={pillar.primaryMetric}
                  primaryLabel={pillar.primaryLabel}
                  secondaryMetric={pillar.secondaryMetric}
                  secondaryLabel={pillar.secondaryLabel}
                  tertiaryMetric={pillar.tertiaryMetric}
                  tertiaryLabel={pillar.tertiaryLabel}
                  delay={pillar.delay}
                />

                {/* Accountability: show assigned partners below each pillar */}
                {partnersByPillar[pillar.key].length > 0 ? (
                  <div className="space-y-1.5">
                    <p className="px-1 font-heading text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      Assigned Partners
                    </p>
                    {partnersByPillar[pillar.key].map(({ partner, connection }) => (
                      <PartnerRow key={connection.id} partner={partner} connection={connection} />
                    ))}
                  </div>
                ) : (
                  <Link
                    href="/partners"
                    className="flex items-center gap-2 rounded-xl border border-dashed border-border/60 px-4 py-3 text-[11px] text-muted-foreground/60 hover:border-primary/30 hover:text-primary transition-colors"
                  >
                    <SearchIcon className="size-3" />
                    Find a {pillar.label.toLowerCase()} partner
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : practiceConnected ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
            <CalendarIcon className="size-5 text-primary" />
          </div>
          <h3 className="font-heading text-base font-semibold text-foreground">
            First scan in progress
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Your PMS is connected. Your first health scan runs tonight at 6 AM.
          </p>
        </div>
      ) : (
        <ConnectPmsCta />
      )}

      {snapshot?.snapshotDate && (
        <p className="mt-4 text-right font-mono text-[10px] text-muted-foreground/60">
          Snapshot: {snapshot.snapshotDate}
        </p>
      )}
    </div>
  )
}
