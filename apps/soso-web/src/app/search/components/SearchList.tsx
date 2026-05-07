'use client'

import SearchItem from '@/app/search/components/SearchList/components/SearchItem'
import { useGetShopSearchListQuery } from '@/shared/api/search/queries'
import PlaceCard from '@/shared/components/card/PlaceCard'
import Flex from '@/shared/components/layout/Flex'
import useDebounce from '@/shared/hooks/useDebounce'
import { useGetShopsQuery } from '@/shared/api/shops/queries'
import { useSearchStore } from '@/shared/store/useSearchStore'
import { getCurrentLocation } from '@/shared/utils/getCurrentLocation'
import Link from 'next/link'
import { MouseEvent, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode } from 'swiper/modules'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { ShopType } from '@/shared/types/shopType'
import Loading from '@/shared/components/loading/Loading'
import { useGetUserFindShopQuery } from '@/shared/api/search/queries'
import { useDeleteUserFindShopMutation } from '@/shared/api/search/queries'
import { useAllDeleteUserFindShopMutation } from '@/shared/api/search/queries'
import { SearchedShopType } from '@/shared/api/search/types'

interface Location {
  lat: number
  lng: number
}

export default function SearchList() {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)

  const { searchValue } = useSearchStore()
  const searchDebounceValue = useDebounce(searchValue, 300)

  const { data: shopSortData } = useGetShopsQuery({ lat: currentLocation?.lat ?? null, lng: currentLocation?.lng ?? null, sorting: true })
  const {
    data: shopSearchData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetShopSearchListQuery(searchDebounceValue)

  const { data: userFindShopData } = useGetUserFindShopQuery()

  const { mutate: deleteFindShopMutate } = useDeleteUserFindShopMutation()
  const { mutate: allDeleteFindShopMutate } = useAllDeleteUserFindShopMutation()

  const { ref, inView } = useInView({
    threshold: 0.2,
  })

  const { token } = useAuthStore()

  const handleDeleteFindShop = (e: MouseEvent<HTMLButtonElement>, shopId: number) => {
    e.stopPropagation()
    e.preventDefault()
    deleteFindShopMutate({ shopId })
  }
  const handleAllDeleteFindShop = () => {
    allDeleteFindShopMutate()
  }

  useEffect(() => {
    const fetchLocation = async () => {
      const result = await getCurrentLocation()
      if (result === 'denied') {
        setCurrentLocation(null)
      } else {
        setCurrentLocation(result)
      }
    }

    fetchLocation()
  }, [])

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading])

  // 컨테이너 애니메이션 변형
  const containerVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: {
      opacity: 0,
      y: -100,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  // 내부 콘텐츠 애니메이션 변형
  const contentVariants = {
    visible: {
      opacity: 1,
      height: 'auto',
      marginBottom: '18px',
    },
    hidden: {
      opacity: 0,
      height: 0,
      marginBottom: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        opacity: { duration: 0.2 },
      },
    },
  }

  return (
    <Flex direction="col" gap={18} className="mt-20 w-full">
      <div className="w-full">
        <AnimatePresence mode="popLayout">
          {!searchDebounceValue && userFindShopData && userFindShopData.length > 0 && (
            <motion.div
              key="recent-shops"
              initial={false}
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="w-full"
            >
              <motion.div
                initial={false}
                animate="visible"
                exit="hidden"
                variants={contentVariants}
                className="w-full overflow-hidden"
              >
                <Flex direction="col" gap={12} className="w-full px-20">
                  <Flex justify="between" align="center" className="w-full">
                    <h3 className="font-subtitle_m">최근에 찾은 소품샵</h3>
                    {token && (
                      <button onClick={handleAllDeleteFindShop} className="text-gray-400 font-caption">
                        전체 삭제
                      </button>
                    )}
                  </Flex>
                  {token ? (
                    <Swiper
                      modules={[Navigation, FreeMode]}
                      slidesPerView="auto"
                      spaceBetween={8}
                      freeMode={true}
                      grabCursor={true}
                      className="w-full"
                    >
                      {userFindShopData?.map((shop, index) => (
                        <SwiperSlide key={index} style={{ width: 'auto' }}>
                          <SearchItem
                            id={shop.shopId}
                            label={shop.shopName}
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                              handleDeleteFindShop(e, shop.shopId)
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <p className="text-gray-400 font-body_s">로그인 후 가능한 서비스입니다.</p>
                  )}
                </Flex>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full">
          <Flex direction="col" gap={4} className="w-full">
            {!searchDebounceValue && <h3 className="px-20 font-subtitle_m">내 근처 가장 인기 많은 소품샵은?</h3>}
            {!searchDebounceValue && (
              <Flex direction="col" className="w-full">
                {shopSortData?.map((shop) => (
                  <div key={shop.id} className="w-full border-b border-gray-100">
                    <PlaceCard data={shop} />
                  </div>
                ))}
              </Flex>
            )}
          </Flex>
          {shopSearchData && shopSearchData?.pages[0].data.length > 0 && (
            <Flex direction="col" className="w-full">
              {shopSearchData?.pages.map((page, index) => (
                <div className="w-full" key={`page-${index}`}>
                  {page.data.map((shop: SearchedShopType) => (
                    <div key={shop.id} className="w-full border-b border-gray-100">
                      <PlaceCard data={shop} />
                    </div>
                  ))}
                </div>
              ))}

              {!isLoading && <div ref={ref} className="h-40" />}
            </Flex>
          )}
          {shopSearchData && !shopSearchData.pages[0].data.length && (
            <Flex direction="col" justify="center" align="center" className="mt-90 w-full" gap={16}>
              <p className="text-gray-500 font-body_m">찾고 계신 장소가 없으신가요?</p>
              <Link
                href="/report"
                className="flex h-56 w-[263px] items-center justify-center rounded-16 bg-orange-light text-main font-body_m"
              >
                소중한 소품샵 제보하기
              </Link>
            </Flex>
          )}
          {shopSortData && !shopSortData.length && !shopSearchData && (
            <Flex direction="col" justify="center" align="center" className="mt-90 w-full" gap={16}>
              <p className="text-gray-500 font-body_m">내 주변 소품샵이 없어요</p>
              <Link
                href="/report"
                className="flex h-56 w-[263px] items-center justify-center rounded-16 bg-orange-light text-main font-body_m"
              >
                소중한 소품샵 제보하기
              </Link>
            </Flex>
          )}
          {isLoading && <Loading />}
        </div>
      </div>
    </Flex>
  )
}
