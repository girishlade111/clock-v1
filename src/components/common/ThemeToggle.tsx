import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { useThemeStore } from '../../stores/themeStore'
import type { ThemeMode } from '../../types'

export function ThemeToggle() {
  const { colors } = useTheme()
  const { themeMode, setThemeMode } = useThemeStore()

  const modes: { label: string; value: ThemeMode }[] = [
    { label: '☀️ Light', value: 'light' },
    { label: '🌙 Dark', value: 'dark' },
    { label: '📱 System', value: 'system' },
  ]

  return (
    <View style={styles.container}>
      {modes.map((mode) => (
        <TouchableOpacity
          key={mode.value}
          onPress={() => setThemeMode(mode.value)}
          style={[
            styles.pill,
            {
              backgroundColor:
                themeMode === mode.value ? colors.primary : colors.surfaceSecondary,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: themeMode === mode.value ? '#FFFFFF' : colors.text,
              },
            ]}
          >
            {mode.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
})
