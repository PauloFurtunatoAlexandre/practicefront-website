import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Lazy singleton — client is created on first use, not at module load
// This prevents build-time crashes when DATABASE_URL is not set
let _db: ReturnType<typeof drizzle> | null = null

export function db() {
  if (!_db) {
    const url = process.env.DATABASE_URL
    if (!url) throw new Error('DATABASE_URL environment variable is not set')
    const client = postgres(url, { max: 10 })
    _db = drizzle(client, { schema })
  }
  return _db
}

export { schema }
