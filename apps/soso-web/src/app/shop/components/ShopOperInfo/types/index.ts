import { OperatingHourType } from '@/shared/types/shopType'

export interface ShopOperatingRequestType {
  shopId: number
  operatingHours: OperatingHourType
}
