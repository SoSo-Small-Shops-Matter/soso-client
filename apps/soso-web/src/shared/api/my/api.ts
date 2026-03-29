import { customFetch } from '@/shared/utils/customFetch';
import type { GetMyReviewResponse, GetMyShopResponse, GetMyWishResponse, RegionType } from './types';

export const myApi = {
  getMyShop: async (page: number, limit: number): Promise<GetMyShopResponse> => {
    const result = await customFetch('/users/me/shop-submissions', { queryParams: { page, limit } });
    return result.result;
  },

  getMyWish: async (page: number, limit: number, areaId: number | null = null): Promise<GetMyWishResponse> => {
    const result = await customFetch('/users/me/favorite', { queryParams: { page, limit, areaId } });
    return result.result;
  },

  getMyReview: async (page: number, limit: number, sort: 'DESC' | 'ASC' = 'DESC'): Promise<GetMyReviewResponse> => {
    const result = await customFetch('/users/me/reviews', { queryParams: { page, limit, sort } });
    return result.result;
  },

  getWishRegion: async (): Promise<RegionType[]> => {
    const result = await customFetch('/regions');
    return result.result;
  },

  deleteSubmitShop: async (id: number) => {
    return customFetch(`/users/me/shop-submissions/${id}`, { method: 'DELETE' });
  },
};
