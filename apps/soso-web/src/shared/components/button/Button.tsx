import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize = 'xLarge' | 'large' | 'medium' | 'small'
export type ButtonState = 'default' | 'hover' | 'press' | 'disabled'

// ─── Filled 스타일 ───────────────────────────────────────────────────────────

const filledStyles: Record<ButtonVariant, Record<ButtonState, string>> = {
  primary: {
    default: 'bg-orange-normal text-white border border-orange-normal',
    hover: 'bg-orange-normalHover text-white border border-orange-normalHover',
    press: 'bg-orange-normalActive text-white border border-orange-normalActive',
    disabled: 'bg-orange-light text-orange-normal border border-orange-light cursor-not-allowed',
  },
  secondary: {
    default: 'bg-orange-light text-orange-normal border border-orange-light',
    hover: 'bg-orange-lightHover text-orange-normal border border-orange-lightHover',
    press: 'bg-orange-lightActive text-orange-normal border border-orange-lightActive',
    disabled: 'bg-gray-50 text-gray-200 border border-gray-50 cursor-not-allowed',
  },
  tertiary: {
    default: 'bg-gray-50 text-gray-500 border border-gray-50',
    hover: 'bg-gray-100 text-gray-500 border border-gray-100',
    press: 'bg-gray-200 text-gray-500 border border-gray-200',
    disabled: 'bg-gray-50 text-gray-200 border border-gray-50 cursor-not-allowed',
  },
}

// ─── Outlined 스타일 ─────────────────────────────────────────────────────────

const outlinedStyles: Record<ButtonVariant, Record<ButtonState, string>> = {
  primary: {
    default: 'bg-transparent text-orange-normal border border-orange-normal',
    hover: 'bg-orange-light text-orange-normal border border-orange-normal',
    press: 'bg-orange-lightActive text-orange-normalActive border border-orange-normalActive',
    disabled: 'bg-transparent text-gray-200 border border-gray-200 cursor-not-allowed',
  },
  secondary: {
    default: 'bg-transparent text-orange-normal border border-orange-light',
    hover: 'bg-orange-light text-orange-normal border border-orange-lightHover',
    press: 'bg-orange-lightActive text-orange-normalActive border border-orange-lightActive',
    disabled: 'bg-transparent text-gray-200 border border-gray-100 cursor-not-allowed',
  },
  tertiary: {
    default: 'bg-transparent text-gray-500 border border-gray-200',
    hover: 'bg-gray-50 text-gray-500 border border-gray-200',
    press: 'bg-gray-100 text-gray-500 border border-gray-400',
    disabled: 'bg-transparent text-gray-200 border border-gray-100 cursor-not-allowed',
  },
}

// ─── CSS pseudo-class 인터랙션 (state prop 없을 때 사용) ──────────────────────

const filledInteractive: Record<ButtonVariant, string> = {
  primary:
    'hover:bg-orange-normalHover hover:border-orange-normalHover active:bg-orange-normalActive active:border-orange-normalActive',
  secondary:
    'hover:bg-orange-lightHover hover:border-orange-lightHover active:bg-orange-lightActive active:border-orange-lightActive',
  tertiary: 'hover:bg-gray-100 hover:border-gray-100 active:bg-gray-200 active:border-gray-200',
}

const outlinedInteractive: Record<ButtonVariant, string> = {
  primary:
    'hover:bg-orange-light active:bg-orange-lightActive active:text-orange-normalActive active:border-orange-normalActive',
  secondary:
    'hover:bg-orange-light hover:border-orange-lightHover active:bg-orange-lightActive active:border-orange-lightActive',
  tertiary: 'hover:bg-gray-50 active:bg-gray-100 active:border-gray-400',
}

// ─── Size ────────────────────────────────────────────────────────────────────

export const sizeStyles: Record<ButtonSize, { container: string; font: string }> = {
  xLarge: { container: 'w-56 h-56 px-6 rounded-16', font: 'font-body_l' },
  large: { container: 'w-48 h-48 px-5 rounded-14', font: 'font-body_m' },
  medium: { container: 'w-40 h-40 px-4 rounded-12', font: 'font-body_s' },
  small: { container: 'w-32 h-32 px-3 rounded-8', font: 'font-caption' },
}

// ─── 헬퍼 함수 ───────────────────────────────────────────────────────────────

export function getVariantStyles(variant: ButtonVariant, outlined: boolean) {
  return outlined ? outlinedStyles[variant] : filledStyles[variant]
}

export function getInteractiveStyles(variant: ButtonVariant, outlined: boolean) {
  return outlined ? outlinedInteractive[variant] : filledInteractive[variant]
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  variant?: ButtonVariant
  size?: ButtonSize
  state?: ButtonState
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
  state,
  outlined = false,
  leftIcon,
  rightIcon,
  width,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const resolvedState: ButtonState = state ?? (disabled ? 'disabled' : 'default')
  const isDisabled = resolvedState === 'disabled' || disabled

  const { container, font } = sizeStyles[size]

  return (
    <button
      style={{ width: width || '100%' }}
      className={clsx(
        'inline-flex items-center justify-center gap-2 transition-colors',
        container,
        font,
        getVariantStyles(variant, outlined)[resolvedState],
        !state && !isDisabled && getInteractiveStyles(variant, outlined),
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {title}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  )
}
