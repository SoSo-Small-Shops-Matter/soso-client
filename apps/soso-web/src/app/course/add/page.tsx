'use client'

import { useCourseAddStore } from '@/shared/store/useCourseAddStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CourseAddPage() {
  const router = useRouter()
  const reset = useCourseAddStore((s) => s.reset)

  useEffect(() => {
    reset()
    router.replace('/course/add/shop-select')
  }, [reset, router])

  return null
}
