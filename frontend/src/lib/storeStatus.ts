// Set to true if you need to pause checkout
const FORCE_STORE_PAUSE = true

export function isStorePaused(): boolean {
    return FORCE_STORE_PAUSE
}

export const TRANSITION_PERIOD_LABEL = 'Summer 2026'