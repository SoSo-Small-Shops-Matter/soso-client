import WishIcon from '@/shared/components/icons/WishIcon'
import Chip from '@/shared/components/button/Chip'
import { ButtonHTMLAttributes } from 'react'

interface WishViewButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  isActive: boolean
}

export default function WishViewButton({ className, isActive, ...props }: WishViewButtonProps) {
  return (
    <Chip
      label="찜"
      isActive={isActive}
      leftIcon={
        <WishIcon isActive={isActive} width="16" height="16" fill={isActive ? 'var(--main-color)' : 'var(--gray-800)'} />
      }
      className={className}
      {...props}
    />
  )
}
