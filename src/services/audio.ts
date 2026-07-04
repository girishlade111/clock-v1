import { createAudioPlayer, setAudioModeAsync } from 'expo-audio'
import * as Haptics from 'expo-haptics'
import { Platform } from 'react-native'

let alarmSound: ReturnType<typeof createAudioPlayer> | null = null
let timerSound: ReturnType<typeof createAudioPlayer> | null = null
let isPlaying = false

function loadSoundSource(key: string): any {
  try {
    const map: Record<string, any> = {
      default: require('../../assets/sounds/alarm-default.mp3'),
      gentle: require('../../assets/sounds/alarm-gentle.mp3'),
      marimba: require('../../assets/sounds/alarm-marimba.mp3'),
      bell: require('../../assets/sounds/alarm-bell.mp3'),
    }
    return map[key] || map.default
  } catch {
    return null
  }
}

function loadTimerSoundSource(): any {
  try {
    return require('../../assets/sounds/timer-complete.mp3')
  } catch {
    return null
  }
}

export async function configureAudio() {
  try {
    await setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'duckOthers',
    })
  } catch (e) {
    console.warn('Audio config error:', e)
  }
}

export async function playAlarmSound(soundKey: string = 'default'): Promise<void> {
  if (isPlaying) return
  isPlaying = true

  try {
    const source = loadSoundSource(soundKey)
    if (!source) {
      console.warn('Alarm sound file not found')
      return
    }
    if (alarmSound) {
      alarmSound.remove()
    }
    alarmSound = createAudioPlayer(source)
    alarmSound.loop = true
    alarmSound.volume = 1.0
    alarmSound.play()
  } catch (e) {
    console.warn('Alarm sound error:', e)
  }
}

export async function stopAlarmSound(): Promise<void> {
  try {
    if (alarmSound) {
      alarmSound.remove()
      alarmSound = null
    }
  } catch (e) {
    console.warn('Stop alarm error:', e)
  }
  isPlaying = false
}

export async function playTimerCompleteSound(): Promise<void> {
  try {
    const source = loadTimerSoundSource()
    if (!source) {
      console.warn('Timer sound file not found')
      return
    }
    if (timerSound) {
      timerSound.remove()
    }
    timerSound = createAudioPlayer(source)
    timerSound.loop = false
    timerSound.volume = 1.0
    timerSound.play()
  } catch (e) {
    console.warn('Timer sound error:', e)
  }
}

export async function stopTimerSound(): Promise<void> {
  try {
    if (timerSound) {
      timerSound.remove()
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
