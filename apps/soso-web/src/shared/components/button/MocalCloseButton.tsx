import XIcon from '@/shared/components/icons/XIcon'
import { ButtonHTMLAttributes } from 'react'

interface ModalCloseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void
}

export default function ModalCloseButton({ onClick }: ModalCloseButton) {
  return (
    <button onClick={onClick}>
      <XIcon />
    </button>
  )
}
