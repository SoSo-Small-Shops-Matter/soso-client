import { GetMyWishResponse } from '@/app/my/components/ProductLists/types'
import { customFetch } from '@/shared/utils/customFetch'

export const getMyWish = async (page: number, limit: number, area: string = ''): Promise<GetMyWishResponse> => {
  const queryParams = { page, limit, area }
  const result = await customFetch('/user/wishlist', {
    queryParams,
  })

  return result.result
}
