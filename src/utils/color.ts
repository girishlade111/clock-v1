import { colors } from '../constants/theme'
import type { ThemeMode } from '../types'

export function getColors(mode: ThemeMode): typeof colors.light {
  if (mode === 'system') {
    const prefersDark = false
    return prefersDark ? colors.dark : colors.light
  }
  return mode === 'dark' ? colors.dark : colors.light
}

export function getEffectiveMode(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') {
    return 'dark'
  }
  return mode
}
