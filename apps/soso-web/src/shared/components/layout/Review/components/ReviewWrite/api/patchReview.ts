import { PatchReviewRequestType } from '@/shared/components/layout/Review/components/ReviewWrite/types'
import { customFetch } from '@/shared/utils/customFetch'

export const patchReview = async (data: PatchReviewRequestType) => {
  const body = {
    content: data.content,
    deleteImages: data.deleteImages,
    newImageKeys: data.newImageKeys,
  }

  const result = await customFetch(`/shops/${data.shopId}/reviews/${data.reviewId}`, {
    method: 'PATCH',
    body,
  })

  return result
}
