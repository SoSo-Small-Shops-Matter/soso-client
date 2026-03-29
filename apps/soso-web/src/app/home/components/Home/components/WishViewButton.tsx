import WishIcon from '@/shared/components/icons/WishIcon'
import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface WishViewButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  isActive: boolean
}

export default function WishViewButton({ className, isActive, ...props }: WishViewButtonProps) {
  return (
    <button
      className={clsx(
        'flex items-center justify-center gap-4 rounded-full border bg-white px-10 py-6',
        isActive ? 'border-main' : 'border-gray-100',
        className
      )}
      {...props}
    >
      <WishIcon isActive={isActive} width="16" height="16" fill={isActive ? 'var(--main-color)' : 'var(--gray-800)'} />
      <span className={clsx('font-body2_m', isActive ? 'border-main text-main' : 'border-gray-100 text-black')}>
        찜
      </span>
    </button>
  )
}
