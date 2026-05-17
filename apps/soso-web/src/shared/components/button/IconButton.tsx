import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type IconButtonVariant = 'primary' | 'secondary' | 'tertiary'
type IconButtonSize = 'large' | 'medium' | 'small'

const variantStyles: Record<IconButtonVariant, { base: string; interactive: string; disabled: string }> = {
  primary: {
    base: 'bg-orange-500 text-white',
    interactive: 'hover:bg-orange-600 active:bg-orange-700',
    disabled: 'bg-orange-500 text-white opacity-30 cursor-not-allowed',
  },
  secondary: {
    base: 'bg-transparent text-gray-900 border border-gray-100',
    interactive: 'hover:bg-gray-50 hover:border-gray-100 active:bg-gray-100 active:border-gray-100',
    disabled: 'bg-transparent text-gray-200 border border-gray-100 cursor-not-allowed',
  },
  tertiary: {
    base: 'bg-white text-gray-500',
    interactive: 'hover:bg-gray-50 active:bg-gray-200',
    disabled: 'bg-gray-50 text-gray-200 cursor-not-allowed',
  },
}

const sizeStyles: Record<IconButtonSize, { box: string; iconSize: number; radius: string }> = {
  large: { box: 'w-56 h-56', iconSize: 24, radius: 'rounded-16' },
  medium: { box: 'w-40 h-40', iconSize: 20, radius: 'rounded-12' },
  small: { box: 'w-32 h-32', iconSize: 16, radius: 'rounded-10' },
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  label: string
  variant?: IconButtonVariant
  size?: IconButtonSize
  className?: string
}

export default function IconButton({
  icon,
  label,
  variant = 'primary',
  size = 'medium',
  className,
  disabled,
  ...props
}: IconButtonProps) {
  const { box, iconSize, radius } = sizeStyles[size]
  const styles = variantStyles[variant]

  return (
    <button
      aria-label={label}
      className={clsx(
        'inline-flex items-center justify-center transition-colors',
        box,
        radius,
        disabled ? styles.disabled : [styles.base, styles.interactive],
        className
      )}
      disabled={disabled}
      {...props}
    >
      <span className="flex items-center" style={{ width: iconSize, height: iconSize }}>
        {icon}
      </span>
    </button>
  )
}
