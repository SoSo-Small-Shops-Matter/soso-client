'use client'

import Loading from '@/shared/components/loading/Loading'
import useMapStore from '@/shared/store/useMapStore'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

interface NaverMapProps {
  width?: string
  height?: string
  markerEvent?: (marker: naver.maps.Marker, data: any) => void
  isDisabled?: boolean
}

interface CustomMap extends naver.maps.Map {
  customMarkers?: naver.maps.Marker[]
}

export default function NaverMap({ width, height, markerEvent, isDisabled }: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const { setMap, center, minZoom, zoom, map, markers } = useMapStore()

  const [loading, setLoading] = useState(true)

  const initMap = () => {
    if (!window.naver || !mapRef.current) return

    const mapOptions = {
      center: new naver.maps.LatLng(center.lat, center.lng),
      zoom: zoom,
      minZoom: minZoom,
      draggable: !isDisabled,
      scrollWheel: !isDisabled,
      pinchZoom: !isDisabled,
      keyboardShortcuts: !isDisabled,
      disableDoubleTapZoom: !!isDisabled,
      disableDoubleClickZoom: !!isDisabled,
      disableTwoFingerTapZoom: !!isDisabled,
    }

    const newMap = new naver.maps.Map(mapRef.current, mapOptions) as CustomMap
    newMap.customMarkers = []
    setMap(newMap)

    setLoading(false)
  }

  const updateMarkers = () => {
    if (!map) return

    const customMap = map as CustomMap

    customMap.customMarkers?.forEach((marker) => marker.setMap(null))
    customMap.customMarkers = []

    const newMarkers = markers.map((markerData) => {
      const newMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(markerData.position.lat, markerData.position.lng),
        map: map,
        icon: markerData.icon || {
          content: `<div style="width:48px; height:48px"><img width='48' height='48' src="/images/marker/map_active_marker.svg" alt="지도 마커" ></img></div>`,
        },
        zIndex: markerData.zIndex || 1,
      })

      naver.maps.Event.addListener(newMarker, 'click', () => {
        map.panTo(newMarker.getPosition())
        if (markerEvent) {
          markerEvent(newMarker, markerData)
        }
      })

      return newMarker
    })

    customMap.customMarkers = newMarkers
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.naver && mapRef.current) {
        initMap()
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!map) return

    map.setOptions('draggable', !isDisabled)
    map.setOptions('scrollWheel', !isDisabled)
    map.setOptions('pinchZoom', !isDisabled)
    map.setOptions('keyboardShortcuts', !isDisabled)
    map.setOptions('disableDoubleTapZoom', !!isDisabled)
    map.setOptions('disableDoubleClickZoom', !!isDisabled)
    map.setOptions('disableTwoFingerTapZoom', !!isDisabled)
  }, [map, isDisabled])

  useEffect(() => {
    if (map) {
      updateMarkers()
    }
  }, [map, markers])

  useEffect(() => {
    if (!map) return
    map.panTo(new naver.maps.LatLng(center.lat, center.lng))
  }, [map, center])

  useEffect(() => {
    if (!map) return
    map.setZoom(zoom)
  }, [zoom])

  const mapStyle = {
    overFlowX: 'hidden',
    overFlowY: 'hidden',
    width: width || '100%',
    height: height || 'calc(100vh - 60px)',
  }

  return (
    <>
      <Script
        strategy="lazyOnload"
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
      />

      {loading && <Loading />}

      <div ref={mapRef} id="map" style={mapStyle} />
    </>
  )
}
