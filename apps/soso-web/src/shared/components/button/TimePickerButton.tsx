import { ButtonHTMLAttributes } from 'react'

interface TimePickerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string
  height?: string
  label: string
}

export default function TimePickerButton({ width, height, label, ...props }: TimePickerButtonProps) {
  return (
    <button
      type="button"
      style={{
        width: width || 'auto',
        height: height || '52px',
      }}
      className="flex-1 rounded-12 bg-gray-50 text-black font-body1_m"
      {...props}
    >
      {label}
    </button>
  )
}
