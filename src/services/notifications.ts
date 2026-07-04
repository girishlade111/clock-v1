import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

const ALARM_CHANNEL_ID = 'alarm-channel'
const TIMER_CHANNEL_ID = 'timer-channel'

export async function setupNotificationChannels() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(ALARM_CHANNEL_ID, {
      name: 'Alarms',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 500, 200, 500],
      lightColor: '#FF3B30',
      sound: 'alarm-default.wav',
      bypassDnd: true,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    })
    await Notifications.setNotificationChannelAsync(TIMER_CHANNEL_ID, {
      name: 'Timers',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 300, 200, 300],
      lightColor: '#007AFF',
      sound: 'timer-complete.wav',
    })
  }
}

export async function scheduleAlarmNotification(
  alarmId: string,
  hour: number,
  minute: number,
  label: string,
): Promise<string> {
  const now = new Date()
  let scheduledDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0,
  )
  if (scheduledDate.getTime() <= now.getTime()) {
    scheduledDate.setDate(scheduledDate.getDate() + 1)
  }

  const trigger: Notifications.TimeIntervalTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: Math.max(60, Math.ceil((scheduledDate.getTime() - now.getTime()) / 1000)),
    repeats: false,
  }

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: label || 'Alarm',
      body: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      sound: 'alarm-default.wav',
      priority: Notifications.AndroidNotificationPriority.HIGH,
      categoryIdentifier: 'alarm',
      data: { type: 'alarm', alarmId, hour, minute },
      interruptionLevel: 'critical',
    },
    trigger,
  })
  return id
}

export async function cancelAlarmNotification(alarmId: string) {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync()
  for (const n of scheduled) {
    if (n.content.data?.alarmId === alarmId) {
      await Notifications.cancelScheduledNotificationAsync(n.identifier)
    }
  }
}

export async function scheduleTimerNotification(
  timerId: string,
  durationMs: number,
): Promise<string> {
  const trigger: Notifications.TimeIntervalTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: Math.max(60, Math.ceil(durationMs / 1000)),
    repeats: false,
  }

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Timer Complete!',
      body: 'Your timer has finished counting down.',
      sound: 'timer-complete.wav',
      priority: Notifications.AndroidNotificationPriority.HIGH,
      categoryIdentifier: 'timer',
      data: { type: 'timer', timerId },
      interruptionLevel: 'timeSensitive',
    },
    trigger,
  })
  return id
}

export async function cancelTimerNotification(timerId: string) {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync()
  for (const n of scheduled) {
    if (n.content.data?.timerId === timerId) {
      await Notifications.cancelScheduledNotificationAsync(n.identifier)
    }
  }
}

export function addNotificationResponseListener(
  handler: (response: Notifications.NotificationResponse) => void,
): Notifications.Subscription {
  return Notifications.addNotificationResponseReceivedListener(handler)
}

export function addNotificationReceivedListener(
  handler: (notification: Notifications.Notification) => void,
): Notifications.Subscription {
  return Notifications.addNotificationReceivedListener(handler)
}
