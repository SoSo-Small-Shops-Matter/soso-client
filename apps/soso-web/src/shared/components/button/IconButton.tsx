import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type IconButtonVariant = 'primary' | 'secondary' | 'tertiary'
type IconButtonSize = 'large' | 'medium' | 'small'
type IconButtonState = 'default' | 'hover' | 'press' | 'disabled'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  label: string // 접근성용 aria-label
  variant?: IconButtonVariant
  size?: IconButtonSize
  state?: IconButtonState
  className?: string
}

const variantStyles: Record<IconButtonVariant, Record<IconButtonState, string>> = {
  primary: {
    default: 'bg-orange-normal text-white',
    hover: 'bg-orange-normalHover text-white',
    press: 'bg-orange-normalActive text-white',
    disabled: 'bg-orange-light text-orange-normal cursor-not-allowed',
  },
  secondary: {
    default: 'bg-transparent text-gray-500 border border-gray-200',
    hover: 'bg-gray-50 text-gray-500 border border-gray-200',
    press: 'bg-gray-100 text-gray-500 border border-gray-400',
    disabled: 'bg-transparent text-gray-200 border border-gray-100 cursor-not-allowed',
  },
  tertiary: {
    default: 'bg-gray-50 text-gray-500',
    hover: 'bg-gray-100 text-gray-500',
    press: 'bg-gray-200 text-gray-500',
    disabled: 'bg-gray-50 text-gray-200 cursor-not-allowed',
  },
}

const interactiveStyles: Record<IconButtonVariant, string> = {
  primary: 'hover:bg-orange-normalHover active:bg-orange-normalActive',
  secondary: 'hover:bg-gray-50 hover:border-gray-200 active:bg-gray-100 active:border-gray-400',
  tertiary: 'hover:bg-gray-100 active:bg-gray-200',
}

const sizeStyles: Record<IconButtonSize, { box: string; iconSize: string; radius: string }> = {
  large: { box: 'w-56 h-56', iconSize: 'w-24 h-24', radius: 'rounded-16' },
  medium: { box: 'w-40 h-40', iconSize: 'w-20 h-20', radius: 'rounded-12' },
  small: { box: 'w-32 h-32', iconSize: 'w-16 h-16', radius: 'rounded-10' },
}

export default function IconButton({
  icon,
  label,
  variant = 'primary',
  size = 'medium',
  state,
  className,
  disabled,
  ...props
}: IconButtonProps) {
  const resolvedState: IconButtonState = state ?? (disabled ? 'disabled' : 'default')
  const isDisabled = resolvedState === 'disabled' || disabled

  const { box, iconSize, radius } = sizeStyles[size]

  return (
    <button
      aria-label={label}
      className={clsx(
        'inline-flex items-center justify-center transition-colors',
        box,
        radius,
        variantStyles[variant][resolvedState],
        !state && !isDisabled && interactiveStyles[variant],
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      <span className={clsx('flex items-center justify-center', iconSize)}>{icon}</span>
    </button>
  )
}
