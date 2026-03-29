import { customFetch } from '@/shared/utils/customFetch';
import type {
  DeleteUserFindShopRequest,
  GetShopSearchListParams,
  GetUserFindShopResponse,
  SearchListType,
} from './types';

export const searchApi = {
  getShopSearchList: async ({
    shopName,
    page,
    limit,
    lat,
    lng,
  }: GetShopSearchListParams): Promise<SearchListType> => {
    const result = await customFetch('/shops/search', {
      queryParams: { keyword: shopName, page, limit, lat, lng },
    });
    return result.result;
  },

  getUserFindShop: async (): Promise<GetUserFindShopResponse> => {
    const result = await customFetch('/users/me/recent-searches');
    return result.result;
  },

  deleteUserFindShop: async (data: DeleteUserFindShopRequest) => {
    return customFetch(`/users/me/recent-searches/${data.shopId}`, {
      method: 'DELETE',
      body: data,
    });
  },

  allDeleteUserFindShop: async () => {
    return customFetch('/users/me/recent-searches', { method: 'DELETE' });
  },
};
