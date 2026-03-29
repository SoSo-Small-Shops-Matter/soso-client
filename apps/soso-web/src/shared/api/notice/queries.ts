import { useQuery } from '@tanstack/react-query';
import { noticeApi } from './api';

export const noticeKeys = {
  all: ['notice'] as const,
  list: () => [...noticeKeys.all, 'list'] as const,
};

export const useGetNoticeQuery = () =>
  useQuery({
    queryKey: noticeKeys.list(),
    queryFn: noticeApi.getNotice,
  });
