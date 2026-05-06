'use client'

import { useGetShopSearchListQuery } from '@/shared/api/search/queries'
import { SearchedShopType } from '@/shared/api/search/types'
import { useGetMyWishQuery } from '@/shared/api/my/queries'
import { MyWishType } from '@/shared/api/my/types'
import { ShopType } from '@/shared/api/shops/types'
import { SelectedShop, useCourseAddStore } from '@/shared/store/useCourseAddStore'
import { useDialog } from '@/shared/context/DialogContext'
import useDebounce from '@/shared/hooks/useDebounce'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import ShopSelectHeader from './components/ShopSelectHeader'
import ShopSearchInput from './components/ShopSearchInput'
import ShopSelectTabs from './components/ShopSelectTabs'
import ShopSearchResults from './components/ShopSearchResults'
import WishShopList from './components/WishShopList'
import RecommendShopList from './components/RecommendShopList'
import SelectedShopsBottom from './components/SelectedShopsBottom'

const MAX_SELECT = 30
type FilterType = 'wish' | 'recommend'

export default function CourseShopSelectPage() {
  const router = useRouter()
  const { openDialog, closeDialog } = useDialog()
  const [searchValue, setSearchValue] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null)
  const [locationGranted, setLocationGranted] = useState(false)
  const debouncedSearch = useDebounce(searchValue, 300)

  const { selectedShops, toggleShop, removeShop, reset } = useCourseAddStore()

  const { data: searchData, isLoading: isSearchLoading } = useGetShopSearchListQuery(debouncedSearch)
  const searchResults = searchData?.pages.flatMap((page) => page.data) ?? []

  const { data: wishData, isLoading: isWishLoading } = useGetMyWishQuery(50)
  const wishList = wishData?.pages.flatMap((page) => page.data) ?? []

  const isSelected = (shopId: number) => selectedShops.some((s) => s.id === shopId)
  const selectedOrder = (shopId: number) => selectedShops.findIndex((s) => s.id === shopId) + 1

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)

  const requestLocationPermission = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      () => { setLocationGranted(true); setActiveFilter('recommend'); closeDialog() },
      () => { setLocationGranted(false); closeDialog() }
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

  const toSelected = (shop: { id: number; name: string; mainImage: string | null; lat?: number; lng?: number }): SelectedShop => ({
    id: shop.id,
    name: shop.name,
    mainImage: shop.mainImage ?? null,
    lat: shop.lat,
    lng: shop.lng,
  })

  const handleToggleFromSearch = (shop: SearchedShopType) => {
    if (!isSelected(shop.id) && selectedShops.length >= MAX_SELECT) return
    toggleShop(toSelected(shop))
  }

  const handleToggleFromWish = (wish: MyWishType) => {
    if (!isSelected(wish.shop.id) && selectedShops.length >= MAX_SELECT) return
    toggleShop(toSelected(wish.shop))
  }

  const handleToggleFromRecommend = (shop: ShopType) => {
    if (!isSelected(shop.id) && selectedShops.length >= MAX_SELECT) return
    toggleShop(toSelected(shop))
  }

  const isSearchMode = !!debouncedSearch

  return (
    <div className="flex h-[calc(var(--vh,1vh)*100)] flex-col bg-white">
      <ShopSelectHeader onBack={() => router.back()} />

      <div className="fixed left-0 top-56 z-sticky w-full bg-white layout-center">
        <ShopSearchInput value={searchValue} onChange={handleChangeSearch} />
        <ShopSelectTabs activeTab={activeFilter} onTabChange={handleFilterChange} />
      </div>

      <div className="flex-1 overflow-y-auto pt-[114px]">
        {isSearchMode ? (
          <ShopSearchResults
            results={searchResults}
            isLoading={isSearchLoading}
            selectedCount={selectedShops.length}
            maxSelect={MAX_SELECT}
            isSelected={isSelected}
            selectedOrder={selectedOrder}
            onToggle={handleToggleFromSearch}
          />
        ) : activeFilter === 'wish' ? (
          <WishShopList
            wishList={wishList}
            isLoading={isWishLoading}
            selectedCount={selectedShops.length}
            maxSelect={MAX_SELECT}
            isSelected={isSelected}
            selectedOrder={selectedOrder}
            onToggle={handleToggleFromWish}
          />
        ) : activeFilter === 'recommend' ? (
          <RecommendShopList
            selectedCount={selectedShops.length}
            maxSelect={MAX_SELECT}
            isSelected={isSelected}
            selectedOrder={selectedOrder}
            onToggle={handleToggleFromRecommend}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-8 py-80">
            <p className="text-gray-400 font-body1_m">소품샵을 검색하거나 필터를 선택해 보세요.</p>
          </div>
        )}
      </div>

      <SelectedShopsBottom
        selectedShops={selectedShops}
        maxSelect={MAX_SELECT}
        onRemove={removeShop}
        onReset={reset}
      />
    </div>
  )
}
