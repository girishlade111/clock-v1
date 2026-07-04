import { Switch as RNSwitch, type SwitchProps } from 'react-native'
import { useTheme } from '../../hooks/useTheme'

interface Props extends SwitchProps {
  value: boolean
  onValueChange: (value: boolean) => void
}

export function Switch({ value, onValueChange, ...props }: Props) {
  const { colors } = useTheme()
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.textTertiary, true: colors.primaryLight }}
      thumbColor={value ? '#FFFFFF' : '#F2F2F7'}
      ios_backgroundColor={colors.textTertiary}
      {...props}
    />
  )
}
