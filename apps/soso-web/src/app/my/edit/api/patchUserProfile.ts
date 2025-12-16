import { PatchUserRequestType } from '@/app/my/edit/types'
import { convertToFormData } from '@/shared/utils/convertToFormData'
import { customFetch } from '@/shared/utils/customFetch'

export const patchUserProfile = async (data: PatchUserRequestType) => {
  const result = await customFetch('/users/me', {
    method: 'PATCH',
    body: convertToFormData(data),
  })

  return result
}
