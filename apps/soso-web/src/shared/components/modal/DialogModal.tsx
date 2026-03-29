import Button from '@/shared/components/button/Button'
import Backdrop from '@/shared/components/layout/Backdrop'
import Flex from '@/shared/components/layout/Flex'
import { ReactNode } from 'react'

interface DialogModalProps {
  type: 'alert' | 'confirm'
  title: string
  message?: string | ReactNode
  onConfirm?: () => void
  onClose: () => void
  onCancel?: () => void
  leftLabel?: string
  rightLabel?: string
}

const DialogModal = ({
  type,
  title,
  message,
  leftLabel,
  rightLabel,
  onConfirm,
  onClose,
  onCancel,
}: DialogModalProps) => {
  return (
    <>
      <Backdrop onClick={onCancel && onCancel} />
      <div className="fixed left-1/2 top-1/2 z-modal w-[323px] -translate-x-1/2 -translate-y-1/2 rounded-20 bg-white px-16 pb-20 pt-24">
        <Flex direction="col" align="center" gap={24} className="w-full">
          <Flex direction="col" align="center" gap={12} className="w-full">
            {title && <h3 className="text-black font-title4_semi">{title}</h3>}
            {message && <p className="text-center text-gray-500 font-body1_m">{message}</p>}
          </Flex>
          <Flex gap={9} className="w-full">
            {type === 'confirm' && (
              <Button
                bgColor="#F7F8F9"
                textColor="#72787F"
                borderColor="none"
                onClick={onClose}
                width="auto"
                className="flex-1"
                title={leftLabel || '취소'}
              />
            )}
            <Button onClick={onConfirm || onClose} width="auto" className="flex-1" title={rightLabel || '확인'} />
          </Flex>
        </Flex>
      </div>
    </>
  )
}

export default DialogModal
