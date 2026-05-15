import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { myApi } from './api'
import { MINUTE } from '@repo/utils'

export const myKeys = {
  all: ['my'] as const,
  shop: (limit: number) => [...myKeys.all, 'shop', limit] as const,
  wishes: () => [...myKeys.all, 'wish'] as const,
  wish: (limit: number) => [...myKeys.all, 'wish', limit] as const,
  review: (limit: number, sort?: 'DESC' | 'ASC') => [...myKeys.all, 'review', limit, sort] as const,
  wishRegion: () => [...myKeys.all, 'wishRegion'] as const,
}

export const useGetMyShopQuery = (limit: number) => {
  const { token } = useAuthStore()
  return useInfiniteQuery({
    queryKey: myKeys.shop(limit),
    queryFn: ({ pageParam }) => myApi.getMyShop(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.pageInfo.nextPage ? lastPageParam + 1 : undefined),
    enabled: !!token,
    staleTime: 0,
    gcTime: 0,
  })
}

export const useGetMyWishQuery = (limit: number, areaId?: number) => {
  const { token } = useAuthStore()
  return useInfiniteQuery({
    queryKey: myKeys.wish(limit),
    queryFn: ({ pageParam }) => myApi.getMyWish(pageParam, limit, areaId),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.pageInfo.nextPage ? lastPageParam + 1 : undefined),
    enabled: !!token,
    staleTime: 5 * MINUTE,
    gcTime: 5 * MINUTE,
  })
}

export const useGetMyReviewQuery = (limit: number, sort?: 'DESC' | 'ASC') => {
  const { token } = useAuthStore()
  return useInfiniteQuery({
    queryKey: myKeys.review(limit, sort),
    queryFn: ({ pageParam }) => myApi.getMyReview(pageParam, limit, sort),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.pageInfo.nextPage ? lastPageParam + 1 : undefined),
    enabled: !!token,
    staleTime: 0,
    gcTime: 0,
  })
}

export const useGetWishRegionQuery = () =>
  useQuery({
    queryKey: myKeys.wishRegion(),
    queryFn: myApi.getWishRegion,
  })

export const useDeleteSubmitShopMutation = () => {
  const { refetch } = useGetMyShopQuery(10)
  return useMutation({
    mutationKey: ['deleteSubmitShop'],
    mutationFn: (id: number) => myApi.deleteSubmitShop(id),
    onSuccess: () => {
      refetch()
    },
  })
}
