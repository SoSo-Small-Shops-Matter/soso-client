import { PaginationType } from '@/shared/types/paginationType'
import { ShopType } from '@/shared/types/shopType'

export interface MyWishType {
  id: number
  createdAt: string
  shop: {
    id: number
    name: string
    mainImage: null | string
  }
}

export interface GetMyWishResponse {
  data: MyWishType[]
  pageInfo: PaginationType
}

export interface MyReviewType {
  id: number
  content: string
  createdAt: string
  shop: ShopType
  images: {
    id: number
    url: string
  }[]
}

export interface GetMyReviewResponse {
  data: MyReviewType[]
  pageInfo: PaginationType
}

export type GetMyReviewResponseType = {
  pageParams: number[]
  pages: GetMyReviewResponse
}

export interface MyShopType {
  id: number
  type: number
  status: number
  rejectMessage: string | null
  submitStatus: MyShopSubmitStatus
  createdAt: string
  shop: {
    id: number
    name: string
    mainImage: string | null
    instagram: string | null
    isVerified: boolean
    location: string
  }
}

export const MY_SHOP_SUBMIT_STATUS = {
  // 최초 제보
  NEW_SHOP_PENDING: 'new_shop_pending',
  NEW_SHOP_APPROVED: 'new_shop_approved',
  NEW_SHOP_REJECTED: 'new_shop_rejected',

  // 운영 정보 수정
  NEW_OPERATING_PENDING: 'new_operating_pending',
  NEW_OPERATING_APPROVED: 'new_operating_approved',
  NEW_OPERATING_REJECTED: 'new_operating_rejected',

  // 판매 정보 수정
  NEW_PRODUCT_PENDING: 'new_product_pending',
  NEW_PRODUCT_APPROVED: 'new_product_approved',
  NEW_PRODUCT_REJECTED: 'new_product_rejected',
} as const

export type MyShopSubmitStatus = (typeof MY_SHOP_SUBMIT_STATUS)[keyof typeof MY_SHOP_SUBMIT_STATUS]

export interface GetMyShopResponse {
  data: MyShopType[]
  pageInfo: PaginationType
}

export type GetMyShopResponseType = {
  pageParams: number[]
  pages: GetMyShopResponse
}
