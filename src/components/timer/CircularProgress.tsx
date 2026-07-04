import { View, StyleSheet } from 'react-native'
import { Canvas, Circle, Path, Skia } from '@shopify/react-native-skia'
import { useTheme } from '../../hooks/useTheme'

const SIZE = 220
const CENTER = SIZE / 2
const STROKE_WIDTH = 6
const RADIUS = CENTER - STROKE_WIDTH

interface Props {
  progress: number
  displayTime: string
}

function createProgressPath(progress: number) {
  const p = Skia.Path.Make()

  if (progress <= 0) {
    p.addCircle(CENTER, CENTER, RADIUS)
    return p
  }

  if (progress >= 1) {
    p.addCircle(CENTER, CENTER, RADIUS)
    return p
  }

  const startAngle = -Math.PI / 2
  const endAngle = startAngle + progress * 2 * Math.PI

  const sx = CENTER + RADIUS * Math.cos(startAngle)
  const sy = CENTER + RADIUS * Math.sin(startAngle)
  const ex = CENTER + RADIUS * Math.cos(endAngle)
  const ey = CENTER + RADIUS * Math.sin(endAngle)

  const largeArc = progress > 0.5 ? 1 : 0

  p.moveTo(sx, sy)
  p.rArcTo(RADIUS, RADIUS, 0, largeArc, 1, ex - sx, ey - sy)
  return p
}

export function CircularProgress({ progress, displayTime }: Props) {
  const { colors } = useTheme()
  const path = createProgressPath(progress)

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
