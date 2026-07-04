import { Tabs } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../hooks/useTheme'

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const { colors } = useTheme()
  const icons: Record<string, string> = {
    Clock: '🕐',
    'World': '🌍',
    Stopwatch: '⏱',
    Timer: '⏲',
    Alarms: '🔔',
  }
  return (
    <View style={styles.tabIcon}>
      <Text style={{ fontSize: 22 }}>{icons[label] ?? '•'}</Text>
    </View>
  )
}

export default function TabLayout() {
  const { colors, isDark } = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 0.5,
          paddingBottom: 4,
          paddingTop: 4,
          height: 56,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="clock"
        options={{
          title: 'Clock',
          tabBarIcon: ({ focused }) => <TabIcon label="Clock" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="world-clock"
        options={{
          title: 'World',
          tabBarIcon: ({ focused }) => <TabIcon label="World" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="stopwatch"
        options={{
          title: 'Stopwatch',
          tabBarIcon: ({ focused }) => <TabIcon label="Stopwatch" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: 'Timer',
          tabBarIcon: ({ focused }) => <TabIcon label="Timer" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="alarms"
        options={{
          title: 'Alarms',
          tabBarIcon: ({ focused }) => <TabIcon label="Alarms" focused={focused} />,
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
