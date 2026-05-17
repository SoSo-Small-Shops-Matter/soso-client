import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize = 'xLarge' | 'large' | 'medium' | 'small'

// ─── Filled 스타일 ───────────────────────────────────────────────────────────

const filledStyles: Record<ButtonVariant, { base: string; interactive: string; disabled: string }> = {
  primary: {
    base: 'bg-main text-white border border-main',
    interactive: 'hover:bg-orange-600 hover:border-orange-600 active:bg-orange-700 active:border-orange-700',
    disabled: 'bg-main text-white border border-main opacity-30 cursor-not-allowed',
  },
  secondary: {
    base: 'bg-orange-50 text-main border border-orange-50',
    interactive: 'hover:bg-orange-100 hover:border-orange-100 active:bg-orange-200 active:border-orange-200',
    disabled: 'bg-gray-50 text-gray-200 border border-gray-50 cursor-not-allowed',
  },
  tertiary: {
    base: 'bg-gray-50 text-gray-500 border border-gray-50',
    interactive: 'hover:bg-gray-100 hover:border-gray-100 active:bg-gray-200 active:border-gray-200',
    disabled: 'bg-gray-50 text-gray-200 border border-gray-50 cursor-not-allowed',
  },
}

// ─── Outlined 스타일 ─────────────────────────────────────────────────────────

const outlinedStyles: Record<ButtonVariant, { base: string; interactive: string; disabled: string }> = {
  primary: {
    base: 'bg-white text-main border border-main',
    interactive: 'hover:bg-orange-50 active:bg-orange-100',
    disabled: 'bg-white text-main border border-main opacity-30 cursor-not-allowed',
  },
  secondary: {
    base: 'bg-white text-main border border-gray-100',
    interactive: 'hover:bg-gray-50 active:bg-gray-100',
    disabled: 'bg-white text-gray-200 border border-gray-100 cursor-not-allowed',
  },
  tertiary: {
    base: 'bg-white text-gray-800 border border-gray-100',
    interactive: 'hover:bg-gray-50 hover:border-gray-100 active:bg-gray-100 active:border-gray-100',
    disabled: 'bg-white text-gray-200 border border-gray-100 cursor-not-allowed',
  },
}

// ─── Size ────────────────────────────────────────────────────────────────────

export const sizeStyles: Record<ButtonSize, { container: string; font: string; iconSize: number }> = {
  xLarge: { container: 'h-56 px-20 rounded-16', font: 'font-subtitle_l', iconSize: 24 },
  large: { container: 'h-48 px-20 rounded-14', font: 'font-subtitle_m', iconSize: 20 },
  medium: { container: 'h-40 px-12 rounded-12', font: 'font-subtitle_s', iconSize: 16 },
  small: { container: 'h-32 px-12 rounded-8', font: 'font-caption', iconSize: 16 },
}

// ─── 헬퍼 함수 ───────────────────────────────────────────────────────────────

function getStyles(variant: ButtonVariant, outlined: boolean) {
  return outlined ? outlinedStyles[variant] : filledStyles[variant]
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  variant?: ButtonVariant
  size?: ButtonSize
  outlined?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  width?: string
  className?: string
}

export default function Button({
  title,
  variant = 'primary',
  size = 'xLarge',
  outlined = false,
  leftIcon,
  rightIcon,
  width,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const { container, font, iconSize } = sizeStyles[size]
  const styles = getStyles(variant, outlined)

  return (
    <button
      style={{ width: width || '100%' }}
      className={clsx(
        'inline-flex items-center justify-center gap-2 transition-colors',
        container,
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
      {title}
      {rightIcon && (
        <span className="flex items-center" style={{ width: iconSize, height: iconSize }}>
          {rightIcon}
        </span>
      )}
    </button>
  )
}
