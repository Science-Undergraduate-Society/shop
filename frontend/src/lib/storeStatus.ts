const TRANSITION_START = new Date('2026-04-01T00:00:00-07:00')
const TRANSITION_END = new Date('2026-8-01T00:00:00-07:00')

// Set to true if you need to pause checkout outside the scheduled transition dates.
const FORCE_STORE_PAUSE = false

export function isStorePaused(): boolean {
  if (FORCE_STORE_PAUSE) {
    return true
  }

  const now = new Date()

  return now >= TRANSITION_START && now < TRANSITION_END
}

export const TRANSITION_PERIOD_LABEL = 'Summer 2026'