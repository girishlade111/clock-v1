import { Audio } from 'expo-av'
import * as Haptics from 'expo-haptics'
import { Platform } from 'react-native'

let alarmSound: Audio.Sound | null = null
let timerSound: Audio.Sound | null = null
let isPlaying = false

export async function configureAudio() {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    })
  } catch (e) {
    console.warn('Audio config error:', e)
  }
}

export async function playAlarmSound(soundKey: string = 'default'): Promise<void> {
  if (isPlaying) return
  isPlaying = true

  try {
    if (alarmSound) {
      await alarmSound.unloadAsync()
    }
    alarmSound = new Audio.Sound()
    const soundMap: Record<string, any> = {
      default: require('../../assets/sounds/alarm-default.mp3'),
      gentle: require('../../assets/sounds/alarm-gentle.mp3'),
      marimba: require('../../assets/sounds/alarm-marimba.mp3'),
      bell: require('../../assets/sounds/alarm-bell.mp3'),
    }
    const source = soundMap[soundKey] || soundMap.default

    await alarmSound.loadAsync(source, {
      shouldPlay: true,
      isLooping: true,
      volume: 1.0,
    })
    await alarmSound.playAsync()
  } catch (e) {
    console.warn('Alarm sound error:', e)
  }
}

export async function stopAlarmSound(): Promise<void> {
  try {
    if (alarmSound) {
      await alarmSound.stopAsync()
      await alarmSound.unloadAsync()
      alarmSound = null
    }
  } catch (e) {
    console.warn('Stop alarm error:', e)
  }
  isPlaying = false
}

export async function playTimerCompleteSound(): Promise<void> {
  try {
    if (timerSound) {
      await timerSound.unloadAsync()
    }
    timerSound = new Audio.Sound()
    await timerSound.loadAsync(
      require('../../assets/sounds/timer-complete.mp3'),
      { shouldPlay: true, isLooping: false, volume: 1.0 },
    )
    await timerSound.playAsync()
  } catch (e) {
    console.warn('Timer sound error:', e)
  }
}

export async function stopTimerSound(): Promise<void> {
  try {
    if (timerSound) {
      await timerSound.stopAsync()
      await timerSound.unloadAsync()
      timerSound = null
    }
  } catch (e) {
    console.warn('Stop timer sound error:', e)
  }
}

export function triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'selection' | 'warning' = 'medium') {
  if (Platform.OS === 'web') return
  try {
    switch (type) {
      case 'light':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        break
      case 'medium':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        break
      case 'heavy':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        break
      case 'selection':
        Haptics.selectionAsync()
        break
      case 'warning':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
        break
    }
  } catch (e) {
  }
}

export function triggerTimerCompleteHaptic() {
  if (Platform.OS === 'web') return
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  } catch (e) {
  }
}
