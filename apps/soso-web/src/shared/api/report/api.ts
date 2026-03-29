import { customFetch } from '@/shared/utils/customFetch';
import type { PatchReportRequestType, ReportRequestType } from './types';

export const reportApi = {
  patchReport: async (data: PatchReportRequestType) => {
    return customFetch(`/shops/${data.shopId}/shop/report`, {
      method: 'POST',
      body: { reportType: data.reportType },
    });
  },

  postReport: async (data: ReportRequestType) => {
    return customFetch('/shops', { method: 'POST', body: data });
  },
};
