import { ReviewRequestType } from '@/shared/components/layout/Review/components/ReviewWrite/types'
import { customFetch } from '@/shared/utils/customFetch'

export const postReview = async (data: ReviewRequestType) => {
  const body = { content: data.content, reviewImgKeys: data.reviewImgKeys }

  const result = await customFetch(`/shops/${data.shopId}/reviews`, {
    method: 'POST',
    body,
  })

  return result
}
