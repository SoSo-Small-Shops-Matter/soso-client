import { customFetch } from '@/shared/utils/customFetch'

export const getDuplicateNickname = async (nickname: string): Promise<boolean> => {
  const result = await customFetch('/users/duplicate-check', {
    queryParams: {
      nickName: nickname,
    },
  })

  return result.result
}
