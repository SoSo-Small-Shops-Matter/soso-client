import { PaginationType } from '@/shared/types/paginationType'
import { ShopType } from '@/shared/types/shopType'

export interface SearchListType {
  data: SearchedShopType[]
  pageInfo: PaginationType
}

export interface SearchedShopType
  extends Pick<ShopType, 'id' | 'name' | 'lng' | 'lat' | 'mainImage' | 'location' | 'distance'> {}

export interface GetSearchListResponse {
  pageParams: number[]
  pages: SearchListType[]
}

export interface UserFindShopType {
  id: number
  shopId: number
  uuid: string
  shopName: string
  createdAt: string
}

export type GetUserFindShopResponse = UserFindShopType[]

export interface DeleteUserFindShopRequest {
  shopId: number
}
