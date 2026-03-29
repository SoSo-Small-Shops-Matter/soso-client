import { convertToFormData } from '@/shared/utils/convertToFormData';
import { customFetch } from '@/shared/utils/customFetch';
import type { DeleteUserRequest, PatchUserRequestType, UserType } from './types';

export const userApi = {
  getUserProfile: async (): Promise<UserType> => {
    const result = await customFetch('/users/me');
    return result.result;
  },

  patchUserProfile: async (data: PatchUserRequestType) => {
    return customFetch('/users/me', {
      method: 'PATCH',
      body: convertToFormData(data),
    });
  },

  deleteUser: async (data: DeleteUserRequest) => {
    return customFetch('/users/me', {
      method: 'DELETE',
      queryParams: { withdrawalReasonCode: data.withdrawalReasonCode },
    });
  },

  getDuplicateNickname: async (nickname: string): Promise<boolean> => {
    const result = await customFetch('/users/duplicate-check', {
      queryParams: { nickName: nickname },
    });
    return result.result;
  },
};
