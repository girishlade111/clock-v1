import { create } from 'zustand'
import type { Alarm, RepeatType } from '../types'

interface AlarmStore {
  alarms: Alarm[]
  firingAlarmId: string | null

  addAlarm: (alarm: Omit<Alarm, 'id'>) => void
  updateAlarm: (id: string, updates: Partial<Alarm>) => void
  removeAlarm: (id: string) => void
  toggleAlarm: (id: string) => void
  setFiringAlarm: (id: string | null) => void
  dismissAlarm: () => void
  snoozeAlarm: () => void
  setAlarms: (alarms: Alarm[]) => void
}

export const useAlarmStore = create<AlarmStore>((set, get) => ({
  alarms: [],
  firingAlarmId: null,

  addAlarm: (alarm) => {
    const newAlarm: Alarm = {
      ...alarm,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    }
    set((state) => ({
      alarms: [...state.alarms, newAlarm].sort(
        (a, b) => a.hour * 60 + a.minute - (b.hour * 60 + b.minute),
      ),
    }))
  },

  updateAlarm: (id, updates) =>
    set((state) => ({
      alarms: state.alarms.map((a) =>
        a.id === id ? { ...a, ...updates } : a,
      ),
    })),

  removeAlarm: (id) =>
    set((state) => ({
      alarms: state.alarms.filter((a) => a.id !== id),
    })),

  toggleAlarm: (id) =>
    set((state) => ({
      alarms: state.alarms.map((a) =>
        a.id === id ? { ...a, enabled: !a.enabled } : a,
      ),
    })),

  setFiringAlarm: (firingAlarmId) => set({ firingAlarmId }),

  dismissAlarm: () => set({ firingAlarmId: null }),

  snoozeAlarm: () => {
    const state = get()
    if (!state.firingAlarmId) return
    const alarm = state.alarms.find((a) => a.id === state.firingAlarmId)
    if (!alarm) return

    const now = new Date()
    const snoozeMs = alarm.snoozeMinutes * 60 * 1000
    const snoozedTime = new Date(now.getTime() + snoozeMs)

    const updatedAlarm: Alarm = {
      ...alarm,
      hour: snoozedTime.getHours(),
      minute: snoozedTime.getMinutes(),
    }

    set((state) => ({
      firingAlarmId: null,
      alarms: state.alarms.map((a) =>
        a.id === alarm.id ? updatedAlarm : a,
      ),
    }))
  },

  setAlarms: (alarms) => set({ alarms }),
}))
