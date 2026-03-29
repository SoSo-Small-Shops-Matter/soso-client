import { customFetch } from '@/shared/utils/customFetch';
import type { GetTokenRequestType, GetTokenResponseType } from './types';

export const authApi = {
  getGoogleToken: async (data: GetTokenRequestType): Promise<GetTokenResponseType> => {
    const result = await customFetch('/auth/google', { method: 'POST', body: data });
    return result.result;
  },

  appleLogin: async (idToken: string) => {
    return customFetch('/auth/apple', { method: 'POST', body: { idToken } });
  },

  refreshToken: async (
    refreshToken: string | null,
    setToken: (token: string | null) => void,
    setRefreshToken: (token: string | null) => void,
    clearToken: () => void
  ): Promise<string | null> => {
    if (!refreshToken) return null;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const { result } = await response.json();

      if (response.ok && result?.accessToken && result?.refreshToken) {
        setToken(result.accessToken);
        setRefreshToken(result.refreshToken);
        return result.accessToken;
      }

      console.log('🚨 리프레시 토큰 갱신 실패');
      clearToken();
    } catch (error) {
      console.error('🚨 토큰 갱신 중 오류 발생:', error);
      clearToken();
    }

    return null;
  },
};
