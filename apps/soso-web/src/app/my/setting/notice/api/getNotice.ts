import { GetNoticeRequest } from '@/app/my/setting/notice/types'
import { customFetch } from '@/shared/utils/customFetch'

export const getNotice = async (): Promise<GetNoticeRequest> => {
  const result = await customFetch('/notices')

  return result.result
}
