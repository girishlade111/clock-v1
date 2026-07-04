import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { COMMON_CITIES, CONTINENTS } from '../../constants/timezones'
import type { TimezoneCity } from '../../types'

interface Props {
  onSelect: (city: TimezoneCity) => void
  onClose: () => void
}

export function TimezoneSearch({ onSelect, onClose }: Props) {
  const { colors } = useTheme()
  const [query, setQuery] = useState('')
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null)

  const filtered = COMMON_CITIES.filter((city) => {
    const matchesQuery =
      !query ||
      city.name.toLowerCase().includes(query.toLowerCase()) ||
      city.country.toLowerCase().includes(query.toLowerCase())
    const matchesContinent =
      !selectedContinent || city.continent === selectedContinent
    return matchesQuery && matchesContinent
  })

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Add City</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={[styles.cancel, { color: colors.primary }]}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[
          styles.searchInput,
          { backgroundColor: colors.surfaceSecondary, color: colors.text },
        ]}
        placeholder="Search cities..."
        placeholderTextColor={colors.textTertiary}
        value={query}
        onChangeText={setQuery}
        autoFocus
      />

      <View style={styles.continentRow}>
        {CONTINENTS.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() =>
              setSelectedContinent(selectedContinent === c ? null : c)
            }
            style={[
              styles.continentBtn,
              {
                backgroundColor:
                  selectedContinent === c ? colors.primary : colors.surfaceSecondary,
              },
            ]}
          >
            <Text
              style={[
                styles.continentText,
                {
                  color:
                    selectedContinent === c ? '#FFFFFF' : colors.textSecondary,
                },
              ]}
            >
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.cityItem, { borderBottomColor: colors.separator }]}
            onPress={() => onSelect(item)}
          >
            <View>
              <Text style={[styles.cityName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.cityCountry, { color: colors.textSecondary }]}>
                {item.country}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  cancel: {
    fontSize: 17,
  },
  searchInput: {
    borderRadius: 10,
    padding: 12,
    fontSize: 17,
    marginBottom: 12,
  },
  continentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  continentBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  continentText: {
    fontSize: 13,
    fontWeight: '500',
  },
  list: {
    flex: 1,
  },
  cityItem: {
    paddingVertical: 14,
    borderBottomWidth: 0.5,
  },
  cityName: {
    fontSize: 17,
    fontWeight: '500',
  },
  cityCountry: {
    fontSize: 13,
    marginTop: 2,
  },
})
