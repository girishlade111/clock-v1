import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '../../hooks/useTheme'

interface Props {
  cityName: string
  country: string
  time: string
  date: string
  abbreviation: string
  offset: string
  isDaytime: boolean
  onRemove: () => void
}

export function WorldClockCard({
  cityName,
  country,
  time,
  date,
  abbreviation,
  offset,
  isDaytime,
  onRemove,
}: Props) {
  const { colors } = useTheme()

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.separator }]}>
      <View style={styles.topRow}>
        <View style={styles.cityInfo}>
          <View style={styles.nameRow}>
            <Text style={[styles.cityName, { color: colors.text }]}>{cityName}</Text>
            <View
              style={[
                styles.indicator,
                { backgroundColor: isDaytime ? '#FFD60A' : '#1E1E2E' },
              ]}
            />
          </View>
          <Text style={[styles.country, { color: colors.textSecondary }]}>
            {country} · {abbreviation}
          </Text>
          <Text style={[styles.offset, { color: colors.textTertiary }]}>
            {offset}
          </Text>
        </View>
        <TouchableOpacity onPress={onRemove} style={styles.removeBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={[styles.removeText, { color: colors.destructive }]}>✕</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.time, { color: colors.text }]}>{time}</Text>
      <Text style={[styles.date, { color: colors.textSecondary }]}>{date}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 0.5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cityInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cityName: {
    fontSize: 20,
    fontWeight: '600',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  country: {
    fontSize: 13,
    marginTop: 2,
  },
  offset: {
    fontSize: 12,
    marginTop: 2,
  },
  removeBtn: {
    padding: 4,
  },
  removeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  time: {
    fontSize: 36,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
    marginTop: 8,
    letterSpacing: 1,
  },
  date: {
    fontSize: 13,
    marginTop: 2,
  },
})
