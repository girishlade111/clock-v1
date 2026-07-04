import { create } from 'zustand'
import type { ThemeMode } from '../types'

interface ThemeStore {
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  themeMode: 'dark',
  setThemeMode: (themeMode) => set({ themeMode }),
}))
