import { useState, useEffect, useCallback, useRef } from 'react'
import { useTimerStore } from '../stores/timerStore'
import { formatCountdown } from '../utils/format'

interface TimerDisplay {
  displayTime: string
  remainingMs: number
  totalMs: number
  progress: number
  isRunning: boolean
  isPaused: boolean
  isCompleted: boolean
  setDuration: (ms: number) => void
  start: () => void
  pause: () => void
  resume: () => void
  reset: () => void
  addMinute: () => void
  recalculateFromBackground: () => void
}

export function useTimer(): TimerDisplay {
  const store = useTimerStore()
  const [remainingMs, setRemainingMs] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const updateRemaining = useCallback(() => {
    const remaining = store.getRemaining()
    setRemainingMs(remaining)
    if (remaining <= 0 && store.status === 'running') {
      store.complete()
    }
  }, [store])

  useEffect(() => {
    if (store.status === 'running') {
      updateRemaining()
      intervalRef.current = setInterval(updateRemaining, 50)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      updateRemaining()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [store.status, updateRemaining])

  const progress = store.totalMs > 0
    ? Math.max(0, Math.min(1, remainingMs / store.totalMs))
    : 0

  return {
    displayTime: formatCountdown(remainingMs),
    remainingMs,
    totalMs: store.totalMs,
    progress,
    isRunning: store.status === 'running',
    isPaused: store.status === 'paused',
    isCompleted: store.status === 'completed',
    setDuration: store.setDuration,
    start: store.start,
    pause: store.pause,
    resume: store.resume,
    reset: store.reset,
    addMinute: store.addMinute,
    recalculateFromBackground: store.recalculateFromBackground,
  }
}
