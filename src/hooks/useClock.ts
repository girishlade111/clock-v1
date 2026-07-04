import { useState, useEffect, useCallback } from 'react'
import { useClockStore } from '../stores/clockStore'
import { formatTimeWithSeconds, getFormattedDate } from '../utils/format'

interface ClockDisplay {
  timeString: string
  dateString: string
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

export function useClock(): ClockDisplay {
  const { timeFormat } = useClockStore()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    let animationFrameId: number
    let lastUpdate = 0

    const tick = (timestamp: number) => {
      if (timestamp - lastUpdate >= 16) {
        setNow(new Date())
        lastUpdate = timestamp
      }
      animationFrameId = requestAnimationFrame(tick)
    }

    animationFrameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  const timeString = formatTimeWithSeconds(now, timeFormat)
  const dateString = getFormattedDate(now)

  return {
    timeString,
    dateString,
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    milliseconds: now.getMilliseconds(),
  }
}
