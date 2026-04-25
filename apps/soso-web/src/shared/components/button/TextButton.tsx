import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type TextButtonVariant = 'primary' | 'tertiary'
type TextButtonSize = 'medium' | 'small'
type TextButtonState = 'default' | 'hover' | 'press' | 'disabled'

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  variant?: TextButtonVariant
  size?: TextButtonSize
  state?: TextButtonState
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  className?: string
}

const variantStyles: Record<TextButtonVariant, Record<TextButtonState, string>> = {
  primary: {
    default: 'text-orange-normal',
    hover: 'text-orange-normalHover',
    press: 'text-orange-normalActive',
    disabled: 'text-gray-200 cursor-not-allowed',
  },
  tertiary: {
    default: 'text-gray-500',
    hover: 'text-gray-600',
    press: 'text-gray-800',
    disabled: 'text-gray-200 cursor-not-allowed',
  },
}

const interactiveStyles: Record<TextButtonVariant, string> = {
  primary: 'hover:text-orange-normalHover active:text-orange-normalActive',
  tertiary: 'hover:text-gray-600 active:text-gray-800',
}

const sizeStyles: Record<TextButtonSize, { font: string; iconSize: string }> = {
  medium: { font: 'font-body2_m', iconSize: 'w-20 h-20' },
  small: { font: 'font-caption', iconSize: 'w-20 h-20' },
}

export default function TextButton({
  label,
  variant = 'primary',
  size = 'medium',
  state,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: TextButtonProps) {
  const resolvedState: TextButtonState = state ?? (disabled ? 'disabled' : 'default')
  const isDisabled = resolvedState === 'disabled' || disabled

  const { font, iconSize } = sizeStyles[size]

  return (
    <button
      className={clsx(
        'inline-flex items-center gap-1 bg-transparent transition-colors',
        font,
        variantStyles[variant][resolvedState],
        !state && !isDisabled && interactiveStyles[variant],
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {leftIcon && <span className={clsx('flex items-center', iconSize)}>{leftIcon}</span>}
      {label}
      {rightIcon && <span className={clsx('flex items-center', iconSize)}>{rightIcon}</span>}
    </button>
  )
}
