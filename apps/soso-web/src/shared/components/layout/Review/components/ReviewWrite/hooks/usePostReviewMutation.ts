import { postReview } from '@/shared/components/layout/Review/components/ReviewWrite/api/postReview'
import { ReviewRequestType } from '@/shared/components/layout/Review/components/ReviewWrite/types'
import { useMutation } from '@tanstack/react-query'

export const usePostReviewMutation = () => {
  return useMutation({
    mutationKey: ['postReview'],
    mutationFn: (data: ReviewRequestType) => postReview(data),
  })
}
