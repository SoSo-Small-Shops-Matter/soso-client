import { ReviewRequestType } from '@/shared/components/layout/Review/components/ReviewWrite/types'
import { convertToFormData } from '@/shared/utils/convertToFormData'
import { customFetch } from '@/shared/utils/customFetch'

export const postReview = async (data: ReviewRequestType) => {
  console.log(data)
  const body = convertToFormData(data)
  console.log(body)

  const result = await customFetch(`/shops/${data.shopId}/reviews`, {
    method: 'POST',
    body,
  })

  return result
}
