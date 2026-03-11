import { DayOfWeek } from "@repo/utils/days";

export interface OperatingHoursRequest {
  phoneNumber: string | null;
  daysOfWeek: DayOfWeek[];
  startTime: string;
  endTime: string;
}

export interface ShopOperatingRequestType {
  shopId: number;
  operatingHours: OperatingHoursRequest;
}
