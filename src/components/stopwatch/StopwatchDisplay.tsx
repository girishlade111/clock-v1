import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../hooks/useTheme'

interface Props {
  displayTime: string
}

export function StopwatchDisplay({ displayTime }: Props) {
  const { colors } = useTheme()

  const parts = displayTime.split('.')
  const main = parts[0]
  const millis = parts[1] || '00'

  return (
    <View style={styles.container}>
      <Text style={[styles.mainTime, { color: colors.text }]} accessibilityLabel={`Stopwatch: ${main} seconds and ${millis} milliseconds`}>
        {main}
        <Text style={[styles.millis, { color: colors.textSecondary }]}>
          .{millis}
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  mainTime: {
    fontSize: 64,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
    letterSpacing: 1,
  },
  millis: {
    fontSize: 36,
    fontWeight: '300',
  },
})
