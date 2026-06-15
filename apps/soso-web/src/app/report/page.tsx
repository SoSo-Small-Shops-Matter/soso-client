'use client'

import { useReportStore } from '@/app/report/store/useReportStore'
import Button from '@/shared/components/button/Button'
import LinkIcon from '@/shared/components/icons/LinkIcon'
import Flex from '@/shared/components/layout/Flex'
import Header from '@/shared/components/layout/Header'
import NaverMap from '@/shared/components/layout/NaverMap'
import FullMap from '@/shared/components/modal/FullMap'
import { REPORT_MARKER_ID } from '@/shared/constant/location'
import useMapStore from '@/shared/store/useMapStore'
import { getCurrentAddress } from '@/shared/utils/getCurrentAddress'
import { getCurrentLocation } from '@/shared/utils/getCurrentLocation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ReportPage() {
  const [isFullMap, setIsFullMap] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<string | undefined>('')

  const router = useRouter()

  const { shop, setShop } = useReportStore()
  const { map, setCenter, addMarker, clearMarkers } = useMapStore()

  const handleNext = () => {
    router.push('/report/write')
  }

  const handleAddressSearchLink = () => {
    router.push('/report/address')
  }

  const handleOpenFullMap = () => {
    setIsFullMap(true)
  }

  const handleCloseFullMap = () => {
    setIsFullMap(false)
  }

  useEffect(() => {
    const currentAddMarker = async () => {
      const currentLocation = await getCurrentLocation()
      if ((!shop.lat || !shop.lng) && currentLocation !== 'denied') {
        setCenter(currentLocation.lat, currentLocation.lng)
        const currentAddress = await getCurrentAddress(currentLocation.lat, currentLocation.lng)
        if (currentAddress) {
          setCurrentAddress(currentAddress)
          setShop({ ...shop, location: currentAddress, lat: currentLocation.lat, lng: currentLocation.lng })
        }
      }

      if (currentLocation === 'denied') return
    }

    clearMarkers()
    currentAddMarker()
  }, [])

  useEffect(() => {
    if (!shop.lat || !shop.lng || !map) return
    setCenter(shop.lat, shop.lng)
    addMarker({
      id: REPORT_MARKER_ID,
      position: { lat: shop.lat, lng: shop.lng },
    })
  }, [shop, map])

  return (
    <div>
      <Header title="소품샵 등록하기" />
      <Flex direction="col" gap={60} className="w-full py-20">
        <Flex direction="col" gap={20} className="w-full">
          <Flex direction="col" gap={12} className="w-full px-16">
            <h4 className="text-gray-500 font-body_m">소중한 소품샵을 등록해 주세요.</h4>
          </Flex>
          <Flex direction="col" gap={12} className="w-full px-16">
            {isFullMap ? (
              <FullMap isOpen={isFullMap} onClose={handleCloseFullMap} />
            ) : (
              <div
                onClick={handleOpenFullMap}
                className="h-[185px] w-full overflow-hidden rounded-16 border border-gray-100"
              >
                <NaverMap width="100%" height="100%" isDisabled />
              </div>
            )}

            <Flex justify="between" align="center" className="w-full">
              <button
                onClick={handleAddressSearchLink}
                className="flex h-58 w-full items-center justify-between rounded-12 border border-gray-100 bg-white px-16 text-gray-800 font-body_m"
              >
                <span>주소로 찾기</span>
                <LinkIcon />
              </button>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="col" gap={12} className="w-full px-16">
          <h4 className="text-gray-900 font-subtitle_l">이 위치가 맞나요?</h4>
          <Flex direction="col" gap={12} className="w-full">
            <Flex
              justify="center"
              align="center"
              className="h-52 w-full rounded-14 bg-[#FBF6F4] text-gray-600 font-body_m"
            >
              {shop.location || currentAddress || '-'}
            </Flex>
            <Button title="여기가 맞아요" onClick={handleNext} disabled={!shop.location} />
          </Flex>
        </Flex>
      </Flex>
    </div>
  )
}
