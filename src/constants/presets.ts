export interface TimerPreset {
  label: string
  ms: number
}

export const TIMER_PRESETS: TimerPreset[] = [
  { label: '30s', ms: 30_000 },
  { label: '1m', ms: 60_000 },
  { label: '3m', ms: 180_000 },
  { label: '5m', ms: 300_000 },
  { label: '10m', ms: 600_000 },
  { label: '15m', ms: 900_000 },
  { label: '30m', ms: 1_800_000 },
  { label: '1h', ms: 3_600_000 },
]

export const SNOOZE_OPTIONS = [1, 3, 5, 10, 15] as const

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const
