import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { TIMER_PRESETS } from '../../constants/presets'

interface Props {
  onSelect: (ms: number) => void
}

export function TimerPresets({ onSelect }: Props) {
  const { colors } = useTheme()

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {TIMER_PRESETS.map((preset) => (
        <TouchableOpacity
          key={preset.label}
          onPress={() => onSelect(preset.ms)}
          style={[
            styles.pill,
            { backgroundColor: colors.surfaceSecondary },
          ]}
          activeOpacity={0.7}
        >
          <Text style={[styles.pillText, { color: colors.text }]}>
            {preset.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pillText: {
    fontSize: 15,
    fontWeight: '600',
  },
})
