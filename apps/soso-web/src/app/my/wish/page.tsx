'use client'

import { useGetMyWishQuery } from '@/shared/api/my/queries'
import FilterSelectButton from '@/app/my/wish/components/FilterSelectButton'
import WishProduct from '@/app/my/wish/components/WishProduct'
import BottomArrowIcon from '@/shared/components/icons/BottomArrowIcon'
import Flex from '@/shared/components/layout/Flex'
import Header from '@/shared/components/layout/Header'
import Loading from '@/shared/components/loading/Loading'
import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { useInView } from 'react-intersection-observer'
import { useRef, useState, useEffect } from 'react'
import { useGetWishRegionQuery } from '@/shared/api/my/queries'
import { RegionType } from '@/shared/api/my/types'

const DEFAULT_REGION = {
  id: -1,
  name: '전체 지역',
}
export default function MyWishPage() {
  const [selectedRegion, setSelectedRegion] = useState<RegionType>(DEFAULT_REGION)
  const [isFilter, setIsFilter] = useState(false)

  const {
    data: myWishData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch: wishDataRefetch,
  } = useGetMyWishQuery(15, selectedRegion.id === DEFAULT_REGION.id ? undefined : selectedRegion.id)

  const { data: regionData } = useGetWishRegionQuery()

  const filterRef = useRef<HTMLDivElement>(null)

  const { ref, inView } = useInView({
    threshold: 0.2,
  })

  const handleChangeRegion = (region: RegionType) => {
    setSelectedRegion(region)
    handleToggleFilter()
  }

  const handleToggleFilter = () => {
    setIsFilter((prev) => !prev)
  }

  useClickOutside(filterRef, () => setIsFilter(false))

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading])

  useEffect(() => {
    wishDataRefetch()
  }, [selectedRegion])

  const allWishItems = myWishData?.pages.flatMap((page) => page.data) || []

  return (
    <div>
      <Header title="내가 찜한 소품샵" type="back" />
      <Flex direction="col" align="end" gap={20} className="w-full px-16 pb-28 pt-12">
        <div className="relative">
          <button className="flex items-center gap-4" onClick={handleToggleFilter}>
            <span className="text-gray-500 font-body2_m">{selectedRegion.name}</span>
            <BottomArrowIcon />
          </button>
          {isFilter && (
            <div ref={filterRef}>
              <Flex
                direction="col"
                className="absolute right-0 top-30 z-dropdown w-[126px] rounded-12 bg-white shadow-filter-select"
              >
                <FilterSelectButton
                  region={DEFAULT_REGION}
                  active={selectedRegion.id === DEFAULT_REGION.id}
                  onClick={handleChangeRegion}
                />
                {regionData?.map((region) => (
                  <FilterSelectButton
                    key={`wish_region_filter_item_${region.id}`}
                    region={region}
                    active={selectedRegion === region}
                    onClick={handleChangeRegion}
                  />
                ))}
              </Flex>
            </div>
          )}
        </div>

        <Flex className="w-full" wrap gap={11}>
          {allWishItems.map((wish) => (
            <WishProduct key={wish.shop.id} data={wish} />
          ))}
        </Flex>

        {!isLoading && <div ref={ref} className="h-40" />}

        {isLoading && <Loading />}

        {myWishData && allWishItems.length === 0 && (
          <Flex direction="col" justify="center" align="center" className="mt-90 w-full" gap={16}>
            <p className="text-center text-gray-400 font-body1_m">
              아직 찜한 소품샵이 없어요.
              <br />
              소소한 취향을 놓치지 마세요!
            </p>
          </Flex>
        )}
      </Flex>
    </div>
  )
}
