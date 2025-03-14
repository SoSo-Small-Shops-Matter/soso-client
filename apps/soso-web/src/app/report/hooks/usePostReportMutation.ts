import { postReport } from '@/app/report/api/postReport';
import { ReportRequestType, useReportStore } from '@/app/report/store/useReportStore';
import { useToast } from '@/shared/context/ToastContext';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const usePostReportMutation = () => {
  const { openToast } = useToast();
  const { resetReport } = useReportStore();
  const router = useRouter();

  return useMutation({
    mutationKey: ['postReport'],
    mutationFn: (data: ReportRequestType) => postReport(data),
    onSuccess: () => {
      openToast({
        message: '소중한 소품샵을 등록해 주셔서 감사합니다.',
      });
      resetReport();
      setTimeout(() => {
        router.push('/');
      }, 10);
    },
  });
};
