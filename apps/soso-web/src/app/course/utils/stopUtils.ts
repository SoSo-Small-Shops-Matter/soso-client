import type { CourseStopDto, SharedStopDto } from '@/shared/api/course/types'

export function getStopShopId(stop: CourseStopDto | SharedStopDto): number {
  return 'shopId' in stop ? stop.shopId : stop.shop.id
}
