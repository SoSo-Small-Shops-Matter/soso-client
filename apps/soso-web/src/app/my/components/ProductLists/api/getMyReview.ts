import { GetMyReviewResponse } from '@/app/my/components/ProductLists/types';
import { customFetch } from '@/shared/utils/customFetch';

export const getMyReview = async (page: number, limit: number): Promise<GetMyReviewResponse> => {
  const result = await customFetch(`/user/review?page=${page}&limit=${limit}&sort=DESC`);

  return result.result;
};
