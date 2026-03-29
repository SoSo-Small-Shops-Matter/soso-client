import type { DayOfWeek } from '@repo/utils';

// ─── Operating Hours ───────────────────────────────────────────────────────
export interface OperatingHourType {
  id: number;
  isVerified: number;
  phoneNumber: string | null;
  daysOfWeek: DayOfWeek[];
  startTime: string;
  endTime: string;
}

export interface OperatingHoursRequest {
  phoneNumber: string | null;
  daysOfWeek: DayOfWeek[];
  startTime: string;
  endTime: string;
}

// ─── Product ───────────────────────────────────────────────────────────────
export interface ProductType {
  id: number;
  name: string;
}

// ─── Shop ──────────────────────────────────────────────────────────────────
export interface ShopType {
  id: number;
  name: string;
  type: number;
  reportStatus: number;
  lat: number;
  lng: number;
  location: string;
  instagramId: string;
  mainImage: string | null;
  regionId: number;
  distance: number;
  reviewCount: number;
  operatingHours: OperatingHourType[];
  products: ProductType[];
}

export interface ImageType {
  id: number;
  url: string;
}

export interface ReviewType {
  id: number;
  content: string;
  createdAt: string;
  images: ImageType[];
  user: {
    uuid: string;
    photoUrl: string | null;
    nickName: string;
  };
}

export interface ShopDetailType {
  shop: ShopType;
  userReviews: ReviewType[];
  otherReviews: ReviewType[];
  wishlist: boolean;
  imageList: ImageType[];
}

// ─── Request types ─────────────────────────────────────────────────────────
export interface GetShopsParams {
  lat?: number | null;
  lng?: number | null;
  sorting?: boolean;
  isWishlist?: boolean;
  productIds?: number[];
}

export interface ShopOperatingRequestType {
  shopId: number;
  operatingHours: OperatingHoursRequest;
}

export interface AddProductRequest {
  shopId: number;
  products: Pick<ProductType, 'id'>[];
}
