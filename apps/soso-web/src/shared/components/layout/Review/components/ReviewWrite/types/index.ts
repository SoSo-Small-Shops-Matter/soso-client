export interface ReviewRequestType {
  shopId: number
  content: string
  reviewImages: File[]
}

export interface PatchReviewRequestType {
  shopId: number
  reviewId: number
  content: string
  deleteReviewImages: number[]
  newReviewImages: File[]
}
