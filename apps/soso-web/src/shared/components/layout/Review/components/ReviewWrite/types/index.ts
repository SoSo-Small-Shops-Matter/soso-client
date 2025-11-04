export interface ReviewRequestType {
  shopId: number
  content: string
  reviewImgKeys: string[] //TODO: presigned image
}

export interface PatchReviewRequestType {
  shopId: number
  reviewId: number
  content: string
  deleteImages: number[]
  newImageKeys: string[] //TODO: presigned image
}
