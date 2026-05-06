import Input from '@/shared/components/inputs/Input'
import { ChangeEvent } from 'react'

interface CourseNameInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function CourseNameInput({ value, onChange }: CourseNameInputProps) {
  return (
    <div className="px-20 pb-24">
      <div className="flex flex-col gap-8">
        <label className="font-title4_semi">코스 이름</label>
        <Input placeholder="코스 이름을 입력해 주세요." value={value} onChange={onChange} maxLength={30} />
        <p className="text-right text-gray-300 font-caption">{value.length}/30</p>
      </div>
    </div>
  )
}
