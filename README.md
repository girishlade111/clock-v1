#

A pruilt with Expo SDK 51. Includes digital/analog clock, world clock, stopwatch, timer, and alarms modules. Designed for drift-free timekeeping and OS-level alarm scheduling.

## Features

- **Clock** — Digital and analog face with configurable sweeping second hand
- **World Clock** — Track time across 41+ IANA cities with DST-correct offsets
- **Stopwatch** — Lap timing with drift-free elapsed calculation
- **Timer** — Presets, manual input, circular progress, and completion notification
- **Alarms** — Persistent to device storage, OS-scheduled notifications survive app kill

## Tech Stack

- Expo SDK ~51.0 · React Native 0.74.5 · TypeScript 5.3
- [Zustand](https://github.com/pmndrs/zustand) — state management
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) — 60fps animations
- [@shopify/react-native-skia](https://shopify.github.io/react-native-skia/) — analog clock and circular progress
- [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) — encrypted local storage
- [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) — OS alarm scheduling
- [date-fns](https://date-fns.org/) + date-fns-tz — timezone formatting

## Getting Started

```bash
git clone <repo-url> clock-app
cd clock-app
npx expo install
npx expo prebuild
npx expo run:ios    # or run:android
```

## Project Structure

```
src/
├── app/              # Expo Router screens (5 tabs)
│   ├── _layout.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── clock.tsx
│   │   ├── world-clock.tsx
│   │   ├── stopwatch.tsx
│   │   ├── timer.tsx
│   │   └── alarms.tsx
│   └── index.tsx
├── components/       # Feature & UI components
│   ├── alarms/       # AlarmCard, AlarmForm, RepeatSelector, AlarmCompletionOverlay
│   ├── clock/        # DigitalClock, AnalogClock (Skia)
│   ├── common/       # ThemeToggle, LoadingSpinner
│   ├── stopwatch/    # StopwatchDisplay, StopwatchControls, LapList
│   ├── timer/        # TimerDisplay, TimerControls, TimerPresets, CircularProgress (Skia)
│   ├── ui/           # Button, Switch, Modal
│   └── world-clock/  # WorldClockCard, TimezoneSearch
├── constants/        # Theme, timezones, presets, sounds
├── hooks/            # useClock, useStopwatch, useTimer, useAlarms, useWorldClock, etc.
├── services/         # Timekeeping, storage, notifications, audio, permissions, background tasks
├── stores/           # Zustand stores (theme, clock, worldClock, stopwatch, timer, alarm)
├── types/            # TypeScript definitions
└── utils/            # Date, format, color, animation helpers
```

## Asset Requirements

Place these files before building:

| Path                               | Description            |
| ---------------------------------- | ---------------------- |
| `assets/images/icon.png`           | App icon (1024×1024)   |
| `assets/images/splash.png`         | Splash screen          |
| `assets/images/adaptive-icon.png`  | Android adaptive icon  |
| `assets/sounds/alarm-default.mp3`  | Default alarm ringtone |
| `assets/sounds/alarm-gentle.mp3`   | Gentle alarm ringtone  |
| `assets/sounds/alarm-marimba.mp3`  | Marimba alarm ringtone |
| `assets/sounds/alarm-bell.mp3`     | Bell alarm ringtone    |
| `assets/sounds/timer-complete.mp3` | Timer completion sound |

## License

MIT
