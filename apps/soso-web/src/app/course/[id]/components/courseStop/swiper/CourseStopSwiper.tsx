'use client'

import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import type { CourseStopDto } from '@/shared/api/course/types'
import { CourseStopCard } from './CourseStopCard'

interface Props {
  stops: CourseStopDto[]
  selectedIndex: number
  onSelect: (index: number) => void
  stampedIds: Set<number>
  onToggleStamp: (shopId: number) => void
}

export function CourseStopSwiper({ stops, selectedIndex, onSelect, stampedIds, onToggleStamp }: Props) {
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
        {stops.map((stop) => (
          <SwiperSlide key={stop.shopId}>
            <CourseStopCard stop={stop} isStamped={stampedIds.has(stop.shopId)} onToggleStamp={onToggleStamp} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
