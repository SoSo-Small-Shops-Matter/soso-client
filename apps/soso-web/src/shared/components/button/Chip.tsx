import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type ChipState = 'active' | 'inactive' | 'default'

const containerStyles: Record<ChipState, string> = {
  active: 'border border-main bg-white',
  inactive: 'border border-gray-100 bg-white',
  default: 'border border-gray-100 bg-white',
}

const labelStyles: Record<ChipState, string> = {
  active: 'text-main',
  inactive: 'text-gray-900',
  default: 'text-gray-500',
}

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  isActive?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export default function Chip({ label, isActive, leftIcon, rightIcon, className, ...props }: ChipProps) {
  const state: ChipState = isActive === undefined ? 'default' : isActive ? 'active' : 'inactive'

  return (
    <button
      className={clsx(
        'flex items-center justify-center gap-4 rounded-full px-10 py-6',
        containerStyles[state],
        className
      )}
      {...props}
    >
      {leftIcon}
      <span className={clsx('font-body_s', labelStyles[state])}>{label}</span>
      {rightIcon}
    </button>
  )
}
