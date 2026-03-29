import { DEFAULT_LOCATION } from '@/shared/constant/location';
import { customFetch } from '@/shared/utils/customFetch';
import type {
  AddProductRequest,
  GetShopsParams,
  ShopDetailType,
  ShopOperatingRequestType,
  ShopType,
} from './types';

export const shopsApi = {
  getShops: async ({
    lat = DEFAULT_LOCATION.lat,
    lng = DEFAULT_LOCATION.lng,
    sorting = false,
    isWishlist = true,
    productIds = [],
  }: GetShopsParams = {}): Promise<ShopType[]> => {
    const queryParams = { lat, lng, sorting, isWishlist, productIds };
    const result = await customFetch('/shops', { queryParams });
    return result.result;
  },

  getShopDetail: async (id: string | string[] | undefined): Promise<ShopDetailType> => {
    const result = await customFetch(`/shops/${id}`);
    return result.result;
  },

  toggleWish: async (id: number) => {
    return customFetch('/users/me/favorite', {
      method: 'POST',
      body: { shopId: id },
    });
  },

  postShopOperating: async (data: ShopOperatingRequestType) => {
    return customFetch(`/shops/${data.shopId}/operating`, {
      method: 'POST',
      body: { operatingHours: data.operatingHours },
    });
  },

  addShopProduct: async (data: AddProductRequest) => {
    return customFetch(`/shops/${data.shopId}/products`, {
      method: 'POST',
      body: { products: data.products },
    });
  },
};
