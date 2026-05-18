'use client'

import { useRef, useState, useEffect } from 'react'
import type { MutableRefObject } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import {
  createDefaultMarkerIcon,
  createActiveMarkerIcon,
  COURSE_DEFAULT_ZOOM,
  COURSE_MAX_ZOOM,
  zoomWithDragLock,
} from '@/app/course/[id]/utils/courseMapUtils'

export interface ShopCoord {
  id: number
  name: string
  mainImage: string | null
  lat?: number
  lng?: number
}

interface UseCourseShopMapReturn {
  mapDivRef: MutableRefObject<HTMLDivElement | null>
  swiperRef: MutableRefObject<SwiperType | null>
  selectedIndex: number
  handleScriptLoad: () => void
  selectStop: (index: number) => void
  onSlideChange: (index: number) => void
}

export function useCourseShopMap(shops: ShopCoord[]): UseCourseShopMapReturn {
  const mapDivRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<naver.maps.Map | null>(null)
  const markerRefs = useRef<naver.maps.Marker[]>([])
  const polylinesRef = useRef<naver.maps.Polyline[]>([])
  const selectedMarkerRef = useRef<{
    instance: naver.maps.Marker
    originalIcon: ReturnType<typeof createDefaultMarkerIcon>
  } | null>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const shopsRef = useRef(shops)

  const [isMapReady, setIsMapReady] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // shops가 바뀔 때마다 최신 값을 ref에 동기화 (클로저 stale 방지)
  useEffect(() => {
    shopsRef.current = shops
  }, [shops])

  const initMap = () => {
    const shopsWithCoords = shopsRef.current.filter((s) => s.lat && s.lng)
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

  const renderAll = (map: naver.maps.Map) => {
    const shopsWithCoords = shopsRef.current.filter((s) => s.lat && s.lng)

    // 기존 마커/폴리라인 제거
    markerRefs.current.forEach((m) => m.setMap(null))
    polylinesRef.current.forEach((p) => p.setMap(null))
    markerRefs.current = []
    polylinesRef.current = []
    selectedMarkerRef.current = null

    const newMarkers = shopsWithCoords.map((shop, index) => {
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

    if (shopsWithCoords.length >= 2) {
      const path = shopsWithCoords.map((s) => new naver.maps.LatLng(s.lat!, s.lng!))
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

    selectStop(0)
  }

  const selectStop = (index: number) => {
    const map = mapRef.current
    const shopsWithCoords = shopsRef.current.filter((s) => s.lat && s.lng)
    const shop = shopsWithCoords[index]
    if (!map || !shop) return

    // 이전 마커 복원
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
    setSelectedIndex(index)

    if (swiperRef.current && swiperRef.current.activeIndex !== index) {
      swiperRef.current.slideTo(index)
    }
  }

  const handleScriptLoad = () => initMap()

  useEffect(() => {
    if (window.naver?.maps) initMap()
  }, [])

  useEffect(() => {
    if (!isMapReady || !mapRef.current) return
    renderAll(mapRef.current)
  }, [isMapReady])

  const onSlideChange = (index: number) => selectStop(index)

  return { mapDivRef, swiperRef, selectedIndex, handleScriptLoad, selectStop, onSlideChange }
}
