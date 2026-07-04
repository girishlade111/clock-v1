import { useEffect } from 'react'
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native'
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { useTheme } from '../../hooks/useTheme'
import { Button } from '../ui/Button'

interface Props {
  visible: boolean
  alarmLabel: string
  onDismiss: () => void
  onSnooze?: () => void
}

export function AlarmCompletionOverlay({
  visible,
  alarmLabel,
  onDismiss,
  onSnooze,
}: Props) {
  const { colors } = useTheme()
  const opacity = useSharedValue(1)

  useEffect(() => {
    if (visible) {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.3, { duration: 500 }),
          withTiming(1, { duration: 500 }),
        ),
        -1,
        true,
      )

      if (Platform.OS !== 'web') {
        Vibration.vibrate([0, 500, 200, 500], true)
      }

      return () => {
        Vibration.cancel()
      }
    }
  }, [visible])

  if (!visible) return null

  return (
    <View style={[styles.overlay, { backgroundColor: colors.background }]}>
      <Animated.View style={[styles.content, { opacity }]}>
        <Text style={styles.emoji}>⏰</Text>
        <Text style={[styles.title, { color: colors.text }]}>Alarm</Text>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {alarmLabel || 'Wake up!'}
        </Text>
      </Animated.View>

      <View style={styles.actions}>
        {onSnooze && (
          <Button
            title="Snooze"
            variant="secondary"
            size="lg"
            onPress={onSnooze}
            style={styles.btn}
          />
        )}
        <Button
          title="Dismiss"
          variant="destructive"
          size="lg"
          onPress={onDismiss}
          style={styles.btn}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    alignItems: 'center',
    marginBottom: 60,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  btn: {
    minWidth: 120,
  },
})
