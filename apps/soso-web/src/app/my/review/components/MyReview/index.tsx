import { MyReviewType } from '@/app/my/components/ProductLists/types'
import Flex from '@/shared/components/layout/Flex'
import MessageBox from '@/shared/components/layout/Review/components/MessageBox'
import ShopInfo from '@/shared/components/ui/ShopInfo'
import { formatStringDate } from '@/shared/utils/formatStringDate'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode } from 'swiper/modules'
import Image from 'next/image'
import { getSafeImageUrl } from '@/shared/utils/getSafeImageUrl'

interface MyReviewProps {
  data: MyReviewType
}

export default function MyReview({ data }: MyReviewProps) {
  return (
    <Flex direction="col" gap={20} className="w-full px-16">
      <ShopInfo name={data.shop.name} date={formatStringDate(data.createdAt)} imgUrl={data.shop.mainImage || ''} />
      <MessageBox>
        <Flex direction="col" gap={16}>
          <pre className="whitespace-pre-wrap break-all font-['Pretendard'] text-gray-600 font-body2_m">
            {data?.content || ''}
          </pre>
          {data && data?.images?.length > 0 && (
            <Swiper
              modules={[Navigation, FreeMode]}
              slidesPerView="auto"
              spaceBetween={8}
              freeMode={true}
              grabCursor={true}
              className="w-full"
            >
              {data?.images?.map((image, index) => (
                <SwiperSlide key={`image-${image.id}`} style={{ width: 'auto' }}>
                  <div className="relative h-72 w-72">
                    <Image
                      fill
                      src={getSafeImageUrl(image?.url || '') || ''}
                      alt="리뷰 이미지"
                      className="rounded-12 object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Flex>
      </MessageBox>
    </Flex>
  )
}
