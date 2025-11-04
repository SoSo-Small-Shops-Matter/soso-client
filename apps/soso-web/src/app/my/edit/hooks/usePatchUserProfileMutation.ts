import { patchUserProfile } from '@/app/my/edit/api/patchUserProfile'
import { PatchUserRequestType } from '@/app/my/edit/types'
import { useMutation } from '@tanstack/react-query'

export const usePatchUserProfileMutation = () => {
  return useMutation({
    mutationKey: ['patchUserProfile'],
    mutationFn: (data: PatchUserRequestType) => patchUserProfile(data),
  })
}
