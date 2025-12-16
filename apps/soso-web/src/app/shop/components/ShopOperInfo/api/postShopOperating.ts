import { ShopOperatingRequestType } from '@/app/shop/components/ShopOperInfo/types'
import { customFetch } from '@/shared/utils/customFetch'

export const postShopOperating = async (data: ShopOperatingRequestType) => {
  const body = {
    operatingHours: data.operatingHours,
  }
  const result = customFetch(`/shops/${data.shopId}/operating`, {
    method: 'POST',
    body,
  })

  return result
}
