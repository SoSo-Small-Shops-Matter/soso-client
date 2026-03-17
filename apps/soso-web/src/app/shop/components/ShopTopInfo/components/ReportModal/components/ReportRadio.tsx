import CheckIcon from '@/app/shop/components/ShopTopInfo/components/ReportModal/components/ReportRadio/components/CheckIcon'
import { InputHTMLAttributes, useState } from 'react'

interface ReportRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string
  id: string
  name: string
  isChecked: boolean
}

export default function ReportRadio({ text, id, name, isChecked, ...props }: ReportRadioProps) {
  return (
    <div className="w-full">
      <input type="radio" name={name} id={id} checked={isChecked} {...props} className="hidden" />
      <label htmlFor={id} className="flex w-full cursor-pointer items-center justify-between py-18">
        <p className="text-gray-500 font-body1_m">{text}</p>
        {isChecked && <CheckIcon />}
      </label>
    </div>
  )
}
