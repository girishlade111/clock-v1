import { View, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../hooks/useTheme'
import { useClock } from '../../hooks/useClock'
import { useBackground } from '../../hooks/useBackground'
import { DigitalClock } from '../../components/clock/DigitalClock'
import { AnalogClock } from '../../components/clock/AnalogClock'
import { ThemeToggle } from '../../components/common/ThemeToggle'
import { useClockStore } from '../../stores/clockStore'
import { Switch } from '../../components/ui/Switch'
import { Text } from 'react-native'

export default function ClockScreen() {
  const { colors } = useTheme()
  const { timeString, dateString, hours, minutes, seconds, milliseconds } = useClock()
  const { showAnalog, smoothSecondHand, setShowAnalog, setSmoothSecondHand } = useClockStore()

  useBackground()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        {showAnalog ? (
          <AnalogClock
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            milliseconds={milliseconds}
          />
        ) : (
          <DigitalClock timeString={timeString} dateString={dateString} />
        )}

        <View style={[styles.settingsCard, { backgroundColor: colors.surface, borderColor: colors.separator }]}>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Show Analog Clock</Text>
            <Switch value={showAnalog} onValueChange={setShowAnalog} />
          </View>
          {showAnalog && (
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Sweeping Second Hand</Text>
              <Switch value={smoothSecondHand} onValueChange={setSmoothSecondHand} />
            </View>
          )}
        </View>

        <ThemeToggle />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  settingsCard: {
    borderRadius: 14,
    borderWidth: 0.5,
    padding: 16,
    marginTop: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 15,
  },
})
