import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useLocationStore } from '@/shared/store/useLocationStore';
import { MINUTE } from '@repo/utils/formatDateString';
import { searchApi } from './api';
import type { DeleteUserFindShopRequest } from './types';

export const searchKeys = {
  all: ['search'] as const,
  shopList: (shopName: string, limit: number, lat: number, lng: number) =>
    [...searchKeys.all, 'shopList', shopName, limit, lat, lng] as const,
  userFindShop: () => [...searchKeys.all, 'userFindShop'] as const,
};

export const useGetShopSearchListQuery = (shopName: string, limit: number = 10) => {
  const { lat, lng } = useLocationStore();
  return useInfiniteQuery({
    queryKey: searchKeys.shopList(shopName, limit, lat, lng),
    queryFn: ({ pageParam }) =>
      searchApi.getShopSearchList({ shopName, page: pageParam, limit, lat, lng }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.pageInfo.nextPage ? lastPageParam + 1 : undefined,
    enabled: !!shopName,
    staleTime: 5 * MINUTE,
    gcTime: 10 * MINUTE,
  });
};

export const useGetUserFindShopQuery = () =>
  useQuery({
    queryKey: searchKeys.userFindShop(),
    queryFn: searchApi.getUserFindShop,
  });

export const useDeleteUserFindShopMutation = () => {
  const { refetch } = useGetUserFindShopQuery();
  return useMutation({
    mutationKey: ['deleteUserFindShop'],
    mutationFn: (data: DeleteUserFindShopRequest) => searchApi.deleteUserFindShop(data),
    onSuccess: () => { refetch(); },
  });
};

export const useAllDeleteUserFindShopMutation = () => {
  const { refetch } = useGetUserFindShopQuery();
  return useMutation({
    mutationKey: ['allDeleteUserFindShop'],
    mutationFn: () => searchApi.allDeleteUserFindShop(),
    onSuccess: () => { refetch(); },
  });
};
