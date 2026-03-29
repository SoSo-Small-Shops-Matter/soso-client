import React from 'react'

interface RadioProps {
  id: string
  name: string
  value: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  disabled?: boolean
  className?: string
}

const Radio = ({ id, name, value, checked, onChange, label, disabled = false, className = '' }: RadioProps) => {
  return (
    <div className={`flex cursor-pointer items-center ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only" // 실제 라디오 버튼은 화면에서 숨김
      />
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center"
        onClick={(e) => {
          if (disabled) {
            e.preventDefault()
          }
        }}
      >
        <div
          className={`mr-[10px] flex h-[20px] w-[20px] items-center justify-center rounded-full border ${
            checked ? 'border-main' : 'border-gray-200'
          }`}
        >
          {checked && <div className="h-[12px] w-[12px] rounded-full bg-main"></div>}
        </div>
        <span className="text-[16px] font-medium">{label}</span>
      </label>
    </div>
  )
}

export default Radio
