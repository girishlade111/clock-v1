import type { SharedValue } from 'react-native-reanimated'
import { withSpring, withTiming, type AnimatableValue } from 'react-native-reanimated'

export const springConfig = {
  damping: 15,
  stiffness: 150,
  mass: 0.5,
}

export const springFast = {
  damping: 20,
  stiffness: 300,
  mass: 0.3,
}

export const timingConfig = {
  duration: 200,
}

export function animateScale(scale: SharedValue<number>, toValue: number) {
  scale.value = withSpring(toValue, springFast)
}

export function animateOpacity(opacity: SharedValue<number>, toValue: number) {
  opacity.value = withTiming(toValue, timingConfig)
}

export function springTo<T extends AnimatableValue>(
  value: SharedValue<T>,
  toValue: T,
  config?: Partial<typeof springConfig>,
) {
  value.value = withSpring(toValue, { ...springConfig, ...config })
}
