import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { courseApi } from './api'
import type { CreateCourseRequest, GetCoursesParams, UpdateCourseRequest } from './types'
import { MINUTE } from '@repo/utils'

export const courseKeys = {
  all: ['courses'] as const,
  list: (params: GetCoursesParams) => [...courseKeys.all, 'list', params] as const,
  detail: (courseId: number) => [...courseKeys.all, 'detail', courseId] as const,
  shared: (token: string) => [...courseKeys.all, 'shared', token] as const,
}

// ─── Queries ───────────────────────────────────────────────────────────────

export const useGetCoursesQuery = (params: GetCoursesParams = {}) =>
  useQuery({
    queryKey: courseKeys.list(params),
    queryFn: () => courseApi.getCourses(params),
    staleTime: 10 * MINUTE,
  })

export const useGetCourseDetailQuery = (courseId: number) =>
  useQuery({
    queryKey: courseKeys.detail(courseId),
    queryFn: () => courseApi.getCourseDetail(courseId),
    enabled: !!courseId,
  })

export const useGetSharedCourseQuery = (token: string) =>
  useQuery({
    queryKey: courseKeys.shared(token),
    queryFn: () => courseApi.getSharedCourse(token),
    enabled: !!token,
  })

// ─── Mutations ─────────────────────────────────────────────────────────────

export const useCreateCourseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createCourse'],
    mutationFn: (data: CreateCourseRequest) => courseApi.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
    },
  })
}

export const useUpdateCourseMutation = (courseId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updateCourse', courseId],
    mutationFn: (data: UpdateCourseRequest) => courseApi.updateCourse(courseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(courseId) })
    },
  })
}

export const useDeleteCourseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteCourse'],
    mutationFn: (courseId: number) => courseApi.deleteCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
    },
  })
}

export const useCreateShareLinkMutation = (courseId: number) =>
  useMutation({
    mutationKey: ['createShareLink', courseId],
    mutationFn: () => courseApi.createShareLink(courseId),
  })

export const useDeleteShareLinkMutation = (courseId: number) =>
  useMutation({
    mutationKey: ['deleteShareLink', courseId],
    mutationFn: () => courseApi.deleteShareLink(courseId),
  })

export const useImportSharedCourseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['importSharedCourse'],
    mutationFn: (token: string) => courseApi.importSharedCourse(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
    },
  })
}

export const useStampMutation = (courseId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['stamp', courseId],
    mutationFn: (shopId: number) => courseApi.stamp(courseId, shopId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(courseId) })
    },
  })
}

export const useUnstampMutation = (courseId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['unstamp', courseId],
    mutationFn: (shopId: number) => courseApi.unstamp(courseId, shopId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(courseId) })
    },
  })
}
