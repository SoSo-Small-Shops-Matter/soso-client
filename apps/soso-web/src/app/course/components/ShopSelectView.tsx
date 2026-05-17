'use client'

import { ReactNode, ChangeEvent, useState } from 'react'
import { useGetShopSearchListQuery } from '@/shared/api/search/queries'
import { useGetMyWishQuery } from '@/shared/api/my/queries'
import { SelectedShop } from '@/shared/store/useCourseAddStore'
import { useDialog } from '@/shared/context/DialogContext'
import useDebounce from '@/shared/hooks/useDebounce'
import ShopSearchInput from './ShopSearchInput'
import ShopSelectTabs, { type FilterType } from './ShopSelectTabs'
import ShopSelectContent from './ShopSelectContent'

const MAX_SELECT = 30
const WISH_PAGE_SIZE = 50

interface ShopSelectViewProps {
  header: ReactNode
  bottom: ReactNode
  selectedShops: SelectedShop[]
  toggleShop: (shop: SelectedShop) => void
}

export default function ShopSelectView({ header, bottom, selectedShops, toggleShop }: ShopSelectViewProps) {
  const { openDialog, closeDialog } = useDialog()
  const [searchValue, setSearchValue] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null)
  const [locationGranted, setLocationGranted] = useState(false)
  const debouncedSearch = useDebounce(searchValue, 300)

  const { data: searchData, isLoading: isSearchLoading } = useGetShopSearchListQuery(debouncedSearch)
  const searchResults = searchData?.pages.flatMap((page) => page.data) ?? []

  const { data: wishData, isLoading: isWishLoading } = useGetMyWishQuery(WISH_PAGE_SIZE)
  const wishList = wishData?.pages.flatMap((page) => page.data) ?? []

  const isSelected = (shopId: number) => selectedShops.some((s) => s.id === shopId)
  const selectedOrder = (shopId: number) => selectedShops.findIndex((s) => s.id === shopId) + 1

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)

  const requestLocationPermission = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationGranted(true)
        setActiveFilter('recommend')
        closeDialog()
      },
      () => {
        setLocationGranted(false)
        closeDialog()
      }
    )
  }

  const handleFilterChange = (filter: FilterType) => {
    if (activeFilter === filter) {
      setActiveFilter(null)
      return
    }
    if (filter === 'recommend' && !locationGranted) {
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
          if (result.state === 'granted') {
            setLocationGranted(true)
            setActiveFilter('recommend')
          } else {
            openDialog({
              type: 'confirm',
              title: '위치 권한 필요',
              message: "추천 기능을 사용하려면 '위치' 접근권한을 허용해야 합니다.",
              leftLabel: '취소',
              rightLabel: '설정',
              onCancel: closeDialog,
              onConfirm: requestLocationPermission,
            })
          }
        })
      } else {
        requestLocationPermission()
      }
      return
    }
    setActiveFilter(filter)
  }

  const handleToggle = (shop: SelectedShop) => {
    if (!isSelected(shop.id) && selectedShops.length >= MAX_SELECT) return
    toggleShop(shop)
  }

  const isSearchMode = !!debouncedSearch

  return (
    <div className="flex h-[calc(var(--vh,1vh)*100)] flex-col bg-white">
      {header}

      <div className="fixed left-0 top-56 z-sticky w-full bg-white layout-center">
        <ShopSearchInput value={searchValue} onChange={handleChangeSearch} />
        <ShopSelectTabs activeTab={activeFilter} onTabChange={handleFilterChange} />
      </div>

      <div className="flex-1 overflow-y-auto pt-[114px]">
        <ShopSelectContent
          isSearchMode={isSearchMode}
          activeFilter={activeFilter}
          searchResults={searchResults}
          isSearchLoading={isSearchLoading}
          wishList={wishList}
          isWishLoading={isWishLoading}
          selectedCount={selectedShops.length}
          maxSelect={MAX_SELECT}
          isSelected={isSelected}
          selectedOrder={selectedOrder}
          onToggle={handleToggle}
        />
      </div>

      {bottom}
    </div>
  )
}
