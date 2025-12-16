import { DeleteUserFindShopRequest } from '@/app/search/components/SearchList/types'
import { customFetch } from '@/shared/utils/customFetch'

export const deleteUserFindShop = async (data: DeleteUserFindShopRequest) => {
  const result = await customFetch(`/users/me/recent-searches/${data.shopId}`, {
    method: 'DELETE',
    body: data,
  })

  return result
}
