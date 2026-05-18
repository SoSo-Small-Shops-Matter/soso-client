import clsx from 'clsx'
import { ChangeEvent, InputHTMLAttributes } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  checked: boolean
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  size?: number
  label: string
}

const DayOfWeekCheckbox = ({ id, checked, onChange, size = 40, label, disabled, ...props }: CheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />

      <label
        htmlFor={id}
        className={clsx(
          'flex items-center justify-center rounded-full border transition-all duration-200',
          `${checked ? 'border-main bg-orange-50' : 'border-gray-100 bg-white'} ${disabled ? 'cursor-default' : 'cursor-pointer'}`
        )}
        style={{ width: size, height: size }}
      >
        <span className={clsx(checked ? 'text-main' : 'text-gray-400')}>{label}</span>
      </label>
    </div>
  )
}

export default DayOfWeekCheckbox
