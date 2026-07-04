import { useState } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { Button } from '../ui/Button'
import { RepeatSelector } from './RepeatSelector'
import { SNOOZE_OPTIONS } from '../../constants/presets'
import { ALARM_SOUNDS } from '../../constants/sounds'
import type { Alarm, RepeatType, AlarmSoundKey } from '../../types'

interface Props {
  alarm?: Alarm
  onSave: (data: Omit<Alarm, 'id'>) => void
  onDelete?: () => void
  onClose: () => void
}

export function AlarmForm({ alarm, onSave, onDelete, onClose }: Props) {
  const { colors } = useTheme()
  const isEditing = !!alarm

  const [hour, setHour] = useState(alarm?.hour?.toString() ?? '08')
  const [minute, setMinute] = useState(alarm?.minute?.toString().padStart(2, '0') ?? '00')
  const [label, setLabel] = useState(alarm?.label ?? '')
  const [repeatType, setRepeatType] = useState<RepeatType>(alarm?.repeatType ?? 'once')
  const [repeatDays, setRepeatDays] = useState<number[]>(alarm?.repeatDays ?? [])
  const [snoozeMinutes, setSnoozeMinutes] = useState(alarm?.snoozeMinutes ?? 5)
  const [sound, setSound] = useState<AlarmSoundKey>((alarm?.sound as AlarmSoundKey) ?? 'default')

  const handleSave = () => {
    const h = Math.max(0, Math.min(23, parseInt(hour) || 0))
    const m = Math.max(0, Math.min(59, parseInt(minute) || 0))
    onSave({
      label,
      hour: h,
      minute: m,
      enabled: alarm?.enabled ?? true,
      repeatType,
      repeatDays,
      snoozeMinutes,
      sound,
    })
  }

  const isCustom = repeatType === 'custom' && repeatDays.length === 0

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Text style={[styles.cancel, { color: colors.primary }]}>Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          {isEditing ? 'Edit Alarm' : 'New Alarm'}
        </Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={[styles.save, { color: colors.primary }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timeRow}>
        <TextInput
          style={[styles.timeInput, { color: colors.text, borderColor: colors.border }]}
          value={hour}
          onChangeText={setHour}
          keyboardType="number-pad"
          maxLength={2}
          placeholder="HH"
          placeholderTextColor={colors.textTertiary}
        />
        <Text style={[styles.colon, { color: colors.text }]}>:</Text>
        <TextInput
          style={[styles.timeInput, { color: colors.text, borderColor: colors.border }]}
          value={minute}
          onChangeText={setMinute}
          keyboardType="number-pad"
          maxLength={2}
          placeholder="MM"
          placeholderTextColor={colors.textTertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={[styles.fieldLabel, { color: colors.text }]}>Label</Text>
        <TextInput
          style={[
            styles.textInput,
            { backgroundColor: colors.surfaceSecondary, color: colors.text },
          ]}
          value={label}
          onChangeText={setLabel}
          placeholder="e.g. Morning Wake Up"
          placeholderTextColor={colors.textTertiary}
        />
      </View>

      <RepeatSelector
        repeatType={repeatType}
        repeatDays={repeatDays}
        onTypeChange={setRepeatType}
        onDayToggle={(day) => {
          setRepeatDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
          )
        }}
      />

      <View style={styles.field}>
        <Text style={[styles.fieldLabel, { color: colors.text }]}>Snooze (minutes)</Text>
        <View style={styles.snoozeRow}>
          {SNOOZE_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt}
              onPress={() => setSnoozeMinutes(opt)}
              style={[
                styles.snoozeBtn,
                {
                  backgroundColor:
                    snoozeMinutes === opt ? colors.primary : colors.surfaceSecondary,
                },
              ]}
            >
              <Text
                style={[
                  styles.snoozeText,
                  { color: snoozeMinutes === opt ? '#FFFFFF' : colors.text },
                ]}
              >
                {opt}m
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={[styles.fieldLabel, { color: colors.text }]}>Sound</Text>
        <View style={styles.soundRow}>
          {ALARM_SOUNDS.map((s) => (
            <TouchableOpacity
              key={s.key}
              onPress={() => setSound(s.key)}
              style={[
                styles.soundBtn,
                {
                  backgroundColor:
                    sound === s.key ? colors.primary : colors.surfaceSecondary,
                },
              ]}
            >
              <Text
                style={[
                  styles.soundText,
                  { color: sound === s.key ? '#FFFFFF' : colors.text },
                ]}
              >
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {isEditing && onDelete && (
        <Button
          title="Delete Alarm"
          variant="destructive"
          size="md"
          onPress={onDelete}
          style={{ marginTop: 20, marginBottom: 40 }}
        />
      )}

      {isCustom && (
        <Text style={[styles.warning, { color: colors.destructive }]}>
          Select at least one day for custom repeat.
        </Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  cancel: {
    fontSize: 17,
  },
  save: {
    fontSize: 17,
    fontWeight: '600',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  timeInput: {
    fontSize: 48,
    fontWeight: '300',
    width: 90,
    textAlign: 'center',
    borderBottomWidth: 1,
    paddingVertical: 8,
    fontVariant: ['tabular-nums'],
  },
  colon: {
    fontSize: 48,
    fontWeight: '300',
    marginHorizontal: 4,
  },
  field: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    borderRadius: 10,
    padding: 12,
    fontSize: 17,
  },
  snoozeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  snoozeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  snoozeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  soundRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  soundBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  soundText: {
    fontSize: 14,
    fontWeight: '600',
  },
  warning: {
    fontSize: 13,
    marginTop: 8,
  },
})
