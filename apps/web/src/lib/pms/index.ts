import type { PmsAdapter } from './types'
import { openDentalAdapter } from './opendental'
import { dentrixAdapter } from './dentrix'
import { eaglesoftAdapter } from './eaglesoft'

const ADAPTERS: Record<string, PmsAdapter> = {
  opendental: openDentalAdapter,
  dentrix:    dentrixAdapter,
  eaglesoft:  eaglesoftAdapter,
}

export function getAdapter(pmsType: string): PmsAdapter | null {
  return ADAPTERS[pmsType] ?? null
}

export type { PmsAdapter, PmsAdapterContext, PracticeHealthRaw } from './types'
