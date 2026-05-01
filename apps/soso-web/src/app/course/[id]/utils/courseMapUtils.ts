import type { CourseShopSummary } from '@/shared/api/course/types'
import type { RefObject } from 'react'

export interface CourseMarker {
  id: number
  position: { lat: number; lng: number }
  icon?: {
    content: string
    anchor?: { x: number; y: number }
  }
  zIndex?: number
}

export interface MarkerClickInfo {
  label: number
}

interface CourseMapOptions {
  center: naver.maps.LatLng
  zoom: number
  minZoom: number
  draggable: boolean
  scrollWheel: boolean
  pinchZoom: boolean
  keyboardShortcuts: boolean
  disableDoubleTapZoom: boolean
  disableDoubleClickZoom: boolean
  disableTwoFingerTapZoom: boolean
}

export const COURSE_DEFAULT_ZOOM = 16

export const COURSE_MAX_ZOOM = 18

export const createDefaultMarkerIcon = (
  label: number
): {
  content: string
  anchor?: {
    x: number
    y: number
  }
} => ({
  content: `<div style="font-size:12px; width: 24px; height: 24px; border-radius: 50%; border-width:1.5px; border-color:rgba(201, 205, 210, 1); background-color:rgba(25, 25, 25, 1); color:rgba(255, 255, 255, 1); display:flex; justify-content:center; align-items:center">${label}</div>`,
  anchor: { x: 12, y: 12 },
})

export const createActiveMarkerIcon = (label: number): naver.maps.MarkerHtmlIcon => ({
  content: `<div style="position:relative;width:38px;height:46px"><img src="/images/course/course_active_marker.svg" width="38" height="46" /><span style="position:absolute;inset:0;display:flex;justify-content:center;align-items:center;color:white;font-size:16px">${label}</span></div>`,
  anchor: new naver.maps.Point(16, 30),
})

export const initCourseMap = ({
  courseMapRef,
  mapOptions,
  firstCourseStop,
}: {
  courseMapRef: RefObject<HTMLDivElement | null>
  mapOptions: Omit<CourseMapOptions, 'center'>
  firstCourseStop: CourseShopSummary
}) => {
  if (!courseMapRef.current) return

  return new naver.maps.Map(courseMapRef.current, {
    ...mapOptions,
    center: new naver.maps.LatLng(firstCourseStop.lat, firstCourseStop.lng),
  })
}

export const renderMarkers = ({
  map,
  markers,
  onMarkerClick,
}: {
  map: naver.maps.Map
  markers: CourseMarker[]
  onMarkerClick?: (info: MarkerClickInfo) => void
}): naver.maps.Marker[] => {
  return markers.map((marker, index) => {
    const originalIcon = marker.icon
    const naverMarker = new naver.maps.Marker({
      map,
      position: new naver.maps.LatLng(marker.position.lat, marker.position.lng),
      icon: originalIcon,
      clickable: true,
    })

    if (onMarkerClick) {
      naverMarker.addListener('click', () =>
        onMarkerClick({
          label: index + 1,
        })
      )
    }

    return naverMarker
  })
}

export const zoomWithDragLock = (map: naver.maps.Map, zoom: number) => {
  map.setOptions('draggable', false)
  map.setZoom(zoom, true)
  setTimeout(() => map.setOptions('draggable', true), 400)
}

export const drawPolylines = (map: naver.maps.Map, paths: { lat: number; lng: number }[]) => {
  const polylinePaths: naver.maps.LatLng[] = paths.map((path) => new naver.maps.LatLng(path.lat, path.lng))
  const polyline = new naver.maps.Polyline({
    map,
    path: polylinePaths,
  })

  polyline.setStyles({
    strokeColor: '#FF7F50',
    strokeWeight: 3,
    strokeLineCap: 'round',
    strokeStyle: 'shortdash',
  })
}
