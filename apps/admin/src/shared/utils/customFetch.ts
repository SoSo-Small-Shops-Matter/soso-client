/// <reference types="vite/client" />

import qs from "qs";
import { useAuthStore } from "../store/useAuthStore";

interface CustomFetchOptions extends RequestInit {
  body?: any;
  queryParams?: { [key: string]: any };
}

export class CustomError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const customFetch = async (
  endPoint: string,
  options: CustomFetchOptions = {}
): Promise<any> => {
  const { token, refreshToken, setToken, setRefreshToken, clearAuth } = useAuthStore.getState();

  const isFormData = options.body instanceof FormData;

  const defaultHeaders: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const finalOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    body: isFormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
  };

  const params: string = qs.stringify(options.queryParams);

  try {
    const response = await fetch(
      `${API_BASE_URL}${endPoint}${params ? "?" + params : ""}`,
      finalOptions
    );

    // Handle 401 Unauthorized - attempt token refresh
    if (response.status === 401 && refreshToken) {
      try {
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          const newToken = data.result?.accessToken;
          const newRefreshToken = data.result?.refreshToken;

          if (newToken) {
            setToken(newToken);
            if (newRefreshToken) {
              setRefreshToken(newRefreshToken);
            }

            // Retry original request with new token
            return customFetch(endPoint, options);
          }
        }
      } catch (refreshError) {
        clearAuth();
        throw new CustomError("토큰 갱신 실패: 다시 로그인해주세요.", 401);
      }

      clearAuth();
      throw new CustomError("인증이 만료되었습니다. 다시 로그인해주세요.", 401);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new CustomError(
        errorData?.message || "서버 오류 발생",
        response.status,
        errorData
      );
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
