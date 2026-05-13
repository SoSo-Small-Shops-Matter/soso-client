'use client'

import { useGetCourseDetailQuery } from '@/shared/api/course/queries'
import Loading from '@/shared/components/loading/Loading'
import { useCourseEditStore } from '@/shared/store/useCourseEditStore'
import { useToast } from '@/shared/context/ToastContext'
import { useRouter } from 'next/navigation'
import { use, useEffect } from 'react'
import CourseEditContent from './components/CourseEditContent'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function CourseEditPage({ params }: PageProps) {
  const courseId = Number(use(params).id)
  const router = useRouter()
  const { data: course, isLoading, isError } = useGetCourseDetailQuery(courseId)
  const { openToast } = useToast()

  const { initFromCourse, courseId: storeId } = useCourseEditStore()

  useEffect(() => {
    if (course && storeId !== courseId) {
      initFromCourse(course)
    }
  }, [course, courseId, storeId])

  useEffect(() => {
    if (isError || (!isLoading && !course)) {
      openToast({ message: '코스를 불러오는데 실패했습니다.' })
      router.replace('/course')
    }
  }, [isError, isLoading, course])

  if (isLoading || !course) return <Loading />
  if (storeId !== courseId) return <Loading />

  return <CourseEditContent courseId={courseId} />
}
