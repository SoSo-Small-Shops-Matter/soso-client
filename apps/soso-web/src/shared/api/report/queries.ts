import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/shared/context/ToastContext';
import { useReportStore } from '@/app/report/store/useReportStore';
import { useRouter } from 'next/navigation';
import { reportApi } from './api';
import type { PatchReportRequestType, ReportRequestType } from './types';

export const usePatchReportMutation = () =>
  useMutation({
    mutationKey: ['patchReport'],
    mutationFn: (data: PatchReportRequestType) => reportApi.patchReport(data),
  });

export const usePostReportMutation = () => {
  const { openToast } = useToast();
  const { resetReport } = useReportStore();
  const router = useRouter();

  return useMutation({
    mutationKey: ['postReport'],
    mutationFn: (data: ReportRequestType) => reportApi.postReport(data),
    onSuccess: () => {
      openToast({ message: '해당 소품샵은 확인 후 업데이트 될 예정입니다.' });
      resetReport();
      setTimeout(() => { router.push('/my/shop'); }, 10);
    },
  });
};
