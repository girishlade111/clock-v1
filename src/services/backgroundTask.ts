import * as TaskManager from 'expo-task-manager'
import * as BackgroundFetch from 'expo-background-fetch'
import { getNow } from './timekeeping'
import { getItem, setItem, KEYS } from './storage'
import type { TimerState, StopwatchState, Alarm } from '../types'

const TIMER_BACKGROUND_TASK = 'timer-background-task'
const STOPWATCH_BACKGROUND_TASK = 'stopwatch-background-task'
const BACKGROUND_FETCH_INTERVAL = 10 * 60

TaskManager.defineTask(TIMER_BACKGROUND_TASK, async () => {
  try {
    const timer = getItem<TimerState>(KEYS.TIMER_STATE)
    if (timer && timer.status === 'running') {
      const remaining = Math.max(0, timer.endTimestamp - getNow())
      const updated: TimerState = { ...timer, remainingMs: remaining }
      setItem(KEYS.TIMER_STATE, updated)
      if (remaining <= 0) {
        return BackgroundFetch.BackgroundFetchResult.NewData
      }
    }
    return BackgroundFetch.BackgroundFetchResult.NoData
  } catch {
    return BackgroundFetch.BackgroundFetchResult.Failed
  }
})

TaskManager.defineTask(STOPWATCH_BACKGROUND_TASK, async () => {
  try {
    const sw = getItem<StopwatchState>(KEYS.STOPWATCH_STATE)
    if (sw && sw.status === 'running') {
      const updated: StopwatchState = { ...sw }
      setItem(KEYS.STOPWATCH_STATE, updated)
      return BackgroundFetch.BackgroundFetchResult.NewData
    }
    return BackgroundFetch.BackgroundFetchResult.NoData
  } catch {
    return BackgroundFetch.BackgroundFetchResult.Failed
  }
})

export async function registerBackgroundTasks() {
  try {
    const status = await BackgroundFetch.getStatusAsync()
    if (status === BackgroundFetch.BackgroundFetchStatus.Denied) {
      console.warn('Background fetch is denied')
      return
    }
    await BackgroundFetch.registerTaskAsync(TIMER_BACKGROUND_TASK, {
      minimumInterval: BACKGROUND_FETCH_INTERVAL,
      stopOnTerminate: false,
      startOnBoot: true,
    })
    await BackgroundFetch.registerTaskAsync(STOPWATCH_BACKGROUND_TASK, {
      minimumInterval: BACKGROUND_FETCH_INTERVAL,
      stopOnTerminate: false,
      startOnBoot: true,
    })
  } catch (e) {
    console.warn('Background task registration error:', e)
  }
}

export async function unregisterBackgroundTasks() {
  try {
    await BackgroundFetch.unregisterTaskAsync(TIMER_BACKGROUND_TASK)
    await BackgroundFetch.unregisterTaskAsync(STOPWATCH_BACKGROUND_TASK)
  } catch (e) {
    console.warn('Unregister error:', e)
  }
}
