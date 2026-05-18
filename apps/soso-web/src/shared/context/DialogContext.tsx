import DialogModal from '@/shared/components/modal/DialogModal'
import { createContext, useContext, useState, ReactNode } from 'react'

// 모달 타입 정의
type DialogType = 'alert' | 'confirm'

interface DialogOptions {
  type: DialogType
  title: string
  message?: string | ReactNode
  children?: ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  leftLabel?: string
  rightLabel?: string
}

interface DialogContextType {
  openDialog: (options: DialogOptions) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | null>(null)

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(null)

  const openDialog = (options: DialogOptions) => setDialogOptions(options)
  const closeDialog = () => setDialogOptions(null)

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {dialogOptions && <DialogModal {...dialogOptions} onClose={closeDialog} />}
    </DialogContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) throw new Error('useDialog must be used within a DialogProvider')
  return context
}
