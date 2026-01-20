/// <reference types="vite/client" />

import qs from "qs";
import { useAuthStore } from "../store/useAuthStore";
import { GenericResponse } from "../api";

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

// T indicates the type of the 'result' field in GenericResponse
export const customFetch = async <T = any>(
  endPoint: string,
  options: CustomFetchOptions = {}
): Promise<GenericResponse<T>> => {
  const { token, clearAuth } = useAuthStore.getState();

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
    if (response.status === 401) {
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
