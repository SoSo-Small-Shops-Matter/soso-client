import { ShopDetailType } from '@/shared/types/shopType'
import { customFetch } from '@/shared/utils/customFetch'

export const getShopDetail = async (id: string | string[] | undefined): Promise<ShopDetailType> => {
  const result = await customFetch(`/shops/${id}`)

  return result.result
}
