import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { useTheme } from '../../hooks/useTheme'

interface Props {
  size?: 'small' | 'large'
}

export function LoadingSpinner({ size = 'large' }: Props) {
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
