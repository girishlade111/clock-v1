import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV({
  id: 'clock-app-storage',
})

const KEYS = {
  ALARMS: 'alarms',
  WORLD_CLOCK_CITIES: 'world_clock_cities',
  SETTINGS: 'settings',
  STOPWATCH_STATE: 'stopwatch_state',
  TIMER_STATE: 'timer_state',
} as const

export function getItem<T>(key: string): T | null {
  const raw = storage.getString(key)
  if (raw == null) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function setItem<T>(key: string, value: T): void {
  storage.set(key, JSON.stringify(value))
}

export function removeItem(key: string): void {
  storage.delete(key)
}

export { KEYS }
