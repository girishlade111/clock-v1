import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle } from 'react-native'
import { useTheme } from '../../hooks/useTheme'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  style?: ViewStyle
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
}: ButtonProps) {
  const { colors } = useTheme()

  const bgColor = variant === 'primary'
    ? colors.primary
    : variant === 'destructive'
      ? colors.destructive
      : 'transparent'

  const textColor = variant === 'primary' || variant === 'destructive'
    ? '#FFFFFF'
    : variant === 'ghost'
      ? colors.primary
      : colors.text

  const borderColor = variant === 'secondary' ? colors.primary : 'transparent'

  const paddingV = size === 'sm' ? 8 : size === 'lg' ? 16 : 12
  const paddingH = size === 'sm' ? 16 : size === 'lg' ? 28 : 22
  const fontS = size === 'sm' ? 13 : size === 'lg' ? 17 : 15

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.base,
        {
          backgroundColor: bgColor,
          borderColor,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
          opacity: disabled ? 0.4 : 1,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: textColor, fontSize: fontS, fontWeight: size === 'lg' ? '700' : '600' },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontVariant: ['tabular-nums'],
  },
})
