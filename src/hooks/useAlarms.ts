import { useEffect, useCallback } from 'react'
import { useAlarmStore } from '../stores/alarmStore'
import { scheduleAlarmNotification, cancelAlarmNotification } from '../services/notifications'
import { playAlarmSound, stopAlarmSound, triggerHaptic } from '../services/audio'

export function useAlarms() {
  const store = useAlarmStore()

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const currentMin = now.getHours() * 60 + now.getMinutes()

      for (const alarm of store.alarms) {
        if (!alarm.enabled) continue
        if (store.firingAlarmId) continue

        const alarmMin = alarm.hour * 60 + alarm.minute

        if (currentMin === alarmMin) {
          if (shouldAlarmFireToday(alarm, now)) {
            store.setFiringAlarm(alarm.id)
            playAlarmSound(alarm.sound)
            triggerHaptic('heavy')
          }
        }
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [store.alarms, store.firingAlarmId])

  const dismissAlarm = useCallback(() => {
    stopAlarmSound()
    store.dismissAlarm()
  }, [store])

  const snoozeAlarm = useCallback(() => {
    stopAlarmSound()
    store.snoozeAlarm()
  }, [store])

  const saveAlarm = useCallback(
    async (alarm: Omit<import('../types').Alarm, 'id'>) => {
      store.addAlarm(alarm)
    },
    [store],
  )

  return {
    alarms: store.alarms,
    firingAlarmId: store.firingAlarmId,
    addAlarm: saveAlarm,
    updateAlarm: store.updateAlarm,
    removeAlarm: store.removeAlarm,
    toggleAlarm: store.toggleAlarm,
    dismissAlarm,
    snoozeAlarm,
  }
}

function shouldAlarmFireToday(alarm: import('../types').Alarm, now: Date): boolean {
  switch (alarm.repeatType) {
    case 'once':
      return true
    case 'daily':
      return true
    case 'weekdays': {
      const day = now.getDay()
      return day >= 1 && day <= 5
    }
    case 'weekends': {
      const day = now.getDay()
      return day === 0 || day === 6
    }
    case 'custom':
      return alarm.repeatDays.includes(now.getDay())
    default:
      return true
  }
}
