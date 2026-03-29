import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/shared/context/ToastContext';
import { useRouter } from 'next/navigation';
import { feedbackApi } from './api';
import type { PostFeedbackRequest } from './types';

export const usePostFeedbackMutation = () => {
  const router = useRouter();
  const { openToast } = useToast();

  return useMutation({
    mutationKey: ['postFeedback'],
    mutationFn: (data: PostFeedbackRequest) => feedbackApi.postFeedback(data),
    onSuccess: () => {
      router.push('/my/setting');
      openToast({ message: '소중한 의견 남겨주셔서 감사해요! ❤' });
    },
  });
};
