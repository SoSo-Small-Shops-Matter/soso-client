'use client'

import { useGetMyWishQuery } from '@/shared/api/my/queries'
import { SUBMISSION_TYPE, SubmissionType } from '@/shared/api/my/types'
import ArrowRightAltIcon from '@/shared/components/icons/ArrowRightAltIcon'
import LinkIcon from '@/shared/components/icons/LinkIcon'
import Flex from '@/shared/components/layout/Flex'
import EmptyData from '@/shared/components/ui/EmptyData'
import ProductImage from '@/shared/components/ui/ProductImage'
import clsx from 'clsx'
import Link from 'next/link'
import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import MyWishShopListSkeleton from './MyWishShopListSkeleton'

interface MyWishShopItem {
  id: number | null
  image: string | null
  name: string | null
  link: string | null
  type?: SubmissionType | null
}

export const WISH_LIST_LIMIT = 10
const WISH_TITLE = '찜'
const WISH_PLACEHOLDER = '아직 찜한 소품샵이 없습니다.'
const WISH_LINK = '/my/wish'

export default function MyWishShopList() {
  const { data: myWishData, isPending, isSuccess } = useGetMyWishQuery(WISH_LIST_LIMIT)
  const totalData = myWishData?.pages[0].pageInfo.totalElements

  const myWishList: MyWishShopItem[] =
    myWishData?.pages[0].data.map((wish) => ({
      id: wish.shop.id || null,
      image: wish.shop?.mainImage || null,
      name: wish.shop?.name || null,
      link: `/shop/${wish.shop?.id}` || null,
    })) || []

  const showMoreButton = totalData && totalData > WISH_LIST_LIMIT

  return (
    <Flex direction="col" gap={12} className="w-full">
      <Flex justify="between" align="center" className="w-full">
        <h3 className="text-black font-subtitle_l">{WISH_TITLE}</h3>
        <Link href={WISH_LINK} className="flex items-center">
          <LinkIcon />
        </Link>
      </Flex>
      {isPending && <MyWishShopListSkeleton />}
      {isSuccess && myWishList?.length > 0 && (
        <Swiper
          modules={[Navigation, FreeMode]}
          slidesPerView="auto"
          spaceBetween={8}
          freeMode={true}
          grabCursor={true}
          className="w-full"
        >
          {myWishList.map(({ id, type, link, image, name }) => (
            <SwiperSlide style={{ width: '72px' }} key={id}>
              <Link
                href={type === SUBMISSION_TYPE.NEW_SHOP ? '#' : link || ''}
                className={clsx(
                  'flex w-full flex-col gap-6 truncate',
                  type === SUBMISSION_TYPE.NEW_SHOP && 'cursor-default'
                )}
              >
                <ProductImage
                  imgUrl={
                    type === SUBMISSION_TYPE.NEW_SHOP ? '/images/confirm.png' : image || '/images/default_item.svg'
                  }
                  size={72}
                />
                <span className="block max-w-full truncate break-all px-4 text-gray-500 font-body_s">{name}</span>
              </Link>
            </SwiperSlide>
          ))}

          {showMoreButton && (
            <SwiperSlide style={{ width: '72px' }} key="more">
              <div className="ml-10 mt-20">
                <Link href={WISH_LINK} className="flex w-full flex-col gap-6">
                  <div className="border-width-1 flex h-[40px] w-[40px] items-center justify-center rounded-full border border-gray-100 bg-white">
                    <ArrowRightAltIcon fill="#9E9E9E" />
                  </div>
                  <span className="block max-w-full truncate break-all px-4 text-gray-500 font-caption">더보기</span>
                </Link>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      )}
      {isSuccess && myWishList?.length === 0 && <EmptyData text={WISH_PLACEHOLDER} />}
    </Flex>
  )
}
