import { ShopType } from '@/shared/types/shopType'
import MapViewButton from '../MapViewButton'
import SearchIcon from '@/shared/components/icons/SearchIcon'
import CategoryButton from '../CategoryButton'
import WishViewButton from '../WishViewButton'
import { useSearchStore } from '@/shared/store/useSearchStore'
import Flex from '@/shared/components/layout/Flex'
import Image from 'next/image'
import Link from 'next/link'
import { handleImageError } from '@/shared/utils/handleImageError'
import { useEffect, useRef, useState } from 'react'
import { getDistance } from '@/shared/utils/getDistance'
import { getCurrentLocation } from '@/shared/utils/getCurrentLocation'
import RoadFindButton from '@/shared/components/button/RoadFindButton'
import { applefindUrl, kakaoFindUrl, naverFindUrl } from '@/shared/utils/findShop'
import { useLocationStore } from '@/shared/store/useLocationStore'

interface ListViewProps {
  className?: string
  shopData: ShopType[]
  isWishListView: boolean
  isCategoryView: boolean
  toggleMapViewMode: () => void
  handleClickWishList: () => void
  openCategoryModal: () => void
}

export default function ListView({
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
  const [headerHeight, setHeaderHeight] = useState<number>(122)
  const [currentLat, setCurrentLat] = useState<number | null>(0)
  const [currentLng, setCurrentLng] = useState<number | null>(0)

  const handleSavePrevLocation = (lat: number, lng: number, id: number) => {
    setPrevShop({ id, lat, lng })
  }

  useEffect(() => {
    if (headerRef.current) {
      const offsetHeight = headerRef.current.offsetHeight
      setHeaderHeight(offsetHeight)
    }
  }, [])

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
    <div className={`${className} h-full`}>
      <div ref={headerRef} className="fixed z-sticky flex w-full max-w-screen flex-col bg-white px-18 pt-16">
        <Link href="/search" onClick={() => setSearchValue('')}>
          <div className="relative h-46 w-full">
            <div className="absolute left-10 top-[52%] -translate-y-1/2">
              <SearchIcon fill="#9EA4AA" />
            </div>
            <div className="flex h-full w-full items-center rounded-12 bg-gray-50 pl-46 text-gray-400 font-body1_m focus:outline-main">
              찾고있는 소품샵이 있나요?
            </div>
          </div>
        </Link>

        <div className="z-important my-8 flex items-center gap-8">
          <WishViewButton isActive={isWishListView} onClick={handleClickWishList} />
          <CategoryButton isActive={isCategoryView} onClick={openCategoryModal} />
        </div>
      </div>

      <div className="h-full" style={{ paddingTop: headerHeight }}>
        {shopData.map((shop) => (
          <Link
            key={`home_list_view_shop_${shop.id}`}
            href={`/shop/${shop.id}`}
            onClick={() => handleSavePrevLocation(shop.lat, shop.lng, shop.id)}
            className="overflow-hidden bg-white"
          >
            <Flex align="center" className="border-b border-gray-100 px-18 py-16">
              <div className="relative h-72 min-w-72 overflow-hidden rounded-8">
                <Image
                  src={shop.mainImage || '/images/default_item.svg'}
                  style={{ objectFit: 'cover' }}
                  fill
                  alt=""
                  onError={handleImageError}
                />
              </div>

              <Flex className="flex-1 overflow-x-hidden" align="center">
                <div className="flex flex-1 flex-col overflow-x-hidden px-8">
                  <h4 className="mb-6 overflow-hidden text-ellipsis whitespace-nowrap font-title4_semi">{shop.name}</h4>
                  <p className="text-gray-400 font-body1_m">
                    {currentLat === 0 ? '-' : getDistance(Number(currentLat), Number(currentLng), shop.lat, shop.lng)}
                  </p>
                </div>
                <RoadFindButton
                  naverUrl={naverFindUrl(shop.name, shop.lat, shop.lng)}
                  kakaoUrl={kakaoFindUrl(shop.name, shop.lat, shop.lng)}
                  appleUrl={applefindUrl(shop.lat, shop.lng)}
                />
              </Flex>
            </Flex>
          </Link>
        ))}
      </div>

      <div className="fixed bottom-76 left-1/2 flex w-full -translate-x-1/2 flex-col items-end gap-20 px-16 layout-center">
        <MapViewButton onClick={toggleMapViewMode} />
      </div>
    </div>
  )
}
