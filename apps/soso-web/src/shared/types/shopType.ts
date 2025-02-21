export interface ShopType {
  id: number;
  name: string;
  reportStatus: number;
  lat: number;
  lng: number;
  location: string;
  operatingHours: OperatingHourType[];
  products: ProductType[];
}

export interface OperatingHourType {
  id: number;
  phoneNumber: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  startTime: string;
  endTime: string;
}

export interface ProductType {
  id: number;
  name: string;
}

export interface ShopType {
  id: number;
  name: string;
  type: number;
  reportStatus: number;
  lat: number;
  lng: number;
  location: string;
  operatingHours: OperatingHourType[];
  products: ProductType[];
}

export interface ReviewType {
  id: number;
  content: string;
  createdAt: string;
  images: {
    id: number;
    url: string;
  }[];
  user: {
    uuid: string;
    photoUrl: string;
    nickName: string;
  };
}

export interface ShopDetailType {
  shop: ShopType;
  userReviews: ReviewType[];
  otherReviews: ReviewType[];
  wishlist: boolean;
}
