'use client'

import Flex from '@/shared/components/layout/Flex'
import ProductImage from '@/shared/components/ui/ProductImage'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode } from 'swiper/modules'
import EmptyData from '@/shared/components/ui/EmptyData'
import LinkIcon from '@/shared/components/icons/LinkIcon'
import ArrowRightAltIcon from '@/shared/components/icons/ArrowRightAltIcon'
import clsx from 'clsx'
import { SubmissionType, SUBMISSION_TYPE } from '@/shared/api/my/types'
import { WISH_LIST_LIMIT } from './ProductLists'

interface Data {
  id: number | null
  image: string | null
  name: string | null
  link: string | null
  type?: SubmissionType | null
}

interface ProductLayoutProps {
  data: Data[]
  title: string
  placeholder: string
  productLink: string
  type?: SubmissionType
  totalData?: number
}

export default function ProductLayout({ data, title, placeholder, productLink, totalData }: ProductLayoutProps) {
  const showMoreButton = totalData && totalData > WISH_LIST_LIMIT

  return (
    <Flex direction="col" gap={12} className="w-full">
      <Flex justify="between" align="center" className="w-full">
        <h3 className="font-subtitle_l text-black">{title}</h3>
        <Link href={productLink} className="flex items-center">
          <LinkIcon />
        </Link>
      </Flex>
      {data?.length > 0 ? (
        <Swiper
          modules={[Navigation, FreeMode]}
          slidesPerView="auto"
          spaceBetween={8}
          freeMode={true}
          grabCursor={true}
          className="w-full"
        >
          {data.map((item, index) => (
            <SwiperSlide style={{ width: '72px' }} key={index}>
              <Link
                href={item.type === SUBMISSION_TYPE.NEW_SHOP ? '#' : item.link || ''}
                className={clsx(
                  'flex w-full flex-col gap-6 truncate',
                  item.type === SUBMISSION_TYPE.NEW_SHOP && 'cursor-default'
                )}
              >
                <ProductImage
                  imgUrl={
                    item.type === SUBMISSION_TYPE.NEW_SHOP
                      ? '/images/confirm.png'
                      : item.image || '/images/default_item.svg'
                  }
                  size={72}
                />
                <span className="font-body_s block max-w-full truncate break-all px-4 text-gray-500">{item.name}</span>
              </Link>
            </SwiperSlide>
          ))}

          {showMoreButton && (
            <SwiperSlide style={{ width: '72px' }} key="more">
              <div className="ml-10 mt-20">
                <Link href={productLink} className="flex w-full flex-col gap-6">
                  <div className="border-width-1 flex h-[40px] w-[40px] items-center justify-center rounded-full border border-gray-100 bg-white">
                    <ArrowRightAltIcon fill="#9E9E9E" />
                  </div>
                  <span className="block max-w-full truncate break-all px-4 text-gray-500 font-caption">더보기</span>
                </Link>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      ) : (
        <EmptyData text={placeholder} />
      )}
    </Flex>
  )
}
