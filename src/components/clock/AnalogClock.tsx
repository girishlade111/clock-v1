import { View, StyleSheet } from 'react-native'
import { Canvas, Circle, Line, Group } from '@shopify/react-native-skia'
import { useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useClockStore } from '../../stores/clockStore'

const SIZE = 240
const CENTER = SIZE / 2
const RADIUS = CENTER - 8

interface Props {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

export function AnalogClock({ hours, minutes, seconds, milliseconds }: Props) {
  const { colors } = useTheme()
  const { smoothSecondHand } = useClockStore()

  const hourAngle = ((hours % 12) * 60 + minutes) / 720 * 360
  const minuteAngle = (minutes * 60 + seconds) / 3600 * 360
  const secondAngle = smoothSecondHand
    ? (seconds * 1000 + milliseconds) / 60000 * 360
    : (seconds / 60) * 360

  const hourRad = ((hourAngle - 90) * Math.PI) / 180
  const minRad = ((minuteAngle - 90) * Math.PI) / 180
  const secRad = ((secondAngle - 90) * Math.PI) / 180

  const hourLen = RADIUS * 0.5
  const minLen = RADIUS * 0.7
  const secLen = RADIUS * 0.85

  return (
    <View style={styles.container} accessibilityRole="image" accessibilityLabel={`Analog clock showing ${hours}:${minutes}`}>
      <Canvas style={{ width: SIZE, height: SIZE }}>
        <Circle cx={CENTER} cy={CENTER} r={RADIUS} color={colors.analogClockFace} />
        <Circle cx={CENTER} cy={CENTER} r={RADIUS} color={colors.analogClockBorder} style="stroke" strokeWidth={2} />

        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180)
          const inner = RADIUS * (i % 3 === 0 ? 0.85 : 0.92)
          const outer = RADIUS * 0.95
          return (
            <Line
              key={i}
              p1={{
                x: CENTER + inner * Math.cos(angle),
                y: CENTER + inner * Math.sin(angle),
              }}
              p2={{
                x: CENTER + outer * Math.cos(angle),
                y: CENTER + outer * Math.sin(angle),
              }}
              color={colors.analogTick}
              strokeWidth={i % 3 === 0 ? 3 : 1.5}
            />
          )
        })}

        <Group>
          <Line
            p1={{ x: CENTER, y: CENTER }}
            p2={{
              x: CENTER + hourLen * Math.cos(hourRad),
              y: CENTER + hourLen * Math.sin(hourRad),
            }}
            color={colors.analogHourHand}
            strokeWidth={4}
            style="stroke"
            strokeCap="round"
          />
          <Line
            p1={{ x: CENTER, y: CENTER }}
            p2={{
              x: CENTER + minLen * Math.cos(minRad),
              y: CENTER + minLen * Math.sin(minRad),
            }}
            color={colors.analogMinuteHand}
            strokeWidth={3}
            style="stroke"
            strokeCap="round"
          />
          <Line
            p1={{ x: CENTER, y: CENTER }}
            p2={{
              x: CENTER + secLen * Math.cos(secRad),
              y: CENTER + secLen * Math.sin(secRad),
            }}
            color={colors.analogSecondHand}
            strokeWidth={1.5}
            style="stroke"
            strokeCap="round"
          />
        </Group>

        <Circle cx={CENTER} cy={CENTER} r={4} color={colors.analogCenterDot} />
      </Canvas>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
})
