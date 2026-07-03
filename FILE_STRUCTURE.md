# Clock App - File Structure

```
clock-app/
├── app.json                          # Expo config with plugins, permissions, background modes
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
│
├── src/
│   ├── app/
│   │   ├── _layout.tsx               # Root layout with providers
│   │   ├── index.tsx                 # Entry point
│   │   └── (tabs)/
│   │       ├── _layout.tsx           # Bottom tab navigator
│   │       ├── clock.tsx             # Module 1: Standard Clock
│   │       ├── world-clock.tsx       # Module 2: World Clock
│   │       ├── stopwatch.tsx         # Module 3: Stopwatch
│   │       ├── timer.tsx             # Module 4: Timer
│   │       └── alarms.tsx            # Module 5: Alarms
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Switch.tsx
│   │   │   ├── TimePicker.tsx
│   │   │   └── index.ts
│   │   ├── clock/
│   │   │   ├── DigitalClock.tsx
│   │   │   ├── AnalogClock.tsx       # Uses @shopify/react-native-skia
│   │   │   ├── ClockFace.tsx
│   │   │   ├── ClockHand.tsx
│   │   │   └── index.ts
│   │   ├── world-clock/
│   │   │   ├── WorldClockCard.tsx
│   │   │   ├── TimezoneSearch.tsx
│   │   │   └── index.ts
│   │   ├── stopwatch/
│   │   │   ├── StopwatchDisplay.tsx
│   │   │   ├── LapList.tsx
│   │   │   ├── StopwatchControls.tsx
│   │   │   └── index.ts
│   │   ├── timer/
│   │   │   ├── TimerDisplay.tsx
│   │   │   ├── CircularProgress.tsx  # Uses Reanimated/Skia
│   │   │   ├── TimerControls.tsx
│   │   │   ├── TimerPresets.tsx
│   │   │   └── index.ts
│   │   ├── alarms/
│   │   │   ├── AlarmCard.tsx
│   │   │   ├── AlarmForm.tsx
│   │   │   ├── RepeatSelector.tsx
│   │   │   ├── AlarmCompletionOverlay.tsx
│   │   │   └── index.ts
│   │   └── common/
│   │       ├── ThemeToggle.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorBoundary.tsx
│   │
│   ├── hooks/
│   │   ├── useClock.ts               # Core timekeeping - digital clock
│   │   ├── useAnalogClock.ts         # Core timekeeping - analog (60fps)
│   │   ├── useStopwatch.ts           # Drift-free stopwatch logic
│   │   ├── useTimer.ts               # Drift-free timer logic
│   │   ├── useWorldClock.ts          # Multi-timezone handling
│   │   ├── useAlarms.ts              # Alarm scheduling & persistence
│   │   ├── useTheme.ts               # Theme management
│   │   ├── useBackground.ts          # App state (foreground/background)
│   │   ├── usePermissions.ts         # Notifications, background tasks
│   │   └── index.ts
│   │
│   ├── stores/
│   │   ├── clockStore.ts             # Zeitgeist: current time, format
│   │   ├── worldClockStore.ts        # Timezones, cities
│   │   ├── stopwatchStore.ts         # Stopwatch state, laps
│   │   ├── timerStore.ts             # Timer state, presets
│   │   ├── alarmStore.ts             # Alarms, scheduling
│   │   ├── themeStore.ts             # Dark/light/system
│   │   ├── settingsStore.ts          # App settings
│   │   └── index.ts
│   │
│   ├── services/
│   │   ├── timekeeping.ts            # Core utilities: Date.now(), performance.now()
│   │   ├── timezone.ts               # IANA timezone handling, DST-safe
│   │   ├── notifications.ts          # OS-level notifications (expo-notifications)
│   │   ├── backgroundTask.ts         # Background task registration
│   │   ├── storage.ts                # MMKV/AsyncStorage persistence
│   │   ├── audio.ts                  # Sound playback, haptics
│   │   ├── permissions.ts            # Permission handling
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── date.ts                   # Date formatting, parsing
│   │   ├── format.ts                 # Time formatting (HH:mm:ss.SSS)
│   │   ├── timezone.ts               # Timezone helpers
│   │   ├── color.ts                  # Theme colors
│   │   ├── animation.ts              # Reanimated/Skia shared values
│   │   └── index.ts
│   │
│   ├── constants/
│   │   ├── timezones.ts              # IANA timezone list with cities
│   │   ├── presets.ts                # Timer presets
│   │   ├── theme.ts                  # Theme tokens
│   │   ├── sounds.ts                 # Alarm sounds
│   │   └── index.ts
│   │
│   ├── types/
│   │   ├── clock.ts
│   │   ├── worldClock.ts
│   │   ├── stopwatch.ts
│   │   ├── timer.ts
│   │   ├── alarm.ts
│   │   ├── theme.ts
│   │   └── index.ts
│   │
│   └── styles/
│       ├── global.ts                 # Global styles, theme-aware
│       ├── layout.ts                 # Layout constants
│       └── index.ts
│
├── assets/
│   ├── sounds/
│   │   ├── alarm-default.mp3
│   │   ├── alarm-gentle.mp3
│   │   ├── timer-complete.mp3
│   │   └── tick.mp3
│   ├── fonts/
│   │   ├── Inter-Bold.ttf
│   │   ├── Inter-Medium.ttf
│   │   ├── Inter-Regular.ttf
│   │   └── Inter-Light.ttf
│   └── images/
│       ├── icon.png
│       ├── splash.png
│       └── adaptive-icon.png
│
├── android/
│   └── (native config if needed)
│
├── ios/
│   └── (native config if needed)
│
└── scripts/
    └── setup-dev.sh                  # Development setup script
```