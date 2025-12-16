export interface ShopType {
  id: number
  name: string
  reportStatus: number
  lat: number
  lng: number
  location: string
  operatingHours: OperatingHourType[]
  products: ProductType[]
  mainImage: string | null
  regionId: number
  distance: number
  reviewCount: number
}

export interface OperatingHourType {
  id?: number
  phoneNumber: string
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
  startTime: string
  endTime: string
}

export interface ProductType {
  id: number
  name: string
}

export interface ShopType {
  id: number
  name: string
  type: number
  reportStatus: number
  lat: number
  lng: number
  location: string
  instagramId: string
  operatingHours: OperatingHourType[]
  products: ProductType[]
}

export interface ImageType {
  id: number
  url: string
}

export interface ReviewType {
  id: number
  content: string
  createdAt: string
  images: ImageType[]
  user: {
    uuid: string
    photoUrl: string | null
    nickName: string
  }
}

export interface ShopDetailType {
  shop: ShopType
  userReviews: ReviewType[]
  otherReviews: ReviewType[]
  wishlist: boolean
  imageList: ImageType[]
}
