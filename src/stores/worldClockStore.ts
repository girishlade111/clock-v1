import { create } from 'zustand'
import type { TimezoneCity } from '../types'
import { COMMON_CITIES } from '../constants/timezones'

interface WorldClockStore {
  cities: TimezoneCity[]
  addCity: (city: TimezoneCity) => void
  removeCity: (id: string) => void
  reorderCities: (cities: TimezoneCity[]) => void
  resetToDefaults: () => void
}

const DEFAULT_CITY_IDS = ['new-york', 'london', 'tokyo', 'sydney']

function getDefaultCities(): TimezoneCity[] {
  return DEFAULT_CITY_IDS
    .map((id) => COMMON_CITIES.find((c) => c.id === id))
    .filter(Boolean) as TimezoneCity[]
}

export const useWorldClockStore = create<WorldClockStore>((set) => ({
  cities: getDefaultCities(),
  addCity: (city) =>
    set((state) => {
      if (state.cities.some((c) => c.id === city.id)) return state
      return { cities: [...state.cities, city] }
    }),
  removeCity: (id) =>
    set((state) => ({
      cities: state.cities.filter((c) => c.id !== id),
    })),
  reorderCities: (cities) => set({ cities }),
  resetToDefaults: () => set({ cities: getDefaultCities() }),
}))
