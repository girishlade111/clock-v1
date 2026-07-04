export function getDayName(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}

export function getMonthName(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long' })
}

export function getFormattedDate(date: Date): string {
  const day = getDayName(date)
  const month = getMonthName(date)
  const dayNum = date.getDate()
  const year = date.getFullYear()
  return `${day}, ${month} ${dayNum}, ${year}`
}

export function getShortFormattedDate(date: Date): string {
  const month = getMonthName(date)
  const dayNum = date.getDate()
  return `${month} ${dayNum}`
}

export function isToday(date: Date, reference: Date): boolean {
  return (
    date.getFullYear() === reference.getFullYear() &&
    date.getMonth() === reference.getMonth() &&
    date.getDate() === reference.getDate()
  )
}

export function getUTCOffsetString(tzName: string): string {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: tzName,
    timeZoneName: 'short',
  })
  const parts = formatter.formatToParts(now)
  const tzPart = parts.find((p) => p.type === 'timeZoneName')
  return tzPart?.value ?? ''
}

export function getTimezoneAbbreviation(tzName: string): string {
  try {
    const now = new Date()
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tzName,
      timeZoneName: 'short',
    })
    const parts = formatter.formatToParts(now)
    return parts.find((p) => p.type === 'timeZoneName')?.value ?? ''
  } catch {
    return ''
  }
}
