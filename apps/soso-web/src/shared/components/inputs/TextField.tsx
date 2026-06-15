import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string
  helperText?: string
  rightIcon?: ReactNode
  className?: string
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, helperText, rightIcon, disabled, className, ...props }, ref) => {
    return (
      <div className={clsx('flex w-full flex-col gap-8', className)}>
        {label && (
          <p className="px-20 text-gray-900 font-body_s">{label}</p>
        )}
        <div className="relative">
          <input
            ref={ref}
            disabled={disabled}
            className={clsx(
              'h-48 w-full rounded-12 px-16 caret-main font-body_m outline-none placeholder:text-gray-400',
              disabled ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-gray-900',
              rightIcon && 'pr-48'
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-18 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && (
          <p className="px-20 text-gray-500 font-body_s">{helperText}</p>
        )}
      </div>
    )
  }
)

TextField.displayName = 'TextField'

export default TextField
