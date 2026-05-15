import { useEffect, useRef, useState } from 'react'
import type { CourseDetailDto, CourseShopSummary, SharedCourseDto } from '@/shared/api/course/types'

import useMapStore from '@/shared/store/useMapStore'
import {
  COURSE_DEFAULT_ZOOM,
  COURSE_MAP_OPTIONS,
  COURSE_MAX_ZOOM,
  createActiveMarkerIcon,
  createDefaultMarkerIcon,
  drawPolylines,
  initCourseMap,
  renderMarkers,
  zoomWithDragLock,
} from '../utils/courseMapUtils'
import { getStopShopId } from '../../utils/stopUtils'
import type { CourseMarker } from '../utils/courseMapUtils'

export function useCourseMap(course?: CourseDetailDto | SharedCourseDto) {
  const { map, setMap, addMarker: updateMarker, markers, moveCenter, clearMarkers } = useMapStore()

  const courseMapRef = useRef<HTMLDivElement>(null)
  const markerRefs = useRef<naver.maps.Marker[]>([])
  const selectedMarkerRef = useRef<{ instance: naver.maps.Marker; originalIcon: CourseMarker['icon'] } | null>(null)

  const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(null)
  const [isNaverMapsReady, setIsNaverMapsReady] = useState(() => typeof window !== 'undefined' && !!window.naver?.maps)

  const onNaverMapsLoad = () => {
    setIsNaverMapsReady(true)
  }

  const selectCourseStop = (index: number) => {
    const stop = course?.stops[index]
    if (!stop) return

    const prevSelectedStop = selectedMarkerRef.current
    if (prevSelectedStop) {
      const { instance, originalIcon } = prevSelectedStop
      instance.setIcon(originalIcon)
    }

    const curSelectedStop = markerRefs.current[index]
    if (curSelectedStop) {
      curSelectedStop.setIcon(createActiveMarkerIcon(index + 1))
      selectedMarkerRef.current = { instance: curSelectedStop, originalIcon: markers[index]?.icon }
    }

    setSelectedStopIndex(index)
    moveCenter(stop.shop.lat, stop.shop.lng)
    if (map) zoomWithDragLock(map, COURSE_MAX_ZOOM)
  }

  const clearStoreState = () => {
    clearMarkers()
    useMapStore.setState({ map: null })
  }

  const clearNaverMarkers = (renderedMarkers: naver.maps.Marker[]) => {
    renderedMarkers.forEach((m) => m.setMap(null))
    markerRefs.current = []
    selectedMarkerRef.current = null
  }

  useEffect(() => {
    const firstStopPosition = course?.stops[0]?.shop
    if (!isNaverMapsReady || !course || !firstStopPosition) return

    const newMap = initCourseMap({
      mapOptions: COURSE_MAP_OPTIONS,
      firstStopPosition,
      courseMapRef,
    })
    if (newMap) setMap(newMap)

    course.stops.forEach((stop, index) => {
      updateMarker({
        id: getStopShopId(stop),
        position: { lat: stop.shop.lat, lng: stop.shop.lng },
        icon: createDefaultMarkerIcon(index + 1),
      })
    })

    return () => {
      clearStoreState()
    }
  }, [course, isNaverMapsReady])

  useEffect(() => {
    if (!window.naver || !map) return

    const renderedMarkers = renderMarkers({
      map,
      markers,
      onMarkerClick: ({ label }) => {
        selectCourseStop(label - 1)
      },
    })
    markerRefs.current = renderedMarkers

    const polylinePaths = course?.stops.map((stop) => stop.shop) ?? []
    drawPolylines(map, polylinePaths)
    map.setZoom(COURSE_DEFAULT_ZOOM, true)
    selectCourseStop(0)

    return () => {
      clearNaverMarkers(renderedMarkers)
    }
  }, [map, markers])

  return { courseMapRef, selectCourseStop, onNaverMapsLoad, selectedStopIndex }
}
