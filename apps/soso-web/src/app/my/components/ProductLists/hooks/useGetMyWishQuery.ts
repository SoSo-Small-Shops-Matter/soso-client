import { getMyWish } from '@/app/my/components/ProductLists/api/getMyWish'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetMyWishQuery = (limit: number, areaId?: number) => {
  const { token } = useAuthStore()

  return useInfiniteQuery({
    queryKey: ['myWish', limit],

    queryFn: async ({ pageParam }) => {
      const result = await getMyWish(pageParam, limit, areaId)
      return result
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage.pageInfo.nextPage) {
        return undefined
      }

      return lastPageParam + 1
    },

    enabled: !!token,

    staleTime: 0,
    gcTime: 0,
  })
}
