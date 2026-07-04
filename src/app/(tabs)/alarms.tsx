import { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../hooks/useTheme'
import { useAlarms } from '../../hooks/useAlarms'
import { useBackground } from '../../hooks/useBackground'
import { AlarmCard } from '../../components/alarms/AlarmCard'
import { AlarmForm } from '../../components/alarms/AlarmForm'
import { AlarmCompletionOverlay } from '../../components/alarms/AlarmCompletionOverlay'
import { stopAlarmSound } from '../../services/audio'
import { triggerHaptic } from '../../services/audio'
import type { Alarm } from '../../types'

export default function AlarmsScreen() {
  const { colors } = useTheme()
  const {
    alarms,
    firingAlarmId,
    addAlarm,
    updateAlarm,
    removeAlarm,
    toggleAlarm,
    dismissAlarm,
    snoozeAlarm,
  } = useAlarms()

  const [showForm, setShowForm] = useState(false)
  const [editingAlarm, setEditingAlarm] = useState<Alarm | undefined>()

  useBackground()

  const handleNew = () => {
    setEditingAlarm(undefined)
    setShowForm(true)
  }

  const handleEdit = (alarm: Alarm) => {
    setEditingAlarm(alarm)
    setShowForm(true)
  }

  const handleSave = (data: Omit<Alarm, 'id'>) => {
    triggerHaptic('light')
    if (editingAlarm) {
      updateAlarm(editingAlarm.id, data)
    } else {
      addAlarm(data)
    }
    setShowForm(false)
    setEditingAlarm(undefined)
  }

  const handleDelete = () => {
    if (editingAlarm) {
      triggerHaptic('medium')
      removeAlarm(editingAlarm.id)
      setShowForm(false)
      setEditingAlarm(undefined)
    }
  }

  const handleDismiss = () => {
    stopAlarmSound()
    dismissAlarm()
  }

  const handleSnooze = () => {
    stopAlarmSound()
    snoozeAlarm()
  }

  const firingAlarm = alarms.find((a) => a.id === firingAlarmId)

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: colors.separator }]}>
        <Text style={[styles.title, { color: colors.text }]}>Alarms</Text>
        <TouchableOpacity onPress={handleNew}>
          <Text style={[styles.addBtn, { color: colors.primary }]}>+ New</Text>
        </TouchableOpacity>
      </View>

      {alarms.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No alarms yet.{'\n'}Tap "+ New" to add one.
          </Text>
        </View>
      ) : (
        <FlatList
          data={alarms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AlarmCard
              alarm={item}
              onToggle={() => toggleAlarm(item.id)}
              onPress={() => handleEdit(item)}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal visible={showForm} animationType="slide" onRequestClose={() => setShowForm(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
          <AlarmForm
            alarm={editingAlarm}
            onSave={handleSave}
            onDelete={editingAlarm ? handleDelete : undefined}
            onClose={() => {
              setShowForm(false)
              setEditingAlarm(undefined)
            }}
          />
        </SafeAreaView>
      </Modal>

      <AlarmCompletionOverlay
        visible={firingAlarmId != null}
        alarmLabel={firingAlarm?.label ?? ''}
        onDismiss={handleDismiss}
        onSnooze={handleSnooze}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  addBtn: {
    fontSize: 17,
    fontWeight: '600',
  },
  list: {
    padding: 16,
    paddingBottom: 30,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 24,
  },
})
