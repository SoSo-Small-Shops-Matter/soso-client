import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { authApi } from './api';
import type { GetTokenRequestType } from './types';

export const useGetTokenMutation = () => {
  const router = useRouter();
  const { setToken, setRefreshToken } = useAuthStore();

  return useMutation({
    mutationKey: ['getToken'],
    mutationFn: (data: GetTokenRequestType) => authApi.getGoogleToken(data),
    onSuccess: (data) => {
      setToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      router.push('/');
    },
  });
};

export const useAppleLoginMutation = () => {
  const router = useRouter();
  const { setToken, setRefreshToken } = useAuthStore();

  return useMutation({
    mutationKey: ['appleLogin'],
    mutationFn: (idToken: string) => authApi.appleLogin(idToken),
    onSuccess: (data) => {
      setToken(data.result.accessToken);
      setRefreshToken(data.result.refreshToken);
      router.push('/');
    },
  });
};
