import { customFetch } from '@/shared/utils/customFetch'
import type {
  CourseDetailDto,
  CreateCourseRequest,
  GetCoursesParams,
  GetCoursesResponse,
  GetVisitedShopsResponse,
  SharedCourseDto,
  StampResponse,
  UnstampResponse,
  UpdateCourseRequest,
} from './types'

export const courseApi = {
  getCourses: async (params: GetCoursesParams = {}): Promise<GetCoursesResponse> => {
    const result = await customFetch('/courses', { queryParams: params })
    return result.result
  },

  createCourse: async (data: CreateCourseRequest): Promise<{ courseId: number }> => {
    const result = await customFetch('/courses', { method: 'POST', body: data })
    return result.result
  },

  getCourseDetail: async (courseId: number): Promise<CourseDetailDto> => {
    const result = await customFetch(`/courses/${courseId}`)
    return result.result
  },

  updateCourse: async (courseId: number, data: UpdateCourseRequest): Promise<void> => {
    await customFetch(`/courses/${courseId}`, { method: 'PATCH', body: data })
  },

  deleteCourse: async (courseId: number): Promise<void> => {
    await customFetch(`/courses/${courseId}`, { method: 'DELETE' })
  },

  getVisitedShops: async (page: number, limit: number): Promise<GetVisitedShopsResponse> => {
    const result = await customFetch('/courses/visited-shops', { queryParams: { page, limit } })
    return result.result
  },

  // ─── Share ───────────────────────────────────────────────────────────────

  createShareLink: async (courseId: number): Promise<{ shareToken: string }> => {
    const result = await customFetch(`/courses/${courseId}/share`, { method: 'POST' })
    return result.result
  },

  deleteShareLink: async (courseId: number): Promise<void> => {
    await customFetch(`/courses/${courseId}/share`, { method: 'DELETE' })
  },

  getSharedCourse: async (token: string): Promise<SharedCourseDto> => {
    const result = await customFetch(`/courses/shared/${token}`)
    return result.result
  },

  importSharedCourse: async (token: string): Promise<{ courseId: number }> => {
    const result = await customFetch(`/courses/shared/${token}/import`, { method: 'POST' })
    return result.result
  },

  // ─── Stamp ───────────────────────────────────────────────────────────────

  stamp: async (courseId: number, shopId: number): Promise<StampResponse> => {
    const result = await customFetch(`/courses/${courseId}/stops/${shopId}/stamp`, {
      method: 'POST',
    })
    return result.result
  },

  unstamp: async (courseId: number, shopId: number): Promise<UnstampResponse> => {
    const result = await customFetch(`/courses/${courseId}/stops/${shopId}/stamp`, {
      method: 'DELETE',
    })
    return result.result
  },
}
