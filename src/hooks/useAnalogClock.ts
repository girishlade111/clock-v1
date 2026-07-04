import { useEffect, useMemo } from 'react'
import { useSharedValue, withSpring, useDerivedValue } from 'react-native-reanimated'
import { useClockStore } from '../stores/clockStore'

export function useAnalogClock() {
  const { smoothSecondHand } = useClockStore()
  const second = useSharedValue(0)
  const minute = useSharedValue(0)
  const hour = useSharedValue(0)

  useEffect(() => {
    let running = true
    let frameId: number

    const tick = () => {
      if (!running) return
      const now = new Date()
      const ms = now.getMilliseconds()
      const s = now.getSeconds() + (smoothSecondHand ? ms / 1000 : 0)
      const m = now.getMinutes() + s / 60
      const h = (now.getHours() % 12) + m / 60

      second.value = smoothSecondHand
        ? withSpring((s / 60) * 360, { damping: 30, stiffness: 200 })
        : (s / 60) * 360
      minute.value = (m / 60) * 360
      hour.value = (h / 12) * 360

      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => {
      running = false
      cancelAnimationFrame(frameId)
    }
  }, [smoothSecondHand])

  return { second, minute, hour }
}
