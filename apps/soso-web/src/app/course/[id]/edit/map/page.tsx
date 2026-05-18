'use client'

import { useEffect } from 'react'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useCourseEditStore } from '@/shared/store/useCourseEditStore'
import CourseShopMapView from '@/app/course/components/CourseShopMapView'
import Header from '@/shared/components/layout/Header'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function CourseEditMapPage({ params }: PageProps) {
  const courseId = Number(use(params).id)
  const router = useRouter()
  const { selectedShops } = useCourseEditStore()

  useEffect(() => {
    if (selectedShops.length === 0) {
      router.replace(`/course/${courseId}/edit`)
    }
  }, [selectedShops.length, router, courseId])

  if (selectedShops.length === 0) return null

  return (
    <CourseShopMapView
      shops={selectedShops}
      header={<Header title="코스 수정" />}
    />
  )
}
