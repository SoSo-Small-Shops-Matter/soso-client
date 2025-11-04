import { RegionType } from '@/app/my/wish/types'
import { customFetch } from '@/shared/utils/customFetch'

export const getWishRegion = async (): Promise<RegionType[]> => {
  const result = await customFetch('/regions')

  return result.result
}
