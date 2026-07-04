import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const SCREEN_WIDTH = width
export const SCREEN_HEIGHT = height

export const colors = {
  light: {
    background: '#F2F2F7',
    surface: '#FFFFFF',
    surfaceSecondary: '#E8E8ED',
    primary: '#007AFF',
    primaryLight: '#4DA3FF',
    text: '#000000',
    textSecondary: '#8E8E93',
    textTertiary: '#C7C7CC',
    border: '#D1D1D6',
    separator: '#E5E5EA',
    accent: '#FF9500',
    destructive: '#FF3B30',
    success: '#34C759',
    lapFast: '#34C759',
    lapSlow: '#FF3B30',
    tabBar: '#FFFFFF',
    tabBarBorder: '#C6C6C8',
    modalOverlay: 'rgba(0,0,0,0.4)',
    analogClockFace: '#FFFFFF',
    analogClockBorder: '#D1D1D6',
    analogHourHand: '#1C1C1E',
    analogMinuteHand: '#1C1C1E',
    analogSecondHand: '#FF3B30',
    analogTick: '#8E8E93',
    analogCenterDot: '#FF3B30',
    worldClockDay: '#FFF3CD',
    worldClockNight: '#1A1A2E',
    ringTrack: '#E8E8ED',
    ringProgress: '#007AFF',
  },
  dark: {
    background: '#000000',
    surface: '#1C1C1E',
    surfaceSecondary: '#2C2C2E',
    primary: '#0A84FF',
    primaryLight: '#4DA3FF',
    text: '#FFFFFF',
    textSecondary: '#98989D',
    textTertiary: '#48484A',
    border: '#38383A',
    separator: '#38383A',
    accent: '#FF9F0A',
    destructive: '#FF453A',
    success: '#30D158',
    lapFast: '#30D158',
    lapSlow: '#FF453A',
    tabBar: '#1C1C1E',
    tabBarBorder: '#38383A',
    modalOverlay: 'rgba(0,0,0,0.6)',
    analogClockFace: '#1C1C1E',
    analogClockBorder: '#38383A',
    analogHourHand: '#FFFFFF',
    analogMinuteHand: '#FFFFFF',
    analogSecondHand: '#FF453A',
    analogTick: '#98989D',
    analogCenterDot: '#FF453A',
    worldClockDay: '#1C3A1C',
    worldClockNight: '#0A0A2E',
    ringTrack: '#2C2C2E',
    ringProgress: '#0A84FF',
  },
}

export type ColorScheme = typeof colors.light

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
}

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  display1: 48,
  display2: 64,
  display3: 96,
}

export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
}
