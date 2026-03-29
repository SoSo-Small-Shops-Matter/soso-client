import { customFetch } from '@/shared/utils/customFetch';
import type { PostFeedbackRequest } from './types';

export const feedbackApi = {
  postFeedback: async (data: PostFeedbackRequest) => {
    return customFetch('/feedback', { method: 'POST', body: data });
  },
};
