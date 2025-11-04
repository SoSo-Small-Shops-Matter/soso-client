import { SearchListType } from '@/app/search/components/SearchList/types'
import { customFetch } from '@/shared/utils/customFetch'

export const getShopSearchList = async (
  shopName: string,
  page: number,
  limit: number,
  lat: number,
  lng: number
): Promise<SearchListType> => {
  const queryParams = {
    keyword: shopName,
    page,
    limit,
    lat,
    lng,
  }
  const result = await customFetch(`/shop/search`, {
    queryParams,
  })
  return result.result
}
