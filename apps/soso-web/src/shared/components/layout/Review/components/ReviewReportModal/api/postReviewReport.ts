import { PostReviewReportRequest } from '@/shared/components/layout/Review/components/ReviewReportModal/types'
import { customFetch } from '@/shared/utils/customFetch'

export const postReviewReport = async (data: PostReviewReportRequest) => {
  const result = customFetch(`/shops/${data.shopId}/reviews/${data.reviewId}/report`, {
    method: 'POST',
    body: data,
  })

  return result
}
