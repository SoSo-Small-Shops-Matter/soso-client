import AddButton from '@/shared/components/button/AddButton'
import WhiteXIcon from '@/shared/components/ui/AddFileUi/components/WhiteXIcon'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode } from 'swiper/modules'

interface AddFileUiProps {
  previewArr: string[]
  removeFile: (index: number) => void
  removePrevFile: (index: number) => void
  addFiles: (newFiles: File[]) => void
  maxLength?: number
  images?: { id: number; url: string }[]
}

export default function AddFileUi({
  previewArr,
  addFiles,
  removeFile,
  removePrevFile,
  maxLength = 3,
  images,
}: AddFileUiProps) {
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    addFiles(Array.from(e.target.files))
  }

  return (
    <Swiper
      modules={[Navigation, FreeMode]}
      slidesPerView="auto"
      spaceBetween={8}
      freeMode={true}
      grabCursor={true}
      className="w-full"
    >
      {images?.map((image, index) => (
        <SwiperSlide key={`${image}-${index}`} style={{ width: 'auto' }}>
          <div className="relative h-72 w-72 overflow-hidden rounded-12">
            <Image fill style={{ objectFit: 'cover' }} src={image.url || '/images/jojo.jpg'} alt="이미지 미리보기" />
            <button
              onClick={() => removePrevFile(index)}
              className="absolute right-4 top-4 flex h-20 w-20 items-center justify-center rounded-full bg-black/60"
            >
              <WhiteXIcon />
            </button>
          </div>
        </SwiperSlide>
      ))}
      {previewArr?.map((preview, index) => (
        <SwiperSlide key={`${preview}-${index}`} style={{ width: 'auto' }}>
          <div className="relative h-72 w-72 overflow-hidden rounded-12">
            <Image fill style={{ objectFit: 'cover' }} src={preview || '/images/jojo.jpg'} alt="이미지 미리보기" />
            <button
              onClick={() => removeFile(index)}
              className="absolute right-4 top-4 flex h-20 w-20 items-center justify-center rounded-full bg-black/60"
            >
              <WhiteXIcon />
            </button>
          </div>
        </SwiperSlide>
      ))}

      <SwiperSlide style={{ width: 'auto' }}>
        {previewArr.length + (images?.length || 0) < maxLength && <AddButton onChange={handleChangeFile} />}
      </SwiperSlide>
    </Swiper>
  )
}
