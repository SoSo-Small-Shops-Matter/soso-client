import { DEFAULT_LOCATION } from '@/shared/constant/location'
import { ShopType } from '@/shared/types/shopType'
import { customFetch } from '@/shared/utils/customFetch'

export const getShop = async (
  lat: number | null = DEFAULT_LOCATION.lat,
  lng: number | null = DEFAULT_LOCATION.lng,
  sorting: boolean = false,
  isWishlist: boolean = true,
  productIds: number[] = []
): Promise<ShopType[]> => {
  const queryParams = { lat, lng, sorting, isWishlist, productIds }
  const result = await customFetch('/shops', { queryParams })

  return result.result
}
