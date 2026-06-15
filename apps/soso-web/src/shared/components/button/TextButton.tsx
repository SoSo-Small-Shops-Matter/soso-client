import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type TextButtonVariant = 'primary' | 'tertiary'
type TextButtonSize = 'large' | 'medium' | 'small'

const variantStyles: Record<TextButtonVariant, { base: string; interactive: string; disabled: string }> = {
  primary: {
    base: 'text-orange-500',
    interactive: 'hover:text-orange-600 active:text-orange-700',
    disabled: 'text-gray-200 cursor-not-allowed',
  },
  tertiary: {
    base: 'text-gray-500',
    interactive: 'hover:text-gray-600 active:text-gray-800',
    disabled: 'text-gray-200 cursor-not-allowed',
  },
}

const sizeStyles: Record<TextButtonSize, { font: string; iconSize: number }> = {
  large: { font: 'font-subtitle_m', iconSize: 20 },
  medium: { font: 'font-subtitle_s', iconSize: 16 },
  small: { font: 'font-caption', iconSize: 16 },
}

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  variant?: TextButtonVariant
  size?: TextButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  className?: string
}

export default function TextButton({
  label,
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: TextButtonProps) {
  const { font, iconSize } = sizeStyles[size]
  const styles = variantStyles[variant]

  return (
    <button
      className={clsx(
        'inline-flex items-center gap-1 bg-transparent transition-colors',
        font,
        disabled ? styles.disabled : [styles.base, styles.interactive],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && (
        <span className="flex items-center" style={{ width: iconSize, height: iconSize }}>
          {leftIcon}
        </span>
      )}
      {label}
      {rightIcon && (
        <span className="flex items-center" style={{ width: iconSize, height: iconSize }}>
          {rightIcon}
        </span>
      )}
    </button>
  )
}
