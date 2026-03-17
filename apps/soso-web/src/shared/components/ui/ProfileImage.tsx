'use client'

import ImageSwiperModal from '@/shared/components/modal/ImageSwiperModal'
import { getSafeImageUrl } from '@/shared/utils/getSafeImageUrl'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

interface ProfileImage {
  imgUrl?: string | null
  size?: number
  className?: string
}
export default function ProfileImage({ imgUrl, size, className }: ProfileImage) {
  const [isImageViewer, setIsImageViewer] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleOpenImageViewer = (index: number) => {
    if (!imgUrl) {
      return
    }
    setSelectedIndex(index)
    setIsImageViewer(true)
  }

  const handleCloseImageViewer = () => {
    setIsImageViewer(false)
  }

  return (
    <>
      <div
        onClick={() => handleOpenImageViewer(0)}
        style={{
          width: size || 48,
          height: size || 48,
        }}
        className={clsx(
          'relative cursor-pointer overflow-hidden rounded-full border border-gray-100 bg-gray-100',
          className
        )}
      >
        <Image src={getSafeImageUrl(imgUrl)} fill style={{ objectFit: 'cover' }} alt="프로필" />
      </div>
      <ImageSwiperModal
        isOpen={isImageViewer}
        onClose={handleCloseImageViewer}
        images={[getSafeImageUrl(imgUrl)]}
        initialSlide={selectedIndex}
      />
    </>
  )
}
