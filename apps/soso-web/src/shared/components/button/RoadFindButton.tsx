'use client'

import MapButton from '@/shared/components/button/RoadFindButton/components/MapButton'
import AirplaneIcon from '@/shared/components/icons/AirplaneIcon'
import XIcon from '@/shared/components/icons/XIcon'
import Flex from '@/shared/components/layout/Flex'
import BottomModal from '@/shared/components/modal/BottomModal'
import { MouseEvent, useState } from 'react'

interface RoadFindButtonProps {
  kakaoUrl?: string
  naverUrl?: string
  appleUrl?: string
}

export default function RoadFindButton({ kakaoUrl, naverUrl, appleUrl }: RoadFindButtonProps) {
  const [isFindModal, setIsFindModal] = useState(false)

  const handleToggleFindModal = (e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsFindModal((prev) => !prev)
  }

  return (
    <>
      <button className="h-30 w-69 rounded-8 bg-orange-light" onClick={handleToggleFindModal}>
        <Flex justify="center" align="center" className="h-full w-full" gap={3}>
          <AirplaneIcon />
          <span className="text-main font-caption">길찾기</span>
        </Flex>
      </button>
      <BottomModal isOpen={isFindModal} onClose={handleToggleFindModal}>
        <Flex direction="col" gap={18} className="relative w-full">
          <Flex justify="between" align="center" className="w-full">
            <h4 className="font-title3_bold">길찾기</h4>
            <button onClick={handleToggleFindModal}>
              <XIcon />
            </button>
          </Flex>

          <Flex direction="col" gap={12} className="w-full">
            <MapButton title="네이버 지도" onClick={() => window.open(naverUrl, '_blank')} />
            <MapButton title="카카오 지도" onClick={() => window.open(kakaoUrl, '_blank')} />
            <MapButton title="Apple 지도" onClick={() => window.open(appleUrl, '_blank')} />
          </Flex>
        </Flex>
      </BottomModal>
    </>
  )
}
