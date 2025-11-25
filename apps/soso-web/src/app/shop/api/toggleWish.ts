import { customFetch } from '@/shared/utils/customFetch'

export const ToggleWish = async (id: number) => {
  const result = await customFetch('/users/me/favorite', {
    method: 'POST',
    body: {
      shopId: id,
    },
  })

  return result
}
