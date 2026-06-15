'use client'

import Script from 'next/script'
import { Swiper, SwiperSlide } from 'swiper/react'
import { type ReactNode } from 'react'
import { useCourseShopMap, type ShopCoord } from '@/app/course/hooks/useCourseShopMap'
import ShopPreviewCard from '@/app/course/components/ShopPreviewCard'

interface CourseShopMapViewProps {
  shops: ShopCoord[]
  /** 헤더 영역 — 페이지마다 다른 헤더를 외부에서 주입 */
  header: ReactNode
}

/**
 * 코스 소품샵 지도 뷰 — 마커/폴리라인/하단 스와이퍼를 포함한 공통 컴포넌트
 * course/add/map, course/[id]/edit/map 에서 공통으로 사용
 */
export default function CourseShopMapView({ shops, header }: CourseShopMapViewProps) {
  const shopsWithCoords = shops.filter((s) => s.lat && s.lng)
  const { mapDivRef, swiperRef, handleScriptLoad, onSlideChange } = useCourseShopMap(shopsWithCoords)

  return (
    <div className="relative -mb-60 h-[calc(var(--vh,1vh)*100-56px)] w-full overflow-hidden">
      <Script
        strategy="lazyOnload"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
        onLoad={handleScriptLoad}
      />

      {/* 헤더 슬롯 */}
      {header}

      {/* 지도 */}
      <div ref={mapDivRef} className="h-full w-full pt-56" />

      {/* 하단 스와이퍼 */}
      {shopsWithCoords.length > 0 && (
        <div className="absolute bottom-24 left-0 right-0 z-10">
          <Swiper
            slidesPerView={1.15}
            spaceBetween={10}
            centeredSlides
            onSwiper={(s) => {
              swiperRef.current = s
            }}
            onSlideChange={(s) => onSlideChange(s.activeIndex)}
          >
            {shopsWithCoords.map((shop, index) => (
              <SwiperSlide key={shop.id}>
                <ShopPreviewCard shop={shop} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  )
}
