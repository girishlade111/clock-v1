import { create } from 'zustand'
import type { TimeFormat12H } from '../types'

interface ClockStore {
  timeFormat: TimeFormat12H
  showAnalog: boolean
  smoothSecondHand: boolean
  setTimeFormat: (format: TimeFormat12H) => void
  setShowAnalog: (show: boolean) => void
  setSmoothSecondHand: (smooth: boolean) => void
}

export const useClockStore = create<ClockStore>((set) => ({
  timeFormat: '12h',
  showAnalog: false,
  smoothSecondHand: true,
  setTimeFormat: (timeFormat) => set({ timeFormat }),
  setShowAnalog: (showAnalog) => set({ showAnalog }),
  setSmoothSecondHand: (smoothSecondHand) => set({ smoothSecondHand }),
}))
