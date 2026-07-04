import { create } from 'zustand'
import { getNow } from '../services/timekeeping'

interface TimerStore {
  status: 'idle' | 'running' | 'paused' | 'completed'
  totalMs: number
  remainingMs: number
  endTimestamp: number

  setDuration: (ms: number) => void
  start: () => void
  pause: () => void
  resume: () => void
  reset: () => void
  addMinute: () => void
  complete: () => void
  getRemaining: () => number
  recalculateFromBackground: () => void
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  status: 'idle',
  totalMs: 0,
  remainingMs: 0,
  endTimestamp: 0,

  setDuration: (ms) => {
    set({ totalMs: ms, remainingMs: ms })
  },

  start: () => {
    const state = get()
    if (state.totalMs <= 0) return
    const now = getNow()
    set({
      status: 'running',
      endTimestamp: now + state.totalMs,
      remainingMs: state.totalMs,
    })
  },

  pause: () => {
    const state = get()
    if (state.status !== 'running') return
    const remaining = Math.max(0, state.endTimestamp - getNow())
    set({
      status: 'paused',
      remainingMs: remaining,
      endTimestamp: 0,
    })
  },

  resume: () => {
    const state = get()
    if (state.status !== 'paused' || state.remainingMs <= 0) return
    const now = getNow()
    set({
      status: 'running',
      endTimestamp: now + state.remainingMs,
    })
  },

  reset: () => {
    set({
      status: 'idle',
      remainingMs: 0,
      totalMs: 0,
      endTimestamp: 0,
    })
  },

  addMinute: () => {
    const state = get()
    if (state.status === 'completed') {
      const ms = 60000
      set({
        status: 'running',
        totalMs: ms,
        remainingMs: ms,
        endTimestamp: getNow() + ms,
      })
    } else if (state.status === 'running') {
      set({
        endTimestamp: state.endTimestamp + 60000,
        remainingMs: state.remainingMs + 60000,
        totalMs: state.totalMs + 60000,
      })
    }
  },

  complete: () => {
    set({ status: 'completed', remainingMs: 0 })
  },

  getRemaining: () => {
    const state = get()
    if (state.status === 'running') {
      return Math.max(0, state.endTimestamp - getNow())
    }
    return state.remainingMs
  },

  recalculateFromBackground: () => {
    const state = get()
    if (state.status === 'running') {
      const remaining = Math.max(0, state.endTimestamp - getNow())
      if (remaining <= 0) {
        set({ status: 'completed', remainingMs: 0 })
      } else {
        set({ remainingMs: remaining })
      }
    }
  },
}))
