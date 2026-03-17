import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string
  height?: string
  className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ width, height, placeholder, className, onChange, ...props }, ref) => {
    return (
      <div
        style={{
          width: width || '100%',
          height: height || '52px',
        }}
      >
        <input
          ref={ref} // 🔥 ref 연결
          placeholder={placeholder}
          className={clsx(
            'h-full w-full rounded-12 bg-gray-50 px-16 py-14 font-body1_m placeholder:text-gray-400 focus:outline-main',
            className
          )}
          onChange={onChange}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
