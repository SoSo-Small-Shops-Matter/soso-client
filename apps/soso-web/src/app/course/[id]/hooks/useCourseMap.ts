import { useEffect, useRef, useState } from 'react'
import type { CourseDetailDto, CourseShopSummary } from '@/shared/api/course/types'
import useMapStore from '@/shared/store/useMapStore'
import {
  COURSE_DEFAULT_ZOOM,
  COURSE_MAX_ZOOM,
  createActiveMarkerIcon,
  createDefaultMarkerIcon,
  drawPolylines,
  initCourseMap,
  renderMarkers,
  zoomWithDragLock,
} from '../utils/courseMapUtils'
import type { CourseMarker } from '../utils/courseMapUtils'

export function useCourseMap(course?: CourseDetailDto) {
  const { map, setMap, addMarker: updateMarker, markers, moveCenter, clearMarkers } = useMapStore()

  const courseMapRef = useRef<HTMLDivElement>(null)
  const markerRefs = useRef<naver.maps.Marker[]>([])
  const selectedMarkerRef = useRef<{ instance: naver.maps.Marker; originalIcon: CourseMarker['icon'] } | null>(null)

  const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(null)

  const initCourseMapOnScriptLoad = () => {
    const firstCourseStop = course?.stops[0].shop
    if (!firstCourseStop) {
      return
    }

    const newMap = initCourseMap({
      mapOptions: {
        zoom: COURSE_DEFAULT_ZOOM,
        minZoom: 1,
        draggable: true,
        scrollWheel: true,
        pinchZoom: true,
        keyboardShortcuts: true,
        disableDoubleTapZoom: false,
        disableDoubleClickZoom: false,
        disableTwoFingerTapZoom: false,
      },
      firstCourseStop,
      courseMapRef,
    })

    if (newMap) setMap(newMap)
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

  useEffect(() => {
    if (window.naver?.maps && course) {
      initCourseMapOnScriptLoad()
      course.stops.forEach((stop, index) => {
        updateMarker({
          id: stop.shopId,
          position: { lat: stop.shop.lat, lng: stop.shop.lng },
          icon: createDefaultMarkerIcon(index + 1),
        })
      })
    }

    return () => {
      clearMarkers()
    }
  }, [window.naver?.maps, course])

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
  }, [map, markers])

  return { courseMapRef, selectCourseStop, initCourseMapOnScriptLoad, selectedStopIndex }
}
