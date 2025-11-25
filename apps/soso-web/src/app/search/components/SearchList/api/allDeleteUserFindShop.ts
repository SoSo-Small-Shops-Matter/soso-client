import { customFetch } from '@/shared/utils/customFetch'

export const allDeleteUserFindShop = async () => {
  const result = await customFetch('/users/me/recent-searches', {
    method: 'DELETE',
  })

  return result
}
