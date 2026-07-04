import { useState, useEffect } from 'react'
import { useWorldClockStore } from '../stores/worldClockStore'
import { useClockStore } from '../stores/clockStore'
import { formatTime, formatTimeWithSeconds, getFormattedDate } from '../utils/format'
import { getTimezoneAbbreviation } from '../utils/date'
import type { TimezoneCity, TimeFormat12H } from '../types'

interface WorldCityTime {
  city: TimezoneCity
  time: string
  date: string
  abbreviation: string
  offset: string
  isDaytime: boolean
}

export function useWorldClock() {
  const { cities, addCity, removeCity } = useWorldClockStore()
  const { timeFormat } = useClockStore()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const cityTimes: WorldCityTime[] = cities.map((city) => {
    const time = formatTimeWithSeconds(now, timeFormat, city.timezoneName)
    const date = new Date(
      now.toLocaleString('en-US', { timeZone: city.timezoneName }),
    )
    const abbreviation = getTimezoneAbbreviation(city.timezoneName)
    const isDaytime = date.getHours() >= 6 && date.getHours() < 18

    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const localDate = new Date(
      now.toLocaleString('en-US', { timeZone: localTimezone }),
    )
    const diffMs = date.getTime() - localDate.getTime()
    const diffHours = diffMs / 3600000
    const offsetStr = diffHours >= 0
      ? `+${diffHours.toFixed(1)}h`
      : `${diffHours.toFixed(1)}h`

    return {
      city,
      time,
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
      abbreviation,
      offset: diffHours === 0 ? 'Same time' : `${offsetStr}`,
      isDaytime,
    }
  })

  return {
    cityTimes,
    allCities: cities,
    addCity,
    removeCity,
  }
}
