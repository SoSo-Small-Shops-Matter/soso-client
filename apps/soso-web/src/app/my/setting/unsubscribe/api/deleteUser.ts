import { DeleteUserRequest } from '@/app/my/setting/unsubscribe/types'
import { customFetch } from '@/shared/utils/customFetch'

export const deleteUser = async (data: DeleteUserRequest) => {
  const queryParams: DeleteUserRequest = {
    withdrawalReasonCode: data.withdrawalReasonCode,
  }
  const result = customFetch('/users/me', {
    method: 'DELETE',
    queryParams,
  })

  return result
}
