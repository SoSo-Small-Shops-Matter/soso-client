'use client'

import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import type { CourseStopDto, SharedStopDto } from '@/shared/api/course/types'
import { CourseStopCard } from './CourseStopCard'
import { getStopShopId } from '../../../utils/courseMapUtils'

interface Props {
  stops: CourseStopDto[] | SharedStopDto[]
  selectedIndex: number
  onSelect: (index: number) => void
  stampedIds?: Set<number>
  onToggleStamp?: (shopId: number) => void
  showStamp?: boolean
  likedStopIds?: Set<number>
  onToggleLike?: (shopId?: number) => void
}

export function CourseStopSwiper({
  stops,
  selectedIndex,
  onSelect,
  stampedIds,
  onToggleStamp,
  showStamp = true,
  likedStopIds,
  onToggleLike,
}: Props) {
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    const swiper = swiperRef.current
    if (swiper && swiper.activeIndex !== selectedIndex) {
      swiper.slideTo(selectedIndex)
    }
  }, [selectedIndex])

  return (
    <div className="absolute bottom-6 left-0 right-0 z-10">
      <Swiper
        slidesPerView={1.2}
        spaceBetween={10}
        centeredSlides={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => onSelect(swiper.activeIndex)}
      >
        {stops.map((stop) => {
          const shopId = getStopShopId(stop)
          return (
            <SwiperSlide key={shopId}>
              <CourseStopCard
                stop={stop}
                isStamped={stampedIds?.has(shopId)}
                onToggleStamp={onToggleStamp}
                showStamp={showStamp}
                isLiked={likedStopIds?.has(shopId) ?? false}
                onToggleLike={onToggleLike}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
