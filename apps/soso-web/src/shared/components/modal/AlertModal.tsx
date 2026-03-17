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
          <h3 className="text-black font-title4_semi">{title}</h3>
          <p className="text-center text-gray-500 font-body1_m">{children}</p>
        </Flex>
        <Button title="확인" height="52px" />
      </Flex>
    </ModalPortal>
  )
}
