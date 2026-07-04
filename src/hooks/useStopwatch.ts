import { useState, useEffect, useCallback, useRef } from 'react'
import { useStopwatchStore } from '../stores/stopwatchStore'
import { formatMilliseconds } from '../utils/format'

interface StopwatchDisplay {
  displayTime: string
  elapsedMs: number
  isRunning: boolean
  isPaused: boolean
  start: () => void
  pause: () => void
  resume: () => void
  reset: () => void
  addLap: () => void
  laps: ReturnType<typeof useStopwatchStore>['laps']
  recalculateFromBackground: () => void
}

export function useStopwatch(): StopwatchDisplay {
  const store = useStopwatchStore()
  const [elapsedMs, setElapsedMs] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const updateElapsed = useCallback(() => {
    setElapsedMs(store.getElapsed())
  }, [store])

  useEffect(() => {
    if (store.status === 'running') {
      updateElapsed()
      intervalRef.current = setInterval(updateElapsed, 16)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      updateElapsed()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [store.status, updateElapsed])

  return {
    displayTime: formatMilliseconds(elapsedMs),
    elapsedMs,
    isRunning: store.status === 'running',
    isPaused: store.status === 'paused',
    start: store.start,
    pause: store.pause,
    resume: store.resume,
    reset: store.reset,
    addLap: store.addLap,
    laps: store.laps,
    recalculateFromBackground: store.recalculateFromBackground,
  }
}
