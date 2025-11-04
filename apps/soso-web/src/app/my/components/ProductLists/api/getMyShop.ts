import { GetMyShopResponse } from '@/app/my/components/ProductLists/types'
import { customFetch } from '@/shared/utils/customFetch'

export const getMyShop = async (page: number, limit: number): Promise<GetMyShopResponse> => {
  const queryParams = {
    page,
    limit,
  }

  const result = await customFetch('/users/me/shop-submissions', {
    queryParams,
  })

  return result.result
}
