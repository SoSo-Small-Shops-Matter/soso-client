import { OperatingHourType } from '@/shared/types/shopType';
import { create } from 'zustand';

interface Shop {
  name: string;
  lat: number | null;
  lng: number | null;
  location: string;
}

type OperatingHours = Pick<OperatingHourType, 'phoneNumber' |
  'daysOfWeek' |
  'startTime' |
  'endTime'>

interface Product {
  id: number;
  name: string;
}

interface ReportState {
  shop: Shop;
  operatingHours: OperatingHours;
  products: Product[];
  setShop: (shop: Shop) => void;
  setOperatingHours: (operatingHours: OperatingHours) => void;
  setProduct: (products: Product[]) => void;
  resetReport: () => void;
}

export interface ReportRequestType {
  shop: Shop;
  operatingHours: OperatingHours;
  products: Product[];
}

export const useReportStore = create<ReportState>()((set) => ({
  shop: {
    name: '',
    lat: null,
    lng: null,
    location: '',
  },
  operatingHours: {
    phoneNumber: null,
    daysOfWeek: [],
    startTime: '10:00',
    endTime: '20:00',
  },
  products: [],
  setShop: (shop) => set({ shop }),
  setOperatingHours: (operatingHours) => set({ operatingHours }),
  setProduct: (products) => set({ products }),

  resetReport: () =>
    set({
      shop: {
        name: '',
        lat: null,
        lng: null,
        location: '',
      },
      operatingHours: {
        phoneNumber: null,
        daysOfWeek: [],
        startTime: '10:00',
        endTime: '20:00',
      },
      products: [],
    }),
}));
