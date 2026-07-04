import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { formatLapTime } from '../../utils/format'
import type { LapEntry } from '../../types'

interface Props {
  laps: LapEntry[]
}

export function LapList({ laps }: Props) {
  const { colors } = useTheme()

  if (laps.length === 0) return null

  const lapTimes = laps.map((l) => l.lapMs)
  const fastest = Math.min(...lapTimes)
  const slowest = Math.max(...lapTimes)

  const reversedLaps = [...laps].reverse()

  return (
    <View style={styles.container}>
      <View style={[styles.header, { borderBottomColor: colors.separator }]}>
        <Text style={[styles.headerText, { color: colors.textSecondary }]}>Lap</Text>
        <Text style={[styles.headerText, { color: colors.textSecondary }]}>Lap Time</Text>
        <Text style={[styles.headerText, { color: colors.textSecondary }]}>Total</Text>
      </View>
      <FlatList
        data={reversedLaps}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isFastest = item.lapMs === fastest
          const isSlowest = item.lapMs === slowest
          const lapColor = isFastest
            ? colors.lapFast
            : isSlowest
              ? colors.lapSlow
              : colors.text

          return (
            <View style={[styles.lapRow, { borderBottomColor: colors.separator }]}>
              <Text style={[styles.lapNum, { color: colors.text }]}>
                Lap {item.id}
              </Text>
              <Text style={[styles.lapTime, { color: lapColor }]}>
                {formatLapTime(item.lapMs)}
              </Text>
              <Text style={[styles.splitTime, { color: colors.textSecondary }]}>
                {formatLapTime(item.splitMs)}
              </Text>
            </View>
          )
        }}
        style={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  lapNum: {
    fontSize: 15,
    fontWeight: '500',
  },
  lapTime: {
    fontSize: 15,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  splitTime: {
    fontSize: 15,
    fontVariant: ['tabular-nums'],
  },
})
