import { GetMyReviewResponse } from '@/app/my/components/ProductLists/types'
import { customFetch } from '@/shared/utils/customFetch'

export const getMyReview = async (
  page: number,
  limit: number,
  sort: 'DESC' | 'ASC' = 'DESC'
): Promise<GetMyReviewResponse> => {
  const queryParams = {
    page,
    limit,
    sort,
  }
  const result = await customFetch(`/user/review`, {
    queryParams,
  })

  return result.result
}
