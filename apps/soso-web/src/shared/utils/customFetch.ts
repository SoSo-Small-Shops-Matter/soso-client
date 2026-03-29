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

    if (response.status === 401 && refreshToken) {
      const newToken = await authApi.refreshToken(refreshToken, setToken, setRefreshToken, clearToken)

      if (newToken) {
        return customFetch(endPoint, { ...options })
      }

      throw new CustomError('토큰 갱신 실패: 다시 로그인해주세요.', 401)
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new CustomError(errorData?.message || '서버 오류 발생', response.status, errorData)
    }

    return response.json()
  } catch (error) {
    throw error
  }
}
