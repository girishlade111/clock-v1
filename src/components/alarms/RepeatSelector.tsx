import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { WEEKDAYS } from '../../constants/presets'
import type { RepeatType } from '../../types'

interface Props {
  repeatType: RepeatType
  repeatDays: number[]
  onTypeChange: (type: RepeatType) => void
  onDayToggle: (day: number) => void
}

const REPEAT_OPTIONS: { label: string; value: RepeatType }[] = [
  { label: 'Once', value: 'once' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekdays', value: 'weekdays' },
  { label: 'Weekends', value: 'weekends' },
  { label: 'Custom', value: 'custom' },
]

export function RepeatSelector({
  repeatType,
  repeatDays,
  onTypeChange,
  onDayToggle,
}: Props) {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Repeat</Text>
      <View style={styles.row}>
        {REPEAT_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            onPress={() => onTypeChange(opt.value)}
            style={[
              styles.option,
              {
                backgroundColor:
                  repeatType === opt.value
                    ? colors.primary
                    : colors.surfaceSecondary,
              },
            ]}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color:
                    repeatType === opt.value ? '#FFFFFF' : colors.text,
                },
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {repeatType === 'custom' && (
        <View style={styles.daysRow}>
          {WEEKDAYS.map((day, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onDayToggle(index)}
              style={[
                styles.dayBtn,
                {
                  backgroundColor: repeatDays.includes(index)
                    ? colors.primary
                    : colors.surfaceSecondary,
                },
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  {
                    color: repeatDays.includes(index)
                      ? '#FFFFFF'
                      : colors.textSecondary,
                  },
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  option: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    gap: 4,
  },
  dayBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
  },
})
