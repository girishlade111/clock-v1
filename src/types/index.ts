export type TimeFormat12H = '12h' | '24h'

export interface ClockState {
  now: Date
  timeFormat: TimeFormat12H
  showAnalog: boolean
  smoothSecondHand: boolean
}

export interface TimezoneCity {
  id: string
  name: string
  country: string
  continent: string
  timezoneName: string
}

export interface WorldClockState {
  cities: TimezoneCity[]
}

export interface StopwatchState {
  status: 'idle' | 'running' | 'paused'
  startTimestamp: number
  accumulatedMs: number
  laps: LapEntry[]
}

export interface LapEntry {
  id: number
  lapMs: number
  splitMs: number
}

export interface TimerState {
  status: 'idle' | 'running' | 'paused' | 'completed'
  totalMs: number
  remainingMs: number
  endTimestamp: number
}

export interface Alarm {
  id: string
  label: string
  hour: number
  minute: number
  enabled: boolean
  repeatType: RepeatType
  repeatDays: number[]
  snoozeMinutes: number
  sound: string
}

export type RepeatType = 'once' | 'daily' | 'weekdays' | 'weekends' | 'custom'

export interface AlarmState {
  alarms: Alarm[]
  firingAlarmId: string | null
}

export type ThemeMode = 'light' | 'dark' | 'system'

export interface SettingsState {
  themeMode: ThemeMode
  timeFormat: TimeFormat12H
  showAnalog: boolean
  smoothSecondHand: boolean
}
