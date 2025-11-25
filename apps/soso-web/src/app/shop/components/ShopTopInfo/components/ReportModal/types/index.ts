export interface PatchReportRequestType {
  shopId: number
  type: ShopReportTypeValue
}

export type ShopReportTypeValue = 'close' | 'wrong_location'
