'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCourseAddStore } from '@/shared/store/useCourseAddStore'
import CourseShopMapView from '@/app/course/components/CourseShopMapView'
import Header from '@/shared/components/layout/Header'

export default function CourseAddMapPage() {
  const router = useRouter()
  const { selectedShops } = useCourseAddStore()

  useEffect(() => {
    if (selectedShops.length === 0) {
      router.replace('/course/add/finalize')
    }
  }, [selectedShops.length, router])

  if (selectedShops.length === 0) return null

  return (
    <CourseShopMapView
      shops={selectedShops}
      header={<Header title="코스 추가하기" />}
    />
  )
}
