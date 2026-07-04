import { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../hooks/useTheme'
import { useTimer } from '../../hooks/useTimer'
import { useBackground } from '../../hooks/useBackground'
import { TimerDisplay } from '../../components/timer/TimerDisplay'
import { TimerControls } from '../../components/timer/TimerControls'
import { TimerPresets } from '../../components/timer/TimerPresets'
import { playTimerCompleteSound, stopTimerSound, triggerTimerCompleteHaptic } from '../../services/audio'
import { triggerHaptic } from '../../services/audio'

export default function TimerScreen() {
  const { colors } = useTheme()
  const timer = useTimer()

  const [inputHours, setInputHours] = useState('0')
  const [inputMinutes, setInputMinutes] = useState('5')
  const [inputSeconds, setInputSeconds] = useState('0')

  useBackground(() => {
    timer.recalculateFromBackground()
  })

  useEffect(() => {
    if (timer.isCompleted) {
      playTimerCompleteSound()
      triggerTimerCompleteHaptic()
    } else {
      stopTimerSound()
    }
  }, [timer.isCompleted])

  const handlePreset = (ms: number) => {
    triggerHaptic('light')
    const totalSec = Math.floor(ms / 1000)
    setInputHours(Math.floor(totalSec / 3600).toString())
    setInputMinutes(Math.floor((totalSec % 3600) / 60).toString())
    setInputSeconds((totalSec % 60).toString())
    timer.setDuration(ms)
  }

  const applyInput = () => {
    const h = parseInt(inputHours) || 0
    const m = parseInt(inputMinutes) || 0
    const s = parseInt(inputSeconds) || 0
    const totalMs = (h * 3600 + m * 60 + s) * 1000
    if (totalMs > 0) {
      timer.setDuration(totalMs)
      timer.start()
    }
  }

  const showInputs = timer.status === 'idle'

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        {showInputs && (
          <TimerPresets onSelect={handlePreset} />
        )}

        {showInputs && (
          <View style={styles.inputRow}>
            <TimeInput value={inputHours} onChange={setInputHours} label="Hr" colors={colors} />
            <Text style={[styles.colon, { color: colors.text }]}>:</Text>
            <TimeInput value={inputMinutes} onChange={setInputMinutes} label="Min" colors={colors} />
            <Text style={[styles.colon, { color: colors.text }]}>:</Text>
            <TimeInput value={inputSeconds} onChange={setInputSeconds} label="Sec" colors={colors} />
          </View>
        )}

        <TimerDisplay
          displayTime={timer.displayTime}
          progress={timer.progress}
          isCompleted={timer.isCompleted}
        />

        {showInputs && (
          <View style={styles.startBtnWrapper}>
            <Text
              style={[styles.startBtn, { backgroundColor: colors.primary, color: '#FFFFFF' }]}
              onPress={applyInput}
            >
              Start
            </Text>
          </View>
        )}

        <TimerControls
          isRunning={timer.isRunning}
          isPaused={timer.isPaused}
          isCompleted={timer.isCompleted}
          onStart={timer.start}
          onPause={timer.pause}
          onResume={timer.resume}
          onReset={() => {
            timer.reset()
            stopTimerSound()
          }}
          onAddMinute={timer.addMinute}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

function TimeInput({
  value,
  onChange,
  label,
  colors,
}: {
  value: string
  onChange: (v: string) => void
  label: string
  colors: any
}) {
  return (
    <View style={styles.timeInputWrapper}>
      <TextInput
        style={[styles.timeInput, { color: colors.text, borderColor: colors.border }]}
        value={value}
        onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
        keyboardType="number-pad"
        maxLength={2}
        placeholder="0"
        placeholderTextColor={colors.textTertiary}
        selectTextOnFocus
      />
      <Text style={[styles.timeLabel, { color: colors.textTertiary }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 4,
  },
  timeInputWrapper: {
    alignItems: 'center',
  },
  timeInput: {
    fontSize: 32,
    fontWeight: '300',
    width: 72,
    textAlign: 'center',
    borderBottomWidth: 1,
    paddingVertical: 4,
    fontVariant: ['tabular-nums'],
  },
  timeLabel: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  colon: {
    fontSize: 32,
    fontWeight: '300',
    marginBottom: 16,
  },
  startBtnWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  startBtn: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 30,
    overflow: 'hidden',
  },
})
