import { useState, useEffect } from 'react'
import {
  requestNotificationPermissions,
  getNotificationPermissionsStatus,
} from '../services/permissions'

export function usePermissions() {
  const [notificationsGranted, setNotificationsGranted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkPermissions()
  }, [])

  async function checkPermissions() {
    const granted = await getNotificationPermissionsStatus()
    setNotificationsGranted(granted)
    setLoading(false)
  }

  async function requestPermissions(): Promise<boolean> {
    setLoading(true)
    const granted = await requestNotificationPermissions()
    setNotificationsGranted(granted)
    setLoading(false)
    return granted
  }

  return {
    notificationsGranted,
    loading,
    requestPermissions,
  }
}
