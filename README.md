# ⏰ Clock App

A **feature-rich, cross-platform clock application** built with React Native (Expo) — featuring a live digital/analog clock, world clock with 40+ cities, a precision stopwatch with lap timing, a countdown timer with presets, and a fully-featured alarm system with snooze and repeat support.

![Platforms](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue) ![Expo](https://img.shields.io/badge/expo-56-blueviolet) ![TypeScript](https://img.shields.io/badge/typescript-5.6-blue) ![License](https://img.shields.io/badge/license-CC0%201.0-lightgrey)

---

## 📋 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Detailed Feature Breakdown](#-detailed-feature-breakdown)
  - [Clock Tab](#1-clock-tab)
  - [World Clock Tab](#2-world-clock-tab)
  - [Stopwatch Tab](#3-stopwatch-tab)
  - [Timer Tab](#4-timer-tab)
  - [Alarms Tab](#5-alarms-tab)
- [State Management](#-state-management)
- [Services Layer](#-services-layer)
- [Theming](#-theming)
- [Background Operations](#-background-operations)
- [Permissions](#-permissions)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🕐 Clock

- **Digital clock** display with live-updating hours, minutes, and seconds
- **Analog clock** with smooth or tick-based second hand (powered by `react-native-reanimated`)
- Toggle between **12-hour and 24-hour** time formats
- Date display with full weekday, month, day, and year
- Settings card for quick toggling of analog mode and sweeping second hand

### 🌍 World Clock

- **40+ cities** across 5 continents (Americas, Europe, Asia, Africa, Oceania)
- Real-time time display per city with **timezone abbreviation**
- **Day/night indicators** — visual distinction between daytime (6 AM–6 PM) and nighttime
- **Time offset** relative to the user's local timezone
- Add/remove cities via a searchable timezone picker
- Default cities: New York, London, Tokyo, Sydney

### ⏱ Stopwatch

- **Millisecond-precision** timing (display format: `MM:SS.mm`)
- **Lap timing** with automatic lap/split calculation
- Start, pause, resume, and reset controls
- **Background persistence** — timer continues running when app is backgrounded
- Lap list with fast/slow lap color coding

### ⏲ Timer

- **Preset durations**: 30s, 1m, 3m, 5m, 10m, 15m, 30m, 1h
- **Custom time input** — hours, minutes, seconds with numeric keypad
- **Circular progress indicator** with animated ring
- **Add 1 minute** while running or after completion
- **Background persistence** — timer continues counting down in background
- **Completion alert** — plays sound and triggers haptic feedback
- Countdown display format: `HH:MM:SS` or `MM:SS`

### 🔔 Alarms

- **Create, edit, and delete** alarms
- **Repeat types**: Once, Daily, Weekdays, Weekends, Custom (individual day selection)
- **Snooze** — configurable snooze duration (1, 3, 5, 10, or 15 minutes)
- **4 alarm sounds**: Radar, Gentle, Marimba, Bell
- **Alarm firing overlay** — full-screen alert with dismiss and snooze buttons
- **Automatic alarm check** every 15 seconds
- **Notification scheduling** for reliable alarm delivery
- Alarms sorted by time (earliest first)

### 🎨 Theme

- **Light mode**, **Dark mode**, and **System** (follows device settings)
- Comprehensive color system with 30+ semantic color tokens
- Dark mode is the default theme
- Theme toggle accessible from the Clock tab

---

## 📸 Screenshots

| Clock (Digital) | Clock (Analog) | World Clock | Stopwatch | Timer | Alarms |
| :-------------: | :------------: | :---------: | :-------: | :---: | :----: |
|       🕐        |       🕰️       |     🌍      |     ⏱     |   ⏲   |   🔔   |

_(Screenshots coming soon — run the app to see it in action!)_

---

## 🛠 Tech Stack

| Category             | Technology                                                                               | Version                 |
| -------------------- | ---------------------------------------------------------------------------------------- | ----------------------- |
| **Framework**        | [Expo](https://expo.dev)                                                                 | ~56.0.0                 |
| **UI Library**       | [React Native](https://reactnative.dev)                                                  | 0.76.7                  |
| **Language**         | [TypeScript](https://www.typescriptlang.org)                                             | ~5.6.0                  |
| **Navigation**       | [Expo Router](https://docs.expo.dev/router/introduction/)                                | ~4.0.0                  |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand)                                             | ^5.0.0                  |
| **Animations**       | [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)           | ~3.16.0                 |
| **Graphics**         | [@shopify/react-native-skia](https://shopify.github.io/react-native-skia/)               | ~1.5.0                  |
| **Storage**          | [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)                       | ~3.2.0                  |
| **Date Utilities**   | [date-fns](https://date-fns.org)                                                         | ^4.0.0                  |
| **Timezones**        | [date-fns-tz](https://github.com/marnusw/date-fns-tz)                                    | ^3.0.0                  |
| **Gestures**         | [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/) | ~2.20.0                 |
| **Notifications**    | [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)           | ~0.29.0                 |
| **Audio**            | [expo-av](https://docs.expo.dev/versions/latest/sdk/av/)                                 | (via expo-audio ~0.5.0) |
| **Haptics**          | [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)                       | ~14.0.0                 |
| **Background Tasks** | [expo-background-fetch](https://docs.expo.dev/versions/latest/sdk/background-fetch/)     | ~14.0.0                 |
| **Linting**          | ESLint (expo-config)                                                                     | ^9.0.0                  |
| **Testing**          | Jest + @testing-library/react-native                                                     | ^29.7.0                 |

---

## 🏗 Architecture

The app follows a **feature-based modular architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    Expo Router (Navigation)              │
│  ┌──────────┬──────────┬──────────┬──────────┬────────┐ │
│  │  Clock   │  World   │Stopwatch │  Timer   │ Alarms │ │
│  │  Screen  │  Screen  │  Screen  │  Screen  │ Screen │ │
│  └────┬─────┴────┬─────┴────┬─────┴────┬─────┴───┬────┘ │
│       │          │          │          │          │       │
├───────┴──────────┴──────────┴──────────┴──────────┴───────┤
│                    Custom Hooks Layer                      │
│  useClock │ useWorldClock │ useStopwatch │ useTimer │      │
│  useAlarms │ useTheme │ useBackground │ usePermissions     │
├───────────────────────────────────────────────────────────┤
│                    Zustand Stores                          │
│  clockStore │ worldClockStore │ stopwatchStore │           │
│  timerStore │ alarmStore │ themeStore                       │
├───────────────────────────────────────────────────────────┤
│                    Services Layer                          │
│  audio │ notifications │ backgroundTask │ permissions │    │
│  storage │ timekeeping │ timezone                          │
├───────────────────────────────────────────────────────────┤
│                    Constants & Utils                       │
│  theme │ presets │ sounds │ timezones │ format │ date │    │
│  color │ animation                                         │
└───────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Screens** (in `src/app/`) render UI components and wire up hooks
2. **Hooks** (in `src/hooks/`) manage real-time state updates (intervals, animation frames) and bridge stores to screens
3. **Stores** (in `src/stores/`) hold all application state using Zustand, with actions for state mutations
4. **Services** (in `src/services/`) handle platform-specific operations (audio playback, notifications, background tasks, persistent storage)
5. **Constants** (in `src/constants/`) define theme tokens, presets, sound configurations, and timezone data
6. **Utils** (in `src/utils/`) provide pure utility functions for formatting, date manipulation, color handling, and animations

---

## 📁 Project Structure

```
clock-v1/
├── assets/                          # Static assets
│   ├── fonts/                       # Custom fonts
│   ├── images/                      # App icon, splash, adaptive icon, favicon
│   └── sounds/                      # Alarm and timer sound files
│       ├── alarm-default.mp3
│       ├── alarm-gentle.mp3
│       ├── alarm-marimba.mp3
│       ├── alarm-bell.mp3
│       └── timer-complete.mp3
│
├── src/
│   ├── app/                         # Expo Router screens
│   │   ├── _layout.tsx              # Root layout (GestureHandler, StatusBar, init)
│   │   ├── index.tsx                # Entry point (redirects to /clock)
│   │   └── (tabs)/                  # Tab navigation
│   │       ├── _layout.tsx          # Tab bar configuration
│   │       ├── clock.tsx            # Clock screen
│   │       ├── world-clock.tsx      # World clock screen
│   │       ├── stopwatch.tsx        # Stopwatch screen
│   │       ├── timer.tsx            # Timer screen
│   │       └── alarms.tsx           # Alarms screen
│   │
│   ├── components/                  # Reusable UI components
│   │   ├── alarms/                  # Alarm-related components
│   │   │   ├── AlarmCard.tsx        # Alarm list item
│   │   │   ├── AlarmCompletionOverlay.tsx  # Full-screen alarm firing overlay
│   │   │   ├── AlarmForm.tsx        # Alarm creation/editing form
│   │   │   ├── RepeatSelector.tsx   # Repeat type/day selector
│   │   │   └── index.ts
│   │   ├── clock/                   # Clock display components
│   │   │   ├── AnalogClock.tsx      # Analog clock face with hands
│   │   │   ├── DigitalClock.tsx     # Digital time/date display
│   │   │   └── index.ts
│   │   ├── common/                  # Shared components
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ThemeToggle.tsx      # Light/dark/system theme switcher
│   │   ├── stopwatch/               # Stopwatch components
│   │   │   ├── StopwatchDisplay.tsx # Time display
│   │   │   ├── StopwatchControls.tsx # Start/pause/reset/lap buttons
│   │   │   ├── LapList.tsx          # Lap times list
│   │   │   └── index.ts
│   │   ├── timer/                   # Timer components
│   │   │   ├── TimerDisplay.tsx     # Countdown display with progress
│   │   │   ├── TimerControls.tsx    # Start/pause/resume/reset/add minute
│   │   │   ├── TimerPresets.tsx     # Quick preset buttons
│   │   │   ├── CircularProgress.tsx # Animated circular progress ring
│   │   │   └── index.ts
│   │   ├── ui/                      # Base UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Switch.tsx           # Toggle switch
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts
│   │   └── world-clock/             # World clock components
│   │       ├── WorldClockCard.tsx    # City time card
│   │       ├── TimezoneSearch.tsx    # Searchable timezone picker
│   │       └── index.ts
│   │
│   ├── constants/                   # App-wide constants
│   │   ├── theme.ts                 # Color tokens, spacing, font sizes, border radii
│   │   ├── presets.ts               # Timer presets, snooze options, weekday labels
│   │   ├── sounds.ts                # Alarm sound configurations
│   │   └── timezones.ts             # 40+ city timezone database
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── index.ts                 # Barrel export
│   │   ├── useClock.ts              # Real-time clock with requestAnimationFrame
│   │   ├── useAnalogClock.ts        # Analog clock hand angles with Reanimated
│   │   ├── useStopwatch.ts          # Stopwatch with 16ms interval updates
│   │   ├── useTimer.ts              # Timer with 50ms interval updates
│   │   ├── useWorldClock.ts         # Multi-timezone city time calculations
│   │   ├── useAlarms.ts             # Alarm monitoring and firing logic
│   │   ├── useTheme.ts              # Theme resolution (light/dark/system)
│   │   ├── useBackground.ts         # App state change detection
│   │   └── usePermissions.ts        # Notification permission management
│   │
│   ├── services/                    # Platform services
│   │   ├── audio.ts                 # Sound playback and haptic feedback
│   │   ├── notifications.ts         # Local notification scheduling
│   │   ├── backgroundTask.ts        # Background fetch registration
│   │   ├── permissions.ts           # Notification permission requests
│   │   ├── storage.ts               # MMKV persistent storage wrapper
│   │   ├── timekeeping.ts           # Time calculation utilities
│   │   └── timezone.ts              # Timezone offset and DST utilities
│   │
│   ├── stores/                      # Zustand state stores
│   │   ├── index.ts                 # Barrel export
│   │   ├── clockStore.ts            # Clock display preferences
│   │   ├── worldClockStore.ts       # Selected cities
│   │   ├── stopwatchStore.ts        # Stopwatch state and laps
│   │   ├── timerStore.ts            # Timer state and countdown logic
│   │   ├── alarmStore.ts            # Alarms CRUD and firing state
│   │   └── themeStore.ts            # Theme mode preference
│   │
│   ├── types/                       # TypeScript type definitions
│   │   └── index.ts                 # All shared types and interfaces
│   │
│   └── utils/                       # Utility functions
│       ├── format.ts                # Time/date formatting (digital, countdown, lap, alarm)
│       ├── date.ts                  # Date helpers (day names, timezone abbreviations)
│       ├── color.ts                 # Theme color resolution
│       └── animation.ts             # Reanimated animation presets
│
├── app.d.ts                         # TypeScript module declarations (images, audio)
├── babel.config.js                  # Babel config with Reanimated plugin
├── tsconfig.json                    # TypeScript configuration with path aliases
├── package.json                     # Dependencies and scripts
├── .gitignore
├── LICENSE                          # CC0 1.0 Universal (Public Domain)
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** or **pnpm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **iOS**: Xcode (for iOS simulator)
- **Android**: Android Studio (for Android emulator)
- **Expo Go** app on your physical device (optional, for testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/girishlade111/clock-v1.git
cd clock-v1

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

### Running the App

```bash
# Start the Expo development server
npm start
# or
npx expo start

# Run on specific platforms
npm run android    # Android emulator/device
npm run ios        # iOS simulator (macOS only)
npm run web        # Web browser
```

### Available Scripts

| Script              | Description                   |
| ------------------- | ----------------------------- |
| `npm start`         | Start Expo development server |
| `npm run android`   | Run on Android                |
| `npm run ios`       | Run on iOS                    |
| `npm run web`       | Run on web browser            |
| `npm run lint`      | Run ESLint                    |
| `npm run typecheck` | Run TypeScript type checking  |
| `npm test`          | Run Jest test suite           |

---

## ⚙️ Configuration

### App Configuration (`package.json` → `expo` key)

| Setting                  | Value                      | Description               |
| ------------------------ | -------------------------- | ------------------------- |
| `name`                   | `Clock`                    | Display name              |
| `slug`                   | `clock-app`                | Expo project slug         |
| `orientation`            | `portrait`                 | Locked to portrait        |
| `icon`                   | `./assets/images/icon.png` | App icon                  |
| `userInterfaceStyle`     | `automatic`                | Follows system appearance |
| `splash.backgroundColor` | `#000000`                  | Black splash screen       |

### iOS Configuration

- **Bundle Identifier**: `com.clockapp.app`
- **Background Modes**: Audio, Background Fetch, Remote Notifications
- **Supports**: iPhone and iPad

### Android Configuration

- **Package**: `com.clockapp.app`
- **Permissions**: VIBRATE, RECEIVE_BOOT_COMPLETED, WAKE_LOCK, USE_FULL_SCREEN_INTENT, SCHEDULE_EXACT_ALARM, FOREGROUND_SERVICE
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 35 (Android 15)
- **Compile SDK**: 35

### TypeScript Path Aliases

```json
{
  "paths": {
    "@/*": ["src/*"]
  }
}
```

Use `@/` to import from the `src/` directory, e.g.:

```typescript
import { useClock } from "@/hooks/useClock";
import { colors } from "@/constants/theme";
```

---

## 📖 Detailed Feature Breakdown

### 1. Clock Tab

**File**: `src/app/(tabs)/clock.tsx`

The Clock tab serves as the home screen and offers two display modes:

#### Digital Clock

- Rendered by the `DigitalClock` component
- Displays time in large format with seconds
- Shows the full date below (e.g., "Monday, January 1, 2026")
- Updates every ~16ms via `requestAnimationFrame` for smooth second transitions

#### Analog Clock

- Rendered by the `AnalogClock` component using `react-native-reanimated`
- Three animated hands: hour, minute, and second
- **Sweeping second hand** (default): Smooth continuous motion using `withSpring`
- **Tick second hand**: Discrete step every second
- Hand angles calculated from current time:
  - Second hand: `(seconds / 60) * 360`
  - Minute hand: `(minutes + seconds/60) / 60 * 360`
  - Hour hand: `(hours % 12 + minutes/60) / 12 * 360`

#### Settings

- Toggle between digital and analog display
- When analog is active, toggle sweeping/tick second hand
- Theme switcher (light/dark/system)

**Hook**: `useClock` — uses `requestAnimationFrame` for high-frequency updates
**Hook**: `useAnalogClock` — manages Reanimated shared values for hand angles

---

### 2. World Clock Tab

**File**: `src/app/(tabs)/world-clock.tsx`

#### City Database

- **40 cities** across 5 continents in `src/constants/timezones.ts`
- Each city has: id, name, country, continent, and IANA timezone name
- Default cities: New York, London, Tokyo, Sydney

#### City Card Display

Each `WorldClockCard` shows:

- **City name** and **country**
- **Current time** with seconds and timezone abbreviation (e.g., "EST", "IST", "JST")
- **Date** with full weekday and month
- **Time offset** relative to local time (e.g., "+3.0h", "-5.0h", "Same time")
- **Day/night indicator** — background color changes based on whether it's daytime (6 AM–6 PM) or nighttime in that city

#### Adding/Removing Cities

- Tap "+ Add" to open a searchable timezone picker (`TimezoneSearch`)
- Search by city name or scroll through the full list
- Swipe or tap to remove cities from your list
- Duplicate prevention — can't add the same city twice

**Hook**: `useWorldClock` — recalculates all city times every second

---

### 3. Stopwatch Tab

**File**: `src/app/(tabs)/stopwatch.tsx`

#### Core Functionality

- **Precision**: Updates every 16ms (~60fps)
- **Display format**: `MM:SS.mm` (minutes:seconds.centiseconds)
- **Maximum precision**: milliseconds, displayed as centiseconds (2 digits)

#### Controls

| Button     | Action                                        |
| ---------- | --------------------------------------------- |
| **Start**  | Begins timing from zero                       |
| **Pause**  | Pauses the stopwatch, preserving elapsed time |
| **Resume** | Continues from where it was paused            |
| **Reset**  | Stops and resets to zero, clears all laps     |
| **Lap**    | Records a lap time while running              |

#### Lap Timing

- Each lap records:
  - **Lap time**: Duration since the last lap
  - **Split time**: Total elapsed time at the lap moment
- Laps are numbered sequentially (1, 2, 3, ...)
- **Color coding**: Fastest lap is green, slowest lap is red
- Lap list is scrollable

#### Background Behavior

- When the app goes to background, the stopwatch continues tracking
- On return to foreground, elapsed time is recalculated from the stored start timestamp
- Background fetch task persists state periodically

**Hook**: `useStopwatch` — manages 16ms update interval and bridges store to UI
**Store**: `stopwatchStore` — handles start/pause/resume/reset/lap with accumulated time calculation

---

### 4. Timer Tab

**File**: `src/app/(tabs)/timer.tsx`

#### Setting a Timer

Two ways to set a timer:

1. **Presets** (shown when idle):
   - 30s, 1m, 3m, 5m, 10m, 15m, 30m, 1h
   - Defined in `src/constants/presets.ts`

2. **Custom input** (shown when idle):
   - Hours, minutes, and seconds fields
   - Numeric keypad input with 2-digit limit per field
   - Labels: Hr, Min, Sec

#### Timer Display

- **Countdown format**: `HH:MM:SS` (when hours > 0) or `MM:SS` (when hours = 0)
- **Circular progress ring** (`CircularProgress` component):
  - Animated ring that shrinks as time counts down
  - Changes appearance when timer is completed
  - Uses `@shopify/react-native-skia` for smooth rendering

#### Controls

| Button     | Action                                                    |
| ---------- | --------------------------------------------------------- |
| **Start**  | Begins countdown                                          |
| **Pause**  | Pauses the countdown                                      |
| **Resume** | Continues countdown                                       |
| **Reset**  | Stops and returns to idle state                           |
| **+1 Min** | Adds 60 seconds (works while running or after completion) |

#### Completion

- Plays `timer-complete.mp3` sound
- Triggers haptic feedback (success notification)
- Progress ring shows completed state
- Timer can be restarted with +1 Min or reset

#### Background Behavior

- Timer continues counting down in background
- On foreground, recalculates remaining time from stored end timestamp
- Background fetch task persists state periodically
- Local notification scheduled for when timer completes in background

**Hook**: `useTimer` — manages 50ms update interval, progress calculation, completion detection
**Store**: `timerStore` — handles all timer state transitions with end-timestamp-based tracking

---

### 5. Alarms Tab

**File**: `src/app/(tabs)/alarms.tsx`

#### Alarm Management

- **List view**: All alarms displayed as cards, sorted by time (earliest first)
- **Empty state**: Friendly message when no alarms exist
- **Create**: Tap "+ New" to open the alarm creation form
- **Edit**: Tap any alarm card to edit
- **Delete**: Available in edit mode
- **Toggle**: Enable/disable alarms with a switch on each card

#### Alarm Form (`AlarmForm`)

- **Time picker**: Hour and minute selectors with AM/PM for 12h format
- **Label**: Custom text label for the alarm
- **Repeat type** (`RepeatSelector`):
  - Once, Daily, Weekdays (Mon–Fri), Weekends (Sat–Sun), Custom
  - Custom allows individual day selection (Sun–Sat)
- **Sound**: Select from 4 alarm sounds (Radar, Gentle, Marimba, Bell)
- **Snooze**: Configurable duration (1, 3, 5, 10, or 15 minutes)

#### Alarm Firing

- **Monitoring**: Checks every 15 seconds if any enabled alarm should fire
- **Trigger condition**: Current time matches alarm time AND repeat schedule allows today
- **Firing overlay** (`AlarmCompletionOverlay`):
  - Full-screen modal with alarm label
  - **Dismiss**: Stops the alarm sound and dismisses
  - **Snooze**: Stops the alarm and reschedules it for `current time + snooze minutes`
- **Sound**: Plays selected alarm sound in a loop until dismissed/snoozed
- **Haptics**: Heavy impact feedback on alarm fire

#### Repeat Logic

| Repeat Type | Fires On                        |
| ----------- | ------------------------------- |
| `once`      | Next occurrence of the set time |
| `daily`     | Every day                       |
| `weekdays`  | Monday through Friday           |
| `weekends`  | Saturday and Sunday             |
| `custom`    | Selected days of the week       |

#### Notification Integration

- Local notifications are scheduled for each enabled alarm
- Android notification channel configured with MAX importance, vibration, and DND bypass
- iOS critical alert permission requested for reliable delivery

**Hook**: `useAlarms` — manages 15-second monitoring interval, firing detection, dismiss/snooze
**Store**: `alarmStore` — CRUD operations, firing state, snooze logic with time recalculation

---

## 🗄 State Management

The app uses **Zustand** for all state management, with 6 stores:

| Store             | State                                                    | Persistence      |
| ----------------- | -------------------------------------------------------- | ---------------- |
| `clockStore`      | Time format (12h/24h), analog toggle, smooth second hand | No (preferences) |
| `worldClockStore` | Selected cities array                                    | Yes (MMKV)       |
| `stopwatchStore`  | Status, start timestamp, accumulated time, laps          | Yes (MMKV)       |
| `timerStore`      | Status, total/remaining time, end timestamp              | Yes (MMKV)       |
| `alarmStore`      | Alarms array, firing alarm ID                            | Yes (MMKV)       |
| `themeStore`      | Theme mode (light/dark/system)                           | Yes (MMKV)       |

### Persistence Strategy

State is persisted using **MMKV** (via `react-native-mmkv`), a high-performance key-value storage engine:

- **Storage service** (`src/services/storage.ts`): Generic `getItem<T>` / `setItem<T>` wrapper
- **Keys**: `alarms`, `world_clock_cities`, `settings`, `stopwatch_state`, `timer_state`
- **Serialization**: JSON serialization/deserialization
- **Performance**: MMKV is synchronous and 30x faster than AsyncStorage

### State Flow Pattern

```
User Action → Screen → Hook → Store Action → State Update → Re-render
                                 ↓
                          Service Call (optional)
                          (audio, notifications, storage)
```

---

## 🔧 Services Layer

### Audio Service (`src/services/audio.ts`)

Manages all sound playback and haptic feedback:

- **Alarm sounds**: 4 looping sounds (Radar, Gentle, Marimba, Bell)
- **Timer sound**: Single-play completion sound
- **Audio mode**: Configured for background playback, silent mode on iOS
- **Haptic feedback**: Light, medium, heavy impacts, selection, and notification feedback
- **Platform safety**: Haptics disabled on web

### Notification Service (`src/services/notifications.ts`)

Handles local push notifications:

- **Android channels**: Alarm channel (MAX importance, DND bypass) and Timer channel (HIGH importance)
- **Alarm notifications**: Scheduled for each enabled alarm with critical interruption level
- **Timer notifications**: Scheduled when timer starts with time-sensitive interruption
- **Cancellation**: Ability to cancel specific alarm/timer notifications
- **Response handling**: Listeners for notification taps and delivery

### Background Task Service (`src/services/backgroundTask.ts`)

Ensures timer and stopwatch accuracy when the app is backgrounded:

- **Timer task**: Reads persisted timer state, recalculates remaining time
- **Stopwatch task**: Reads persisted stopwatch state
- **Registration**: Tasks registered on app startup with 10-minute minimum interval
- **Boot persistence**: Tasks restart on device boot

### Permission Service (`src/services/permissions.ts`)

Manages notification permissions:

- **iOS**: Requests alert, badge, sound, and critical alert permissions
- **Android**: Ensures alarm channel has MAX importance
- **Fallback**: Shows alert with "Open Settings" button if denied
- **Status checking**: Get current permission status

### Storage Service (`src/services/storage.ts`)

Generic MMKV wrapper:

- **Type-safe**: Generic `getItem<T>` and `setItem<T>` with JSON parsing
- **Error handling**: Graceful fallback to `null` on parse errors
- **Key management**: Centralized key constants

### Timekeeping Service (`src/services/timekeeping.ts`)

Core time calculation utilities:

- **`getNow()`**: Returns current timestamp (with test override support)
- **`getElapsedMilliseconds()`**: Calculate elapsed time from start
- **`getRemainingMilliseconds()`**: Calculate remaining time from end
- **`getTimeForTimezone()`**: Convert a date to a specific timezone
- **Calculator factories**: `createStopwatchCalculator()` and `createTimerCalculator()` for composable time math

### Timezone Service (`src/services/timezone.ts`)

Timezone utilities:

- **`getLocalTimezone()`**: Detect device timezone via `Intl`
- **`getCurrentOffset()`**: Get UTC offset for a timezone
- **`isCurrentlyDST()`**: Check if a timezone is currently in DST
- **`getTimeDifferenceMinutes()`**: Calculate minutes between two timezones

---

## 🎨 Theming

### Color System

The app features a comprehensive **light/dark color system** with 30+ semantic tokens defined in `src/constants/theme.ts`:

| Token              | Light     | Dark      | Usage                    |
| ------------------ | --------- | --------- | ------------------------ |
| `background`       | `#F2F2F7` | `#000000` | Main background          |
| `surface`          | `#FFFFFF` | `#1C1C1E` | Card backgrounds         |
| `primary`          | `#007AFF` | `#0A84FF` | Accent/action color      |
| `text`             | `#000000` | `#FFFFFF` | Primary text             |
| `textSecondary`    | `#8E8E93` | `#98989D` | Secondary text           |
| `destructive`      | `#FF3B30` | `#FF453A` | Delete/danger            |
| `success`          | `#34C759` | `#30D158` | Success/fast lap         |
| `analogSecondHand` | `#FF3B30` | `#FF453A` | Analog clock second hand |
| `worldClockDay`    | `#FFF3CD` | `#1C3A1C` | Daytime indicator        |
| `worldClockNight`  | `#1A1A2E` | `#0A0A2E` | Nighttime indicator      |

### Spacing System

```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};
```

### Typography

```typescript
const fontSize = {
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
};
```

### Border Radii

```typescript
const borderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
};
```

### Theme Resolution

The `useTheme` hook resolves the effective theme:

- `light` → uses `colors.light`
- `dark` → uses `colors.dark`
- `system` → follows device color scheme (falls back to dark)

---

## 🔄 Background Operations

### App State Management

The `useBackground` hook detects app state transitions:

- **Foreground → Background**: Triggers optional callback (used for recalculating timer/stopwatch)
- **Background → Foreground**: Triggers optional callback

### Background Fetch

Two background tasks are registered:

1. **Timer task**: Persists remaining time calculation
2. **Stopwatch task**: Persists accumulated time

These tasks run at a minimum interval of 10 minutes and survive device reboots.

### Timer/Stopwatch Background Accuracy

- **Timer**: Uses `endTimestamp` for accurate remaining time calculation. On foreground, `recalculateFromBackground()` computes `endTimestamp - now()`.
- **Stopwatch**: Uses `startTimestamp + accumulatedMs` pattern. On foreground, `recalculateFromBackground()` updates accumulated time.

---

## 🔐 Permissions

### Notification Permissions

The app requests notification permissions for alarm and timer alerts:

- **iOS**: Requests critical alert permissions (bypasses silent mode)
- **Android**: Configures notification channels with MAX importance
- **Permission denied**: Shows an alert dialog with an option to open system Settings

### Android Permissions

```xml
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.USE_FULL_SCREEN_INTENT" />
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch
```

The project uses **Jest** with **@testing-library/react-native** for testing. Test files should be co-located with their source files using the `.test.ts` or `.test.tsx` extension.

### Type Checking

```bash
npm run typecheck
```

Runs TypeScript compiler in no-emit mode to check for type errors across the entire codebase.

### Linting

```bash
npm run lint
```

Uses ESLint with the Expo configuration for code quality enforcement.

---

## 🤝 Contributing

Contributions are welcome! Since this project is in the public domain (CC0), feel free to:

1. **Fork** the repository
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code structure and naming conventions
- Use TypeScript with strict mode
- Write tests for new functionality
- Ensure all existing tests pass
- Run `npm run typecheck` before committing
- Use the path alias `@/` for imports from `src/`

---

## 📄 License

This project is dedicated to the public domain under **CC0 1.0 Universal (CC0 1.0)** — see the [LICENSE](LICENSE) file for details.

You can copy, modify, distribute, and perform the work, even for commercial purposes, all without asking permission.

---

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev) and [React Native](https://reactnative.dev)
- State management by [Zustand](https://github.com/pmndrs/zustand)
- Animations powered by [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)
- Graphics rendering by [Shopify Skia](https://shopify.github.io/react-native-skia/)
- Persistent storage via [MMKV](https://github.com/mrousavy/react-native-mmkv)
- Date/time handling by [date-fns](https://date-fns.org)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/girishlade111">Girish Lade</a>
</p>
