export type ShopReportTypeValue = 'closed' | 'wrong_location';

export interface PatchReportRequestType {
  shopId: number;
  reportType: ShopReportTypeValue;
}

export interface ReportRequestType {
  shop: {
    name: string;
    lat: number | null;
    lng: number | null;
    location: string;
  };
  operatingHours: {
    phoneNumber: string | null;
    daysOfWeek: string[];
    startTime: string;
    endTime: string;
  };
  products: { id: number; name: string }[];
}
