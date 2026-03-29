import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { shopsApi } from './api';
import type { AddProductRequest, GetShopsParams, ShopOperatingRequestType } from './types';
import { useDialog } from '@/shared/context/DialogContext';
import { CustomError } from '@/shared/utils/customFetch';

export const shopsKeys = {
  all: ['shops'] as const,
  list: (params: GetShopsParams) => [...shopsKeys.all, 'list', params] as const,
  detail: (id: string | string[] | undefined) => [...shopsKeys.all, 'detail', String(id)] as const,
};

export const useGetShopsQuery = (params: GetShopsParams = {}) =>
  useQuery({
    queryKey: shopsKeys.list(params),
    queryFn: () => shopsApi.getShops(params),
    enabled: !!params.lat && !!params.lng,
  });

export const useGetShopDetailQuery = (id: string | string[] | undefined) =>
  useQuery({
    queryKey: shopsKeys.detail(id),
    queryFn: () => shopsApi.getShopDetail(id),
    enabled: !!id,
  });

export const useToggleWishMutation = (shopId: number) => {
  const queryClient = useQueryClient();
  const { openDialog } = useDialog();

  return useMutation({
    mutationKey: ['toggleWishlist', shopId],
    mutationFn: (id: number) => shopsApi.toggleWish(id),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: shopsKeys.detail(String(shopId)) });
      const previousData = queryClient.getQueryData(shopsKeys.detail(String(shopId)));
      queryClient.setQueryData(shopsKeys.detail(String(shopId)), (oldData: any) => {
        if (!oldData) return oldData;
        return { ...oldData, wishlist: !oldData.wishlist };
      });
      return { previousData };
    },

    onError: (err: any, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(shopsKeys.detail(String(shopId)), context.previousData);
      }
      if (err instanceof CustomError && err.status === 401) {
        openDialog({ title: '로그인 후 이용해주세요', type: 'alert' });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: shopsKeys.detail(String(shopId)) });
    },
  });
};

export const usePostShopOperatingMutation = () =>
  useMutation({
    mutationKey: ['postShopOperating'],
    mutationFn: (data: ShopOperatingRequestType) => shopsApi.postShopOperating(data),
  });

export const useAddShopProductMutation = () => {
  const { openDialog } = useDialog();

  return useMutation({
    mutationKey: ['addShopProduct'],
    mutationFn: (data: AddProductRequest) => shopsApi.addShopProduct(data),
    onError: (error: CustomError) => {
      if (error.status === 409) {
        openDialog({
          type: 'alert',
          title: '이미 추가 요청된 소품샵입니다.',
          message: (
            <>
              관리자 승인 이후
              <br />
              판매상품 추가 등록이 가능합니다.
            </>
          ),
        });
      }
    },
  });
};
