import { authApi } from '@/shared/api/auth/api'
import { useAuthStore } from '@/shared/store/useAuthStore'
import qs from 'qs'

interface CustomFetchOptions extends RequestInit {
  body?: any
  queryParams?: { [key: string]: any }
}

export class CustomError extends Error {
  status: number
  data: any

  constructor(message: string, status: number, data?: any) {
    super(message)
    this.status = status
    this.data = data
  }
}

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const

export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS]

const HTTP_STATUS_MESSAGE: Partial<Record<HttpStatusCode, string>> = {
  [HTTP_STATUS.BAD_REQUEST]: '잘못된 요청입니다.',
  [HTTP_STATUS.UNAUTHORIZED]: '인증이 필요합니다. 다시 로그인해주세요.',
  [HTTP_STATUS.FORBIDDEN]: '접근 권한이 없습니다. 다시 로그인해주세요.',
  [HTTP_STATUS.NOT_FOUND]: '요청한 정보를 찾을 수 없습니다.',
  [HTTP_STATUS.CONFLICT]: '이미 처리된 요청입니다.',
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: '서버 오류가 발생했습니다.',
}


export const customFetch = async (endPoint: string, options: CustomFetchOptions = {}): Promise<any> => {
  const { token, setToken, refreshToken, setRefreshToken, clearToken } = useAuthStore.getState()

  const isFormData = options.body instanceof FormData

  const defaultHeaders: HeadersInit = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  const finalOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    body: isFormData ? options.body : JSON.stringify(options.body),
  }

  let params: string = qs.stringify(options.queryParams)
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${endPoint}${params ? '?' + params : ''}`,
      finalOptions
    )

    if (response.status === HTTP_STATUS.UNAUTHORIZED && refreshToken) {
      const newToken = await authApi.refreshToken(refreshToken, setToken, setRefreshToken, clearToken)

      if (newToken) {
        return customFetch(endPoint, { ...options })
      }

      throw new CustomError(HTTP_STATUS_MESSAGE[HTTP_STATUS.UNAUTHORIZED] as string, HTTP_STATUS.UNAUTHORIZED)
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const fallbackMessage = HTTP_STATUS_MESSAGE[response.status as HttpStatusCode]
      const message = fallbackMessage ?? errorData?.message ?? '서버 오류가 발생했습니다.'
      throw new CustomError(Array.isArray(message) ? message[0] : message, response.status, errorData)
    }

    return response.json()
  } catch (error) {
    throw error
  }
}
