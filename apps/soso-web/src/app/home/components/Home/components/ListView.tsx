import { ShopType } from '@/shared/types/shopType'
import MapViewButton from './MapViewButton'
import SearchIcon from '@/shared/components/icons/SearchIcon'
import CategoryButton from './CategoryButton'
import WishViewButton from './WishViewButton'
import { useSearchStore } from '@/shared/store/useSearchStore'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { getCurrentLocation } from '@/shared/utils/getCurrentLocation'
import { useLocationStore } from '@/shared/store/useLocationStore'
import { useVirtualizer } from '@tanstack/react-virtual'
import ListViewItem from './ListViewItem'

interface ListViewProps {
  isMapViewMode: boolean
  className?: string
  shopData: ShopType[]
  isWishListView: boolean
  isCategoryView: boolean
  toggleMapViewMode: () => void
  handleClickWishList: () => void
  openCategoryModal: () => void
}

export default function ListView({
  isMapViewMode,
  className,
  shopData,
  isWishListView,
  isCategoryView,
  toggleMapViewMode,
  handleClickWishList,
  openCategoryModal,
}: ListViewProps) {
  const { setPrevShop } = useLocationStore()
  const { setSearchValue } = useSearchStore()
  const headerRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState<number>(122)
  const [currentLat, setCurrentLat] = useState<number | null>(0)
  const [currentLng, setCurrentLng] = useState<number | null>(0)
  const [scrollElement, setScrollElement] = useState<Element | null>(null)

  useEffect(() => {
    if (parentRef.current) {
      const parent = parentRef.current.closest('.overflow-y-auto')
      if (parent) {
        setScrollElement(parent)
      }
    }
  }, [])

  const virtualizer = useVirtualizer({
    count: shopData.length,
    getScrollElement: () => scrollElement,
    estimateSize: () => 105,
    overscan: 5,
    scrollMargin: headerHeight,
  })

  const handleSavePrevLocation = (lat: number, lng: number, id: number) => {
    setPrevShop({ id, lat, lng })
  }

  useEffect(() => {
    if (!isMapViewMode && headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [isMapViewMode])

  useEffect(() => {
    const setCurrentLocation = async () => {
      const currentLocation = await getCurrentLocation()

      if (currentLocation === 'denied') {
        return
      }

      setCurrentLat(Number(currentLocation.lat))
      setCurrentLng(Number(currentLocation.lng))
    }

    setCurrentLocation()
  }, [])

  return (
    <div ref={parentRef} className={className}>
      <div ref={headerRef} className="fixed z-sticky flex w-full max-w-screen flex-col bg-white px-18 pt-16">
        <Link href="/search" onClick={() => setSearchValue('')}>
          <div className="relative h-46 w-full">
            <div className="absolute left-10 top-[52%] -translate-y-1/2">
              <SearchIcon fill="#9EA4AA" />
            </div>
            <div className="flex h-full w-full items-center rounded-12 bg-gray-50 pl-46 text-gray-400 font-body_m focus:outline-main">
              찾고있는 소품샵이 있나요?
            </div>
          </div>
        </Link>

        <div className="z-important my-8 flex items-center gap-8">
          <WishViewButton isActive={isWishListView} onClick={handleClickWishList} />
          <CategoryButton isActive={isCategoryView} onClick={openCategoryModal} />
        </div>
      </div>

      <div
        className="relative w-full"
        style={{
          height: `${virtualizer.getTotalSize() + headerHeight}px`,
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const shop = shopData[virtualItem.index]
          return (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <ListViewItem
                shop={shop}
                currentLat={currentLat}
                currentLng={currentLng}
                onClick={handleSavePrevLocation}
              />
            </div>
          )
        })}
      </div>

      <div className="fixed bottom-76 left-1/2 flex w-full -translate-x-1/2 flex-col items-end gap-20 px-16 layout-center">
        <MapViewButton onClick={toggleMapViewMode} />
      </div>
    </div>
  )
}
