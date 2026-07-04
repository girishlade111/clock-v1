import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import { configureAudio } from '../services/audio'
import { setupNotificationChannels } from '../services/notifications'
import { registerBackgroundTasks } from '../services/backgroundTask'

export default function RootLayout() {
  const { theme } = useTheme()

  useEffect(() => {
    configureAudio()
    setupNotificationChannels()
    registerBackgroundTasks()
  }, [])

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})
