export interface PatchReportRequestType {
  shopId: number
  reportType: ShopReportTypeValue
}

export type ShopReportTypeValue = 'closed' | 'wrong_location'
