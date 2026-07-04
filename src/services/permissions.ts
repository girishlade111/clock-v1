import * as Notifications from 'expo-notifications'
import { Platform, Alert, Linking } from 'react-native'

export async function requestNotificationPermissions(): Promise<boolean> {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowCriticalAlerts: true,
          allowProvisional: true,
        },
      })
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'Alarm notifications need permission to work. Please enable notifications in Settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
      )
      return false
    }

    if (Platform.OS === 'android') {
      const channel = await Notifications.getNotificationChannelAsync('alarm-channel')
      if (channel?.importance === Notifications.AndroidImportance.DEFAULT) {
        await Notifications.setNotificationChannelAsync('alarm-channel', {
          name: 'Alarms',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 500, 200, 500],
          lightColor: '#FF3B30',
          bypassDnd: true,
          lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        })
      }
    }

    return true
  } catch (e) {
    console.warn('Permission request error:', e)
    return false
  }
}

export async function getNotificationPermissionsStatus(): Promise<boolean> {
  try {
    const { status } = await Notifications.getPermissionsAsync()
    return status === 'granted'
  } catch {
    return false
  }
}
