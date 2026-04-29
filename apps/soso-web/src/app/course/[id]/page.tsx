'use client'
import type { CourseDetailDto } from '@/shared/api/course/types'
import { useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import BottomModal from '@/shared/components/modal/BottomModal'
import { CourseStopStepper } from './components/courseStop/stepper/CourseStopStepper'
import { CourseStopSwiper } from './components/courseStop/swiper/CourseStopSwiper'
import { CourseDetailHeader } from './components/CourseDetailHeader'
import { useDialog } from '@/shared/context/DialogContext'
import { useCourseMap } from './hooks/useCourseMap'
import { use } from 'react'
import { useGetCourseDetailQuery } from '@/shared/api/course/queries'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function CourseDetailPage({ params }: PageProps) {
  const router = useRouter()
  const { data } = useGetCourseDetailQuery(Number(use(params).id))
  const courses = data ?? DUMMY_COURSES

  const { courseMapRef, selectCourseStop, initCourseMapOnScriptLoad, selectedStopIndex } = useCourseMap(courses)
  const { openDialog, closeDialog } = useDialog()

  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [stampedIds, setStampedIds] = useState<Set<number>>(
    () => new Set(courses?.stops.filter((s) => s.visitedAt !== null).map((s) => s.shopId))
  )

  const toggleStamp = (shopId: number) => {
    setStampedIds((prev) => {
      const next = new Set(prev)
      if (next.has(shopId)) next.delete(shopId)
      else next.add(shopId)
      return next
    })
  }

  const handleDeleteCourse = () => {
    setIsMoreOpen(false)
    openDialog({
      type: 'confirm',
      title: '코스 삭제',
      message: `${courses.name}의 코스를 삭제할까요?\n삭제 시 다시 복구할 수 없습니다.`,
      onConfirm: () => {
        closeDialog()
        router.push('/course')
      },
      onCancel: closeDialog,
    })
  }

  return (
    <>
      <Script
        strategy="lazyOnload"
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
        onLoad={initCourseMapOnScriptLoad}
      />
      <div className="relative h-full w-full">
        <div className="absolute left-0 right-0 top-0 z-10">
          <CourseDetailHeader title={courses.name} onBack={() => router.back()} onMore={() => setIsMoreOpen(true)} />
          <CourseStopStepper stops={courses.stops} onSelect={selectCourseStop} stampedIds={stampedIds} />
        </div>
        <div ref={courseMapRef} className="h-full w-full" />
        <CourseStopSwiper
          stops={courses.stops}
          selectedIndex={selectedStopIndex ?? 0}
          onSelect={selectCourseStop}
          stampedIds={stampedIds}
          onToggleStamp={toggleStamp}
        />
      </div>
      <BottomModal isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)}>
        <div className="flex flex-col">
          <button type="button" className="px-[4px] py-[18px] text-left text-lg font-bold text-black">
            수정
          </button>
          <button
            type="button"
            className="px-[4px] py-[18px] text-left text-lg font-bold text-gray-900"
            onClick={handleDeleteCourse}
          >
            삭제
          </button>
        </div>
      </BottomModal>
    </>
  )
}

const DUMMY_COURSES: CourseDetailDto = {
  id: 1,
  name: '성수 카페 투어',
  createdAt: '2026-01-10T09:00:00Z',
  updatedAt: '2026-01-15T12:00:00Z',
  progress: 100,
  status: 'completed',
  stops: [
    {
      shopId: 601,
      orderIndex: 0,
      visitedAt: null,
      shop: {
        id: 601,
        name: '라뒤레 강남',
        mainImage: null,
        lat: 37.5172,
        lng: 127.0473,
        isHidden: false,
        instagram: 'laduree_kr',
      },
    },
    {
      shopId: 602,
      orderIndex: 1,
      visitedAt: null,
      shop: {
        id: 602,
        name: '누데이크',
        mainImage: null,
        lat: 37.5176,
        lng: 127.048,
        isHidden: false,
        instagram: 'nudake_official',
      },
    },
    {
      shopId: 603,
      orderIndex: 2,
      visitedAt: null,
      shop: {
        id: 603,
        name: '젤라떼리아',
        mainImage: null,
        lat: 37.5168,
        lng: 127.0465,
        isHidden: false,
        instagram: null,
      },
    },
  ],
}
