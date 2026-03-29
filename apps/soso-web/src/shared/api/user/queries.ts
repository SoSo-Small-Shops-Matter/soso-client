import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/store/useAuthStore';
import { useDialog } from '@/shared/context/DialogContext';
import { useRouter } from 'next/navigation';
import { userApi } from './api';
import type { DeleteUserRequest, PatchUserRequestType } from './types';
import { HOUR } from '@repo/utils';

export const userKeys = {
  all: ['user'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
  duplicateNickname: (nickname: string) => [...userKeys.all, 'duplicateNickname', nickname] as const,
};

export const useGetUserProfileQuery = () => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: userApi.getUserProfile,
    enabled: !!token,
    staleTime: 1 * HOUR
  });
};

export const useGetDuplicateNicknameQuery = (nickname: string) =>
  useQuery({
    queryKey: userKeys.duplicateNickname(nickname),
    queryFn: () => userApi.getDuplicateNickname(nickname),
    enabled: !!nickname,
  });

export const usePatchUserProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['patchUserProfile'],
    mutationFn: (data: PatchUserRequestType) => userApi.patchUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile() });
    }
  });
};

export const useDeleteUserMutation = () => {
  const router = useRouter();
  const { clearToken } = useAuthStore();
  const { closeDialog } = useDialog();

  return useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: (data: DeleteUserRequest) => userApi.deleteUser(data),
    onSuccess: () => {
      router.push('/login');
      clearToken();
      closeDialog();
    },
  });
};
