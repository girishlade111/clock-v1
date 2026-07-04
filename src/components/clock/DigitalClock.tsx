import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useTheme } from '../../hooks/useTheme'
import { useClockStore } from '../../stores/clockStore'
import type { TimeFormat12H } from '../../types'

interface Props {
  timeString: string
  dateString: string
}

export function DigitalClock({ timeString, dateString }: Props) {
  const { colors } = useTheme()
  const { timeFormat, setTimeFormat } = useClockStore()

  const toggleFormat = () => {
    setTimeFormat(timeFormat === '12h' ? '24h' : '12h')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleFormat} activeOpacity={0.7}>
        <Animated.Text
          entering={FadeIn.duration(300)}
          style={[styles.timeText, { color: colors.text }]}
          accessibilityLabel={`Current time: ${timeString}`}
          accessibilityRole="text"
        >
          {timeString}
        </Animated.Text>
      </TouchableOpacity>
      <Text
        style={[styles.dateText, { color: colors.textSecondary }]}
        accessibilityLabel={dateString}
      >
        {dateString}
      </Text>
      <Text
        style={[styles.formatHint, { color: colors.textTertiary }]}
      >
        Tap time to toggle {timeFormat === '12h' ? '24-hour' : '12-hour'} format
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  timeText: {
    fontSize: 64,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
    letterSpacing: 2,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 17,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  formatHint: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
})
