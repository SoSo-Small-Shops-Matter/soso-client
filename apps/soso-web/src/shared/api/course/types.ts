// ─── Common ────────────────────────────────────────────────────────────────

export type CourseStatus = 'in_progress' | 'completed'

// ─── Shop summary (used inside course) ────────────────────────────────────

export interface CourseShopSummary {
  id: number
  name: string
  mainImage: string | null
  lat: number
  lng: number
  isHidden: boolean
  instagram: string | null
}

// ─── Stop ──────────────────────────────────────────────────────────────────

export interface CourseStopDto {
  shopId: number
  orderIndex: number
  visitedAt: string | null
  shop: CourseShopSummary
}

// ─── Course List ───────────────────────────────────────────────────────────

export interface CourseListItemDto {
  id: number
  name: string
  createdAt: string
  progress: number
  status: CourseStatus
  thumbnails: string[]
}

export interface GetCoursesParams {
  status?: 'all' | CourseStatus
  page?: number
  limit?: number
}

export interface GetCoursesResponse {
  items: CourseListItemDto[]
  total: number
  page: number
  limit: number
}

// ─── Course Detail ─────────────────────────────────────────────────────────

export interface CourseDetailDto {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  progress: number
  status: CourseStatus
  stops: CourseStopDto[]
}

// ─── Create / Update ───────────────────────────────────────────────────────

export interface CreateCourseRequest {
  name: string
  shopIds: number[]
}

export interface UpdateCourseRequest {
  name?: string
  shopIds?: number[]
}

// ─── Shared Course ─────────────────────────────────────────────────────────

export interface SharedStopDto {
  orderIndex: number
  shop: Pick<CourseShopSummary, 'id' | 'name' | 'mainImage' | 'lat' | 'lng'> & {
    instagram: string | null
  }
}

export interface SharedCourseDto {
  name: string
  ownerNickname: string | null
  totalStops: number
  stops: SharedStopDto[]
}

// ─── Stamp ─────────────────────────────────────────────────────────────────

export interface StampResponse {
  visitedAt: string
  progress: number
  status: CourseStatus
}

export interface UnstampResponse {
  progress: number
  status: CourseStatus
}
