'use client'

import SearchIcon from '@/shared/components/icons/SearchIcon'
import Input from '@/shared/components/inputs/Input'
import { useSearchStore } from '@/shared/store/useSearchStore'
import { ChangeEvent, useEffect, useRef } from 'react'

export default function HeaderSearch() {
  const { searchValue, setSearchValue } = useSearchStore()

  const inputRef = useRef<HTMLInputElement>(null) //

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="fixed top-0 z-sticky h-46 w-full px-16 py-10 layout-center">
      <div className="relative">
        <div className="absolute left-16 top-1/2 -translate-y-1/2">
          <SearchIcon fill="#9EA4AA" />
        </div>
        <Input
          ref={inputRef}
          height="100%"
          placeholder="소품샵, 주소 등 검색어를 입력해 주세요."
          className="pl-46"
          value={searchValue}
          onChange={handleChangeSearchValue}
        />
      </div>
    </div>
  )
}
