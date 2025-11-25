import { AddProductRequest } from '@/app/shop/components/ShopProducts/types'
import { customFetch } from '@/shared/utils/customFetch'

export const addShopProduct = async (data: AddProductRequest) => {
  const body = {
    products: data.products,
  }
  const result = await customFetch(`/shops/${data.shopId}/products`, {
    method: 'POST',
    body,
  })

  return result
}
