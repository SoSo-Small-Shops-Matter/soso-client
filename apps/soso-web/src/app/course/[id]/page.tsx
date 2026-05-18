'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import BottomModal from '@/shared/components/modal/BottomModal'
import { CourseStopStepper } from './components/courseStop/stepper/CourseStopStepper'
import { CourseStopSwiper } from './components/courseStop/swiper/CourseStopSwiper'
import { CourseDetailHeader } from './components/CourseDetailHeader'
import { useDialog } from '@/shared/context/DialogContext'
import { useCourseMap } from './hooks/useCourseMap'
import { use } from 'react'
import {
  useCreateShareLinkMutation,
  useDeleteCourseMutation,
  useGetCourseDetailQuery,
  useStampMutation,
  useUnstampMutation,
} from '@/shared/api/course/queries'
import Loading from '@/shared/components/loading/Loading'
import { useToast } from '@/shared/context/ToastContext'
import { shareData } from '../shared/[shareToken]/constants'
import { CourseDetailDto } from '@/shared/api/course/types'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function CourseDetailPage({ params }: PageProps) {
  const router = useRouter()
  const courseId = Number(use(params).id)
  const { data: course, isLoading, isError } = useGetCourseDetailQuery(courseId)
  const { openToast } = useToast()

  useEffect(() => {
    if (isError || (!isLoading && !course)) {
      openToast({ message: '코스를 불러오는데 실패했습니다.' })
      router.replace('/course')
    }
  }, [isError, isLoading, course])

  if (isLoading) return <Loading />
  if (isError || !course) return <></>

  return <CourseDetailContent course={course} courseId={courseId} />
}

interface CourseDetailContentProps {
  course: CourseDetailDto
  courseId: number
}

function CourseDetailContent({ course, courseId }: CourseDetailContentProps) {
  const router = useRouter()
  const { mutate: deleteCourseMutate } = useDeleteCourseMutation()
  const { mutate: stampMutate } = useStampMutation(courseId)
  const { mutate: unStampMutate } = useUnstampMutation(courseId)
  const { mutateAsync: shareLinkMutate } = useCreateShareLinkMutation(courseId)
  const { courseMapRef, selectCourseStop, onNaverMapsLoad, selectedStopIndex } = useCourseMap(course)
  const { openDialog, closeDialog } = useDialog()

  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [stampedIds, setStampedIds] = useState<Set<number>>(
    new Set(course.stops.filter((s) => s.visitedAt !== null).map((s) => s.shopId))
  )
  const [likedStopIds, setLikedStopIds] = useState<Set<number>>(new Set())

  const share = async () => {
    if (!navigator.share) return

    const { shareToken } = await shareLinkMutate()
    await navigator.share(shareData(course.name, shareToken))
  }

  const toggleStamp = (shopId: number) => {
    const prevIds = new Set(stampedIds)
    const isStamped = prevIds.has(shopId)
    setStampedIds((prev) => {
      const next = new Set(prev)
      isStamped ? next.delete(shopId) : next.add(shopId)
      return next
    })
    const mutate = isStamped ? unStampMutate : stampMutate
    mutate(shopId, {
      onError: () => setStampedIds(prevIds),
    })
  }

  const toggleLike = (shopId?: number) => {
    if (!shopId) return

    setLikedStopIds((prev) => {
      const next = new Set(prev)
      next.has(shopId) ? next.delete(shopId) : next.add(shopId)
      return next
    })
  }

  const handleEditCourse = () => {
    setIsMoreOpen(false)
    router.push(`/course/${courseId}/edit`)
  }

  const handleDeleteCourse = () => {
    setIsMoreOpen(false)

    openDialog({
      type: 'confirm',
      title: '코스 삭제',
      message: (
        <>
          {course.name}의 코스를 삭제할까요?
          <br />
          삭제 시 다시 복구할 수 없습니다.
        </>
      ),
      onConfirm: () => {
        deleteCourseMutate(courseId)
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
        onLoad={onNaverMapsLoad}
      />
      <div className="relative -mb-60 h-[calc(var(--vh,1vh)*100-56px)] w-full overflow-hidden">
        <div className="absolute left-0 right-0 top-0 z-10">
          <CourseDetailHeader
            title={course.name}
            onBack={() => router.back()}
            onMore={() => setIsMoreOpen(true)}
            onShare={share}
          />
          <CourseStopStepper stops={course.stops} onSelect={selectCourseStop} stampedIds={stampedIds} />
        </div>

        <div ref={courseMapRef} className="h-full w-full" />

        <CourseStopSwiper
          stops={course.stops}
          selectedIndex={selectedStopIndex ?? 0}
          onSelect={selectCourseStop}
          stampedIds={stampedIds}
          onToggleStamp={toggleStamp}
          onToggleLike={toggleLike}
          likedStopIds={likedStopIds}
        />
      </div>
      <BottomModal isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)}>
        <div className="flex flex-col">
          <button
            type="button"
            className="px-[4px] py-[18px] text-left text-gray-900 font-subtitle_l"
            onClick={handleEditCourse}
          >
            수정
          </button>
          <button
            type="button"
            className="px-[4px] py-[18px] text-left text-gray-900 font-subtitle_l"
            onClick={handleDeleteCourse}
          >
            삭제
          </button>
        </div>
      </BottomModal>
    </>
  )
}
