import { useEffect, useRef, useCallback } from 'react'
import { AppState, AppStateStatus } from 'react-native'

export function useBackground(onForeground?: () => void, onBackground?: () => void) {
  const appStateRef = useRef<AppStateStatus>(AppState.currentState)

  const handleAppState = useCallback(
    (nextState: AppStateStatus) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextState === 'active'
      ) {
        onForeground?.()
      } else if (
        appStateRef.current === 'active' &&
        nextState.match(/inactive|background/)
      ) {
        onBackground?.()
      }
      appStateRef.current = nextState
    },
    [onForeground, onBackground],
  )

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppState)
    return () => subscription.remove()
  }, [handleAppState])
}

export function useAppState() {
  const appStateRef = useRef<AppStateStatus>(AppState.currentState)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      appStateRef.current = state
    })
    return () => subscription.remove()
  }, [])

  return appStateRef
}
