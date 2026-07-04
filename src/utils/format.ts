import type { TimeFormat12H } from '../types'

export function formatTime(
  date: Date,
  format: TimeFormat12H = '24h',
  timezone?: string,
): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...(format === '12h' ? { hour12: true } : { hour12: false }),
    ...(timezone ? { timeZone: timezone } : {}),
  }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export function formatTimeWithSeconds(
  date: Date,
  format: TimeFormat12H = '24h',
  timezone?: string,
): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    ...(format === '12h' ? { hour12: true } : { hour12: false }),
    ...(timezone ? { timeZone: timezone } : {}),
  }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export function formatMilliseconds(ms: number): string {
  const totalMs = Math.max(0, Math.floor(ms))
  const minutes = Math.floor(totalMs / 60000)
  const seconds = Math.floor((totalMs % 60000) / 1000)
  const millis = Math.floor((totalMs % 1000) / 10)
  const pad = (n: number, d: number) => n.toString().padStart(d, '0')
  return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(millis, 2)}`
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00'
  const totalSec = Math.ceil(ms / 1000)
  const hours = Math.floor(totalSec / 3600)
  const mins = Math.floor((totalSec % 3600) / 60)
  const secs = totalSec % 60
  const pad = (n: number) => n.toString().padStart(2, '0')
  if (hours > 0) return `${pad(hours)}:${pad(mins)}:${pad(secs)}`
  return `${pad(mins)}:${pad(secs)}`
}

export function formatAlarmTime(hour: number, minute: number, format: TimeFormat12H = '12h'): string {
  if (format === '12h') {
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const h12 = hour % 12 || 12
    return `${h12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`
  }
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

export function formatLapTime(ms: number): string {
  const totalMs = Math.max(0, Math.floor(ms))
  const minutes = Math.floor(totalMs / 60000)
  const seconds = Math.floor((totalMs % 60000) / 1000)
  const millis = Math.floor((totalMs % 1000) / 10)
  const pad = (n: number, d: number) => n.toString().padStart(d, '0')
  return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(millis, 2)}`
}
