import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../hooks/useTheme'
import { useStopwatch } from '../../hooks/useStopwatch'
import { useBackground } from '../../hooks/useBackground'
import { StopwatchDisplay } from '../../components/stopwatch/StopwatchDisplay'
import { StopwatchControls } from '../../components/stopwatch/StopwatchControls'
import { LapList } from '../../components/stopwatch/LapList'

export default function StopwatchScreen() {
  const { colors } = useTheme()
  const sw = useStopwatch()

  useBackground(() => {
    sw.recalculateFromBackground()
  })

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StopwatchDisplay displayTime={sw.displayTime} />
      <StopwatchControls
        isRunning={sw.isRunning}
        isPaused={sw.isPaused}
        onStart={sw.start}
        onPause={sw.pause}
        onResume={sw.resume}
        onReset={sw.reset}
        onLap={sw.addLap}
      />
      <LapList laps={sw.laps} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
