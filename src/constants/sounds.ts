export const ALARM_SOUNDS = [
  { key: 'default', label: 'Radar', file: 'alarm-default.mp3' },
  { key: 'gentle', label: 'Gentle', file: 'alarm-gentle.mp3' },
  { key: 'marimba', label: 'Marimba', file: 'alarm-marimba.mp3' },
  { key: 'bell', label: 'Bell', file: 'alarm-bell.mp3' },
] as const

export type AlarmSoundKey = (typeof ALARM_SOUNDS)[number]['key']
