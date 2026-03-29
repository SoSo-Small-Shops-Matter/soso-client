import { customFetch } from '@/shared/utils/customFetch';
import type { GetNoticeResponse } from './types';

export const noticeApi = {
  getNotice: async (): Promise<GetNoticeResponse> => {
    const result = await customFetch('/notices');
    return result.result;
  },
};
