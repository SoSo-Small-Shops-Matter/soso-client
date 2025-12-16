import { GetMyWishResponse } from '@/app/my/components/ProductLists/types'
import { customFetch } from '@/shared/utils/customFetch'

export const getMyWish = async (
  page: number,
  limit: number,
  areaId: number | null = null
): Promise<GetMyWishResponse> => {
  const queryParams = { page, limit, areaId }
  const result = await customFetch('/users/me/favorite', {
    queryParams,
  })

  return result.result
}
