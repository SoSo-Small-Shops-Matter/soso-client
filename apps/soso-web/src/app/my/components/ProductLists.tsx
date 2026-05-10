'use client'

import ProductLayout from '@/app/my/components/ProductLayout'
import { useGetMyWishQuery } from '@/shared/api/my/queries'

export const WISH_LIST_LIMIT = 10
const WISH_TITLE = '찜'
const WISH_PLACEHOLDER = '아직 찜한 소품샵이 없습니다.'
const WISH_LINK = '/my/wish'

export default function ProductLists() {
  const { data: myWishData } = useGetMyWishQuery(WISH_LIST_LIMIT)

  const myWishList =
    myWishData?.pages[0].data.map((wish) => ({
      id: wish.shop.id || null,
      image: wish.shop?.mainImage || null,
      name: wish.shop?.name || null,
      link: `/shop/${wish.shop?.id}` || null,
    })) || []

  return (
    <ProductLayout
      data={myWishList}
      totalData={myWishData?.pages[0].pageInfo.totalElements}
      title={WISH_TITLE}
      placeholder={WISH_PLACEHOLDER}
      productLink={WISH_LINK}
    />
  )
}
