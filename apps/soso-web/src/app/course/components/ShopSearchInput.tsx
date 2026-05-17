import SearchIcon from '@/shared/components/icons/SearchIcon'
import { ChangeEvent } from 'react'

interface ShopSearchInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function ShopSearchInput({ value, onChange }: ShopSearchInputProps) {
  return (
    <div className="relative px-20 pb-0 pt-12">
      <input
        type="text"
        placeholder="찾고 있는 소품샵이 있나요?"
        value={value}
        onChange={onChange}
        className="h-44 w-full rounded-10 bg-gray-50 py-12 pl-16 pr-44 text-gray-800 outline-none font-body_m placeholder:text-gray-300"
      />
      <div className="absolute right-36 top-1/2 -translate-y-1/2 pt-6">
        <SearchIcon fill="var(--gray-400)" />
      </div>
    </div>
  )
}
