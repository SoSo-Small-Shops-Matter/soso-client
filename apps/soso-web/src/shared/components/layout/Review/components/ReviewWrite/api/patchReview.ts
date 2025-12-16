import { PatchReviewRequestType } from '@/shared/components/layout/Review/components/ReviewWrite/types'
import { convertToFormData } from '@/shared/utils/convertToFormData'
import { customFetch } from '@/shared/utils/customFetch'

export const patchReview = async (data: PatchReviewRequestType) => {
  console.log(data)
  const body = convertToFormData(data)
  console.log(body)

  const result = await customFetch(`/shops/${data.shopId}/reviews/${data.reviewId}`, {
    method: 'PATCH',
    body,
  })

  return result
}
