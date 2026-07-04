import { useColorScheme } from 'react-native'
import { useThemeStore } from '../stores/themeStore'
import { colors } from '../constants/theme'
import type { ColorScheme } from '../constants/theme'

export function useTheme(): {
  theme: 'light' | 'dark'
  colors: ColorScheme
  isDark: boolean
} {
  const { themeMode } = useThemeStore()
  const systemScheme = useColorScheme()

  const effectiveMode =
    themeMode === 'system'
      ? systemScheme ?? 'dark'
      : themeMode

  const themeColors = effectiveMode === 'dark' ? colors.dark : colors.light

  return {
    theme: effectiveMode,
    colors: themeColors,
    isDark: effectiveMode === 'dark',
  }
}
