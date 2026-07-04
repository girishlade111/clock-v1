import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { Switch } from '../ui/Switch'
import { formatAlarmTime } from '../../utils/format'
import { useClockStore } from '../../stores/clockStore'
import type { Alarm, RepeatType } from '../../types'

const REPEAT_LABELS: Record<RepeatType, string> = {
  once: 'Once',
  daily: 'Daily',
  weekdays: 'Weekdays',
  weekends: 'Weekends',
  custom: 'Custom',
}

interface Props {
  alarm: Alarm
  onToggle: () => void
  onPress: () => void
}

export function AlarmCard({ alarm, onToggle, onPress }: Props) {
  const { colors } = useTheme()
  const { timeFormat } = useClockStore()

  const repeatLabel = alarm.repeatType === 'custom' && alarm.repeatDays.length > 0
    ? alarm.repeatDays
        .map((d) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d])
        .join(', ')
    : REPEAT_LABELS[alarm.repeatType]

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.separator }]}
    >
      <View style={styles.left}>
        <Text
          style={[
            styles.time,
            { color: alarm.enabled ? colors.text : colors.textTertiary },
            !alarm.enabled && { textDecorationLine: 'line-through' },
          ]}
        >
          {formatAlarmTime(alarm.hour, alarm.minute, timeFormat)}
        </Text>
        {alarm.label ? (
          <Text
            style={[
              styles.label,
              { color: alarm.enabled ? colors.textSecondary : colors.textTertiary },
            ]}
          >
            {alarm.label}
          </Text>
        ) : null}
        <Text style={[styles.repeat, { color: colors.textTertiary }]}>
          {repeatLabel}
        </Text>
      </View>
      <Switch value={alarm.enabled} onValueChange={onToggle} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 0.5,
  },
  left: {
    flex: 1,
  },
  time: {
    fontSize: 32,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
    letterSpacing: 1,
  },
  label: {
    fontSize: 15,
    marginTop: 2,
  },
  repeat: {
    fontSize: 12,
    marginTop: 2,
  },
})
