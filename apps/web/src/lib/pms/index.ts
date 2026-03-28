import type { PmsAdapter } from './types'
import { openDentalAdapter } from './opendental'

const ADAPTERS: Record<string, PmsAdapter> = {
  opendental: openDentalAdapter,
}

export function getAdapter(pmsType: string): PmsAdapter | null {
  return ADAPTERS[pmsType] ?? null
}

export type { PmsAdapter, PmsAdapterContext, PracticeHealthRaw } from './types'
