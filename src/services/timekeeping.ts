let nowOverride: number | null = null

export function setNowForTesting(ts: number | null) {
  nowOverride = ts
}

export function getNow(): number {
  return nowOverride ?? Date.now()
}

export function getElapsedMilliseconds(startTimestamp: number): number {
  return Math.max(0, getNow() - startTimestamp)
}

export function getRemainingMilliseconds(endTimestamp: number): number {
  return Math.max(0, endTimestamp - getNow())
}

export function createStopwatchCalculator() {
  return {
    computeElapsed(startTimestamp: number, accumulatedMs: number): number {
      if (startTimestamp === 0) return accumulatedMs
      return accumulatedMs + getElapsedMilliseconds(startTimestamp)
    },
    computeStartTimestamp(accumulatedMs: number): number {
      return getNow() - accumulatedMs
    },
  }
}

export function createTimerCalculator() {
  return {
    computeRemaining(endTimestamp: number): number {
      return getRemainingMilliseconds(endTimestamp)
    },
    computeEndTimestamp(durationMs: number): number {
      return getNow() + durationMs
    },
  }
}

export function getTimeForTimezone(date: Date, timezone: string): Date {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3,
  })
  const parts = formatter.formatToParts(date)
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0)
  return new Date(
    get('year'),
    get('month') - 1,
    get('day'),
    get('hour'),
    get('minute'),
    get('second'),
    get('fractionalSecond'),
  )
}
