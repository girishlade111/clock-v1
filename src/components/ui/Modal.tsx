import { Modal as RNModal, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import type { ReactNode } from 'react'
import { useTheme } from '../../hooks/useTheme'

interface Props {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ visible, onClose, children }: Props) {
  const { colors } = useTheme()
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.overlay, { backgroundColor: colors.modalOverlay }]}>
          <TouchableWithoutFeedback>
            <View style={[styles.content, { backgroundColor: colors.surface }]}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 40,
    minHeight: 300,
  },
})
