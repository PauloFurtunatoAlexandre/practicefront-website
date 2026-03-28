import { pgTable, text, timestamp, boolean, integer, real, index } from 'drizzle-orm/pg-core'

// ─── Auth tables (required by better-auth) ────────────────────────────────────

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// ─── PracticeFront domain tables ──────────────────────────────────────────────

export const practices = pgTable('practices', {
  id: text('id').primaryKey(),
  ownerId: text('owner_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  city: text('city'),
  state: text('state'),
  pmsType: text('pms_type'), // 'opendental' | 'dentrix' | 'eaglesoft' | 'curve' | 'other'
  pmsConnected: boolean('pms_connected').notNull().default(false),
  onboardingStep: integer('onboarding_step').notNull().default(0),
  onboardingComplete: boolean('onboarding_complete').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// ─── Health snapshots ──────────────────────────────────────────────────────────
// One row per practice per day. Stores computed pillar scores + raw metrics.

export const healthSnapshots = pgTable('health_snapshots', {
  id: text('id').primaryKey(),
  practiceId: text('practice_id')
    .notNull()
    .references(() => practices.id, { onDelete: 'cascade' }),
  snapshotDate: text('snapshot_date').notNull(), // YYYY-MM-DD

  // ── Patients pillar ─────────────────────────────────────────────────────────
  patientRetentionRate: real('patient_retention_rate'),  // 0–1
  newPatientsCount: integer('new_patients_count'),
  reactivationValue: real('reactivation_value'),         // USD
  patientScore: integer('patient_score'),                // 0–100
  patientStatus: text('patient_status'),                 // 'green' | 'yellow' | 'red'

  // ── Scheduling pillar ───────────────────────────────────────────────────────
  noShowRate: real('no_show_rate'),                      // 0–1
  recareRate: real('recare_rate'),                       // 0–1
  unscheduledTxValue: real('unscheduled_tx_value'),      // USD
  schedulingScore: integer('scheduling_score'),
  schedulingStatus: text('scheduling_status'),

  // ── Collections pillar ──────────────────────────────────────────────────────
  collectionRate: real('collection_rate'),               // 0–1
  daysInAr: real('days_in_ar'),
  denialRate: real('denial_rate'),                       // 0–1
  collectionsScore: integer('collections_score'),
  collectionsStatus: text('collections_status'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ─── Partner tables ────────────────────────────────────────────────────────────

// A partner is a dental service provider (billing co., marketing agency, etc.)
// who pays PracticeFront per connected practice.
export const partners = pgTable('partners', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  companyName: text('company_name').notNull(),
  website: text('website'),
  // Which pillar this partner primarily serves
  pillarCategory: text('pillar_category').notNull(), // 'patients' | 'scheduling' | 'collections'
  // What type of service they provide
  serviceType: text('service_type').notNull(),       // 'billing' | 'marketing' | 'membership' | 'scheduling' | 'other'
  description: text('description'),
  // Application / subscription status
  status: text('status').notNull().default('pending'), // 'pending' | 'approved' | 'suspended'
  // Stripe
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (t) => [
  index('partners_user_idx').on(t.userId),
  index('partners_status_idx').on(t.status),
])

// Junction: which practices a partner is connected to (and their performance score)
export const partnerPractices = pgTable('partner_practices', {
  id: text('id').primaryKey(),
  partnerId: text('partner_id')
    .notNull()
    .references(() => partners.id, { onDelete: 'cascade' }),
  practiceId: text('practice_id')
    .notNull()
    .references(() => practices.id, { onDelete: 'cascade' }),
  pillar: text('pillar').notNull(),         // 'patients' | 'scheduling' | 'collections'
  status: text('status').notNull().default('active'), // 'active' | 'inactive'
  performanceScore: integer('performance_score'), // 0–100, null until first snapshot
  lastScoredAt: timestamp('last_scored_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => [
  index('pp_partner_idx').on(t.partnerId),
  index('pp_practice_idx').on(t.practiceId),
])

export type User = typeof users.$inferSelect
export type Practice = typeof practices.$inferSelect
export type HealthSnapshot = typeof healthSnapshots.$inferSelect
export type Partner = typeof partners.$inferSelect
export type PartnerPractice = typeof partnerPractices.$inferSelect
