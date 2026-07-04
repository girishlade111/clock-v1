import { View, StyleSheet } from 'react-native'
import { Button } from '../ui/Button'
import { triggerHaptic } from '../../services/audio'

interface Props {
  isRunning: boolean
  isPaused: boolean
  isCompleted: boolean
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onReset: () => void
  onAddMinute: () => void
}

export function TimerControls({
  isRunning,
  isPaused,
  isCompleted,
  onStart,
  onPause,
  onResume,
  onReset,
  onAddMinute,
}: Props) {
  if (isCompleted) {
    return (
      <View style={styles.container}>
        <Button title="+1 Minute" variant="secondary" size="lg" onPress={() => { triggerHaptic('light'); onAddMinute() }} />
        <Button title="Reset" variant="destructive" size="lg" onPress={() => { triggerHaptic('medium'); onReset() }} />
      </View>
    )
  }

  if (isRunning) {
    return (
      <View style={styles.container}>
        <Button title="Pause" variant="destructive" size="lg" onPress={() => { triggerHaptic('medium'); onPause() }} />
        <Button title="Reset" variant="secondary" size="lg" onPress={() => { triggerHaptic('medium'); onReset() }} />
      </View>
    )
  }

  if (isPaused) {
    return (
      <View style={styles.container}>
        <Button title="Resume" variant="primary" size="lg" onPress={() => { triggerHaptic('light'); onResume() }} />
        <Button title="Reset" variant="secondary" size="lg" onPress={() => { triggerHaptic('medium'); onReset() }} />
      </View>
    )
  }

  return null
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 20,
  },
})
