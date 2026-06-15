import ListIcon from '@/shared/components/icons/ListIcon'
import Chip from '@/shared/components/button/Chip'
import { ButtonHTMLAttributes } from 'react'

interface CategoryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  isActive: boolean
}

export default function CategoryButton({ className, isActive, ...props }: CategoryButtonProps) {
  return (
    <Chip
      label="카테고리"
      isActive={isActive}
      leftIcon={<ListIcon fill={isActive ? 'var(--main-color)' : '#191919'} />}
      className={className}
      {...props}
    />
  )
}
