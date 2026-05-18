import Button from '@/shared/components/button/Button'
import Flex from '@/shared/components/layout/Flex'
import ModalPortal from '@/shared/components/modal/ModalPortal'
import { ReactNode } from 'react'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children?: ReactNode
}
export default function AlertModal({ isOpen, onClose, title, children }: AlertModalProps) {
  return (
    <ModalPortal isOpen={isOpen} onClose={onClose}>
      <Flex direction="col" gap={24} className="w-[320px] rounded-20 bg-white px-16 pb-20 pt-24">
        <Flex direction="col" align="center" gap={12} className="w-full">
          <h3 className="font-subtitle_l text-gray-900">{title}</h3>
          <p className="font-body_m text-center text-gray-500">{children}</p>
        </Flex>
        <Button title="확인" />
      </Flex>
    </ModalPortal>
  )
}
