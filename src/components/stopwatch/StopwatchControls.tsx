import { View, StyleSheet } from 'react-native'
import { Button } from '../ui/Button'
import { triggerHaptic } from '../../services/audio'

interface Props {
  isRunning: boolean
  isPaused: boolean
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onReset: () => void
  onLap: () => void
}

export function StopwatchControls({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onReset,
  onLap,
}: Props) {
  const handleStart = () => {
    triggerHaptic('light')
    onStart()
  }

  const handlePause = () => {
    triggerHaptic('medium')
    onPause()
  }

  const handleResume = () => {
    triggerHaptic('light')
    onResume()
  }

  const handleLap = () => {
    triggerHaptic('selection')
    onLap()
  }

  const handleReset = () => {
    triggerHaptic('medium')
    onReset()
  }

  if (isRunning) {
    return (
      <View style={styles.container}>
        <Button title="Lap" variant="secondary" size="lg" onPress={handleLap} />
        <Button title="Stop" variant="destructive" size="lg" onPress={handlePause} />
      </View>
    )
  }

  if (isPaused) {
    return (
      <View style={styles.container}>
        <Button title="Reset" variant="secondary" size="lg" onPress={handleReset} />
        <Button title="Resume" variant="primary" size="lg" onPress={handleResume} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ width: 80 }} />
      <Button title="Start" variant="primary" size="lg" onPress={handleStart} />
      <View style={{ width: 80 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
})
