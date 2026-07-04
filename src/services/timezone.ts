export function getLocalTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function getCurrentOffset(tz: string): number {
  const now = new Date()
  const utc = now.getTime()
  const tzTime = new Date(
    now.toLocaleString('en-US', { timeZone: tz }),
  ).getTime()
  return (tzTime - utc) / 3600000
}

export function isCurrentlyDST(tz: string): boolean {
  const jan = new Date(new Date().getFullYear(), 0, 1)
  const jul = new Date(new Date().getFullYear(), 6, 1)
  const janOffset = -new Date(
    jan.toLocaleString('en-US', { timeZone: tz }),
  ).getTimezoneOffset()
  const julOffset = -new Date(
    jul.toLocaleString('en-US', { timeZone: tz }),
  ).getTimezoneOffset()
  return janOffset !== julOffset
}

export function getTimeDifferenceMinutes(tz1: string, tz2: string): number {
  const now = new Date()
  const t1 = new Date(now.toLocaleString('en-US', { timeZone: tz1 })).getTime()
  const t2 = new Date(now.toLocaleString('en-US', { timeZone: tz2 })).getTime()
  return Math.round((t1 - t2) / 60000)
}
