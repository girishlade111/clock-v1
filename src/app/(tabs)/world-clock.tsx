import { useState } from 'react'
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../hooks/useTheme'
import { useWorldClock } from '../../hooks/useWorldClock'
import { useBackground } from '../../hooks/useBackground'
import { WorldClockCard } from '../../components/world-clock/WorldClockCard'
import { TimezoneSearch } from '../../components/world-clock/TimezoneSearch'
import { triggerHaptic } from '../../services/audio'

export default function WorldClockScreen() {
  const { colors } = useTheme()
  const { cityTimes, addCity, removeCity } = useWorldClock()
  const [showSearch, setShowSearch] = useState(false)

  useBackground()

  const handleAdd = (city: any) => {
    addCity(city)
    triggerHaptic('light')
    setShowSearch(false)
  }

  const handleRemove = (id: string) => {
    triggerHaptic('medium')
    removeCity(id)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: colors.separator }]}>
        <Text style={[styles.title, { color: colors.text }]}>World Clock</Text>
        <TouchableOpacity onPress={() => setShowSearch(true)}>
          <Text style={[styles.addBtn, { color: colors.primary }]}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {cityTimes.map((ct) => (
          <WorldClockCard
            key={ct.city.id}
            cityName={ct.city.name}
            country={ct.city.country}
            time={ct.time}
            date={ct.date}
            abbreviation={ct.abbreviation}
            offset={ct.offset}
            isDaytime={ct.isDaytime}
            onRemove={() => handleRemove(ct.city.id)}
          />
        ))}
      </ScrollView>

      <Modal visible={showSearch} animationType="slide" onRequestClose={() => setShowSearch(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
          <TimezoneSearch
            onSelect={handleAdd}
            onClose={() => setShowSearch(false)}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  addBtn: {
    fontSize: 17,
    fontWeight: '600',
  },
  list: {
    padding: 16,
    paddingBottom: 30,
  },
})
