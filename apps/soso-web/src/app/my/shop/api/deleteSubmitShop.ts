import { customFetch } from '@/shared/utils/customFetch'

export const deleteSubmitShop = async (id: string) => {
  const result = await customFetch(`/users/me/shop-submissions/${id}`, {
    method: 'DELETE',
  })

  return result
}
