import { deleteReview } from '@/shared/components/layout/Review/api/deleteReview'
import { useMutation } from '@tanstack/react-query'

export const useDeleteReviewMutation = () => {
  return useMutation({
    mutationKey: ['deleteReview'],
    mutationFn: (data: { shopId: number; reviewId: number }) => deleteReview(data),
  })
}
