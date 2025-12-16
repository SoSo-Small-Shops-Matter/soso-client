import { customFetch } from '@/shared/utils/customFetch'

export const deleteReview = async (data: { shopId: number; reviewId: number }) => {
  const result = await customFetch(`/shops/${data.shopId}/reviews/${data.reviewId}`, {
    method: 'DELETE',
  })

  return result
}
