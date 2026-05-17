'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import Header from '@/shared/components/layout/Header'
import { useCourseAddStore, SelectedShop } from '@/shared/store/useCourseAddStore'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import {
  createDefaultMarkerIcon,
  createActiveMarkerIcon,
  COURSE_DEFAULT_ZOOM,
  COURSE_MAX_ZOOM,
  zoomWithDragLock,
} from '@/app/course/[id]/utils/courseMapUtils'
import ShopPreviewCard from './component/ShopPreviewCard'

export default function CourseAddMapPage() {
  const router = useRouter()
  const { selectedShops } = useCourseAddStore()
  const shopsWithCoords = selectedShops.filter((s) => s.lat && s.lng)

  const mapDivRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<naver.maps.Map | null>(null)
  const markerRefs = useRef<naver.maps.Marker[]>([])
  const polylinesRef = useRef<naver.maps.Polyline[]>([])
  const selectedMarkerRef = useRef<{
    instance: naver.maps.Marker
    originalIcon: ReturnType<typeof createDefaultMarkerIcon>
  } | null>(null)
  const swiperRef = useRef<SwiperType | null>(null)

  const [isMapReady, setIsMapReady] = useState(false)

  const initMap = () => {
    if (!window.naver || !mapDivRef.current || shopsWithCoords.length === 0) return

    const first = shopsWithCoords[0]
    const map = new naver.maps.Map(mapDivRef.current, {
      center: new naver.maps.LatLng(first.lat!, first.lng!),
      zoom: COURSE_DEFAULT_ZOOM,
      draggable: true,
      scrollWheel: true,
    })
    mapRef.current = map
    setIsMapReady(true)
  }

  const renderAll = (map: naver.maps.Map, shops: SelectedShop[]) => {
    const newMarkers = shops.map((shop, index) => {
      const icon = createDefaultMarkerIcon(index + 1)
      const marker = new naver.maps.Marker({
        map,
        position: new naver.maps.LatLng(shop.lat!, shop.lng!),
        icon,
        clickable: true,
      })
      marker.addListener('click', () => selectStop(index))
      return marker
    })
    markerRefs.current = newMarkers

    // 폴리라인(점선) 렌더링
    if (shops.length >= 2) {
      const path = shops.map((s) => new naver.maps.LatLng(s.lat!, s.lng!))
      const polyline = new naver.maps.Polyline({
        map,
        path,
        strokeColor: '#FF7F50',
        strokeWeight: 3,
        strokeLineCap: 'round',
        strokeStyle: 'shortdash',
      })
      polylinesRef.current = [polyline]
    }

    // 첫 번째 마커 선택
    selectStop(0)
  }

  const selectStop = (index: number) => {
    const map = mapRef.current
    const shop = shopsWithCoords[index]
    if (!map || !shop) return

    // 이전 선택 마커 복원
    if (selectedMarkerRef.current) {
      const { instance, originalIcon } = selectedMarkerRef.current
      instance.setIcon(originalIcon)
    }

    // 새 마커 활성화
    const marker = markerRefs.current[index]
    if (marker) {
      const activeIcon = createActiveMarkerIcon(index + 1)
      marker.setIcon(activeIcon)
      selectedMarkerRef.current = {
        instance: marker,
        originalIcon: createDefaultMarkerIcon(index + 1),
      }
    }

    map.panTo(new naver.maps.LatLng(shop.lat!, shop.lng!))
    zoomWithDragLock(map, COURSE_MAX_ZOOM)

    // 스와이퍼 동기화
    if (swiperRef.current && swiperRef.current.activeIndex !== index) {
      swiperRef.current.slideTo(index)
    }
  }

  const handleScriptLoad = () => {
    initMap()
  }

  useEffect(() => {
    // 스크립트가 이미 로드된 경우 바로 초기화
    if (window.naver?.maps) {
      initMap()
    }
  }, [])

  useEffect(() => {
    if (!isMapReady || !mapRef.current) return
    renderAll(mapRef.current, shopsWithCoords)
  }, [isMapReady])

  useEffect(() => {
    if (selectedShops.length === 0) {
      router.replace('/course/add/finalize')
    }
  }, [selectedShops.length, router])

  if (selectedShops.length === 0) return null

  return (
    <div className="relative h-[calc(var(--vh,1vh)*100-56px)] w-full overflow-hidden">
      <Script
        strategy="lazyOnload"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
        onLoad={handleScriptLoad}
      />

      {/* 헤더 */}
      <Header title="코스 추가하기" />

      {/* 지도 */}
      <div ref={mapDivRef} className="h-full w-full" />

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
            onSlideChange={(s) => selectStop(s.activeIndex)}
          >
            {shopsWithCoords.map((shop, index) => (
              <SwiperSlide key={shop.id}>
                <ShopPreviewCard shop={shop} index={index} onNavigate={() => router.push(`/shop/${shop.id}`)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  )
}
