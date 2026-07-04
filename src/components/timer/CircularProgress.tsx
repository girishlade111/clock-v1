import { View, StyleSheet } from 'react-native'
import { Canvas, Circle, Path, Skia, useValue, useComputedValue } from '@shopify/react-native-skia'
import { useTheme } from '../../hooks/useTheme'

const SIZE = 220
const CENTER = SIZE / 2
const STROKE_WIDTH = 6
const RADIUS = CENTER - STROKE_WIDTH

interface Props {
  progress: number
  displayTime: string
}

export function CircularProgress({ progress, displayTime }: Props) {
  const { colors } = useTheme()
  const animProgress = useValue(progress)

  const path = useComputedValue(() => {
    const p = Skia.Path.Make()
    const angle = animProgress.current * 2 * Math.PI - Math.PI / 2
    const x = CENTER + RADIUS * Math.cos(angle)
    const y = CENTER + RADIUS * Math.sin(angle)

    if (animProgress.current <= 0) {
      p.addCircle(CENTER, CENTER, RADIUS)
      return p
    }

    if (animProgress.current >= 1) {
      p.addCircle(CENTER, CENTER, RADIUS)
      return p
    }

    const startAngle = -Math.PI / 2
    const endAngle = startAngle + animProgress.current * 2 * Math.PI

    const sx = CENTER + RADIUS * Math.cos(startAngle)
    const sy = CENTER + RADIUS * Math.sin(startAngle)
    const ex = CENTER + RADIUS * Math.cos(endAngle)
    const ey = CENTER + RADIUS * Math.sin(endAngle)

    const largeArc = animProgress.current > 0.5 ? 1 : 0

    p.moveTo(sx, sy)
    p.arcTo({ x: sx, y: sy }, { x: ex, y: ey }, RADIUS, largeArc)
    return p
  }, [animProgress])

  animProgress.current = progress

  return (
    <View style={styles.container}>
      <Canvas style={{ width: SIZE, height: SIZE }}>
        <Circle cx={CENTER} cy={CENTER} r={RADIUS} color={colors.ringTrack} style="stroke" strokeWidth={STROKE_WIDTH} />
        <Path
          path={path}
          color={progress <= 0.1 ? colors.destructive : colors.ringProgress}
          style="stroke"
          strokeWidth={STROKE_WIDTH}
          strokeCap="round"
        />
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
