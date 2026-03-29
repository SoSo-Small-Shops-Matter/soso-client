import { convertToFormData } from '@/shared/utils/convertToFormData';
import { customFetch } from '@/shared/utils/customFetch';
import type { PatchReviewRequestType, PostReviewReportRequest, ReviewRequestType } from './types';

export const reviewApi = {
  postReview: async (data: ReviewRequestType) => {
    const body = convertToFormData(data);
    return customFetch(`/shops/${data.shopId}/reviews`, { method: 'POST', body });
  },

  patchReview: async (data: PatchReviewRequestType) => {
    const body = convertToFormData(data);
    return customFetch(`/shops/${data.shopId}/reviews/${data.reviewId}`, { method: 'PATCH', body });
  },

  deleteReview: async (data: { shopId: number; reviewId: number }) => {
    return customFetch(`/shops/${data.shopId}/reviews/${data.reviewId}`, { method: 'DELETE' });
  },

  postReviewReport: async (data: PostReviewReportRequest) => {
    return customFetch(`/shops/${data.shopId}/reviews/${data.reviewId}/report`, {
      method: 'POST',
      body: data,
    });
  },
};
