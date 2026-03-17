import Flex from '@/shared/components/layout/Flex'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode } from 'swiper/modules'
import Image from 'next/image'
import { useState } from 'react'
import ImageSwiperModal from '@/shared/components/modal/ImageSwiperModal'
import { ImageType } from '@/shared/types/shopType'

interface ReviewPhotoProps {
  data: ImageType[] | undefined
}

export default function ReviewPhoto({ data }: ReviewPhotoProps) {
  const [isImageViewer, setIsImageViewer] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleOpenImageViewer = (index: number) => {
    setSelectedIndex(index)
    setIsImageViewer(true)
  }

  const handleCloseImageViewer = () => {
    setIsImageViewer(false)
  }

  return (
    <Flex direction="col" gap={8} className="w-full">
      <h4 className="text-gray-800 font-body1_m">사진/동영상</h4>
      <Swiper
        modules={[Navigation, FreeMode]}
        slidesPerView="auto"
        spaceBetween={8}
        freeMode={true}
        grabCursor={true}
        className="w-full"
      >
        {data?.map((image, index) => (
          <SwiperSlide key={`image-${image.id}`} style={{ width: 'auto' }}>
            <div onClick={() => handleOpenImageViewer(index)} className="relative h-72 w-72">
              <Image fill src={image.url} alt="리뷰 이미지" className="rounded-12 object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <ImageSwiperModal
        isOpen={isImageViewer}
        onClose={handleCloseImageViewer}
        images={data?.map((image) => image.url) || []}
        initialSlide={selectedIndex}
      />
    </Flex>
  )
}
