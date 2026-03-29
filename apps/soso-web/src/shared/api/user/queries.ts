import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/store/useAuthStore';
import { useDialog } from '@/shared/context/DialogContext';
import { useRouter } from 'next/navigation';
import { userApi } from './api';
import type { DeleteUserRequest, PatchUserRequestType } from './types';

export const userKeys = {
  all: ['user'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
  duplicateNickname: (nickname: string) => [...userKeys.all, 'duplicateNickname', nickname] as const,
};

export const useGetUserProfileQuery = () =>
  useQuery({
    queryKey: userKeys.profile(),
    queryFn: userApi.getUserProfile,
  });

export const useGetDuplicateNicknameQuery = (nickname: string) =>
  useQuery({
    queryKey: userKeys.duplicateNickname(nickname),
    queryFn: () => userApi.getDuplicateNickname(nickname),
    enabled: !!nickname,
  });

export const usePatchUserProfileMutation = () =>
  useMutation({
    mutationKey: ['patchUserProfile'],
    mutationFn: (data: PatchUserRequestType) => userApi.patchUserProfile(data),
  });

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
