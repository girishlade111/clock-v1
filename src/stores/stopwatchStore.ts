import { create } from 'zustand'
import type { LapEntry } from '../types'
import { getNow } from '../services/timekeeping'

interface StopwatchStore {
  status: 'idle' | 'running' | 'paused'
  startTimestamp: number
  accumulatedMs: number
  laps: LapEntry[]

  start: () => void
  pause: () => void
  resume: () => void
  reset: () => void
  addLap: () => void
  getElapsed: () => number
  recalculateFromBackground: () => void
}

export const useStopwatchStore = create<StopwatchStore>((set, get) => ({
  status: 'idle',
  startTimestamp: 0,
  accumulatedMs: 0,
  laps: [],

  start: () => {
    const now = getNow()
    set({
      status: 'running',
      startTimestamp: now,
      accumulatedMs: 0,
      laps: [],
    })
  },

  pause: () => {
    const state = get()
    if (state.status !== 'running') return
    const elapsed = state.accumulatedMs + (getNow() - state.startTimestamp)
    set({
      status: 'paused',
      accumulatedMs: elapsed,
      startTimestamp: 0,
    })
  },

  resume: () => {
    const state = get()
    if (state.status !== 'paused') return
    set({
      status: 'running',
      startTimestamp: getNow(),
    })
  },

  reset: () => {
    set({
      status: 'idle',
      startTimestamp: 0,
      accumulatedMs: 0,
      laps: [],
    })
  },

  addLap: () => {
    const state = get()
    const currentElapsed =
      state.accumulatedMs +
      (state.status === 'running' ? getNow() - state.startTimestamp : 0)

    const prevLap = state.laps[state.laps.length - 1]
    const prevSplit = prevLap ? prevLap.splitMs : 0
    const lapMs = currentElapsed - prevSplit

    const newLap: LapEntry = {
      id: state.laps.length + 1,
      lapMs,
      splitMs: currentElapsed,
    }

    set({ laps: [...state.laps, newLap] })
  },

  getElapsed: () => {
    const state = get()
    return state.accumulatedMs + (state.status === 'running' ? getNow() - state.startTimestamp : 0)
  },

  recalculateFromBackground: () => {
    const state = get()
    if (state.status === 'running') {
      const elapsed = state.accumulatedMs + (getNow() - state.startTimestamp)
      set({
        accumulatedMs: elapsed,
        startTimestamp: getNow(),
      })
    }
  },
}))
