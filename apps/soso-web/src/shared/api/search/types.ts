import type { PaginationType } from '@/shared/types/paginationType';
import type { ShopType } from '@/shared/api/shops/types';

export interface SearchListType {
  data: SearchedShopType[];
  pageInfo: PaginationType;
}

export interface SearchedShopType
  extends Pick<ShopType, 'id' | 'name' | 'lng' | 'lat' | 'mainImage' | 'location' | 'distance'> {}

export interface GetSearchListResponse {
  pageParams: number[];
  pages: SearchListType[];
}

export interface UserFindShopType {
  id: number;
  shopId: number;
  uuid: string;
  shopName: string;
  createdAt: string;
}

export type GetUserFindShopResponse = UserFindShopType[];

export interface DeleteUserFindShopRequest {
  shopId: number;
}

export interface GetShopSearchListParams {
  shopName: string;
  page: number;
  limit: number;
  lat: number;
  lng: number;
}
