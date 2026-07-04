import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { CircularProgress } from './CircularProgress'

interface Props {
  displayTime: string
  progress: number
  isCompleted: boolean
}

export function TimerDisplay({ displayTime, progress, isCompleted }: Props) {
  const { colors } = useTheme()

  if (isCompleted) {
    return (
      <View style={styles.container}>
        <Text style={[styles.completedText, { color: colors.primary }]}>
          Time's Up!
        </Text>
        <Text style={[styles.time, { color: colors.text }]}>00:00</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.ringContainer}>
        <CircularProgress progress={progress} displayTime={displayTime} />
        <View style={styles.overlay}>
          <Text
            style={[styles.time, { color: colors.text }]}
            accessibilityLabel={`Timer: ${displayTime}`}
          >
            {displayTime}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 48,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
    letterSpacing: 1,
  },
  completedText: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
  },
})
