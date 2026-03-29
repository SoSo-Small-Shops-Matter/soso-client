import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string
  height?: string
  title: string
  disabled?: boolean
  borderColor?: string
  bgColor?: string
  textColor?: string
  radius?: string
  className?: string
}

export default function Button({
  width,
  height,
  title,
  disabled,
  borderColor,
  bgColor,
  textColor,
  radius,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      style={{
        width: width || '100%',
        height: height || '56px',
        border: `1px solid ${borderColor || 'var(--main-color)'}`,
        backgroundColor: bgColor || 'var(--main-color)',
        color: textColor || '#fff',
        borderRadius: radius || '16px',
      }}
      className={clsx('rounded-16 text-white font-title4_m', className, disabled ? 'opacity-30' : 'opacity-100')}
      disabled={disabled}
      {...props}
    >
      {title}
    </button>
  )
}
