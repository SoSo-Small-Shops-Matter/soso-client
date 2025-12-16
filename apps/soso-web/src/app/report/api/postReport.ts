import { ReportRequestType } from '@/app/report/store/useReportStore'
import { customFetch } from '@/shared/utils/customFetch'

export const postReport = async (data: ReportRequestType) => {
  const result = customFetch(`/shops`, {
    method: 'POST',
    body: data,
  })

  return result
}
