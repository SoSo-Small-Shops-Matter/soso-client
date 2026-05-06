'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { useDialog } from '@/shared/context/DialogContext'
import { use } from 'react'
import Loading from '@/shared/components/loading/Loading'
import { useToast } from '@/shared/context/ToastContext'
import { useCourseMap } from '../../[id]/hooks/useCourseMap'
import { CourseStopSwiper } from '../../[id]/components/courseStop/swiper/CourseStopSwiper'
import { CourseStopStepper } from '../../[id]/components/courseStop/stepper/CourseStopStepper'
import { CourseSharedHeader } from '../components/CourseSharedHeader'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { useGetSharedCourseQuery, useImportSharedCourseMutation } from '@/shared/api/course/queries'
import { shareData } from './constants'
import ArrowRightIcon from '@/shared/components/icons/ArrowRightIcon'
import { SharedCourseDto } from '@/shared/api/course/types'

interface PageProps {
  params: Promise<{ shareToken: string }>
}

export default function CourseSharedPage({ params }: PageProps) {
  const router = useRouter()
  const shareToken = use(params).shareToken

  const { data: course, isLoading, isError } = useGetSharedCourseQuery(shareToken)

  const { openToast } = useToast()

  useEffect(() => {
    if (isError || (!isLoading && !course)) {
      openToast({ message: '코스를 불러오는데 실패했습니다.' })
      router.replace('/course')
    }
  }, [isError, isLoading, course])

  if (isLoading) return <Loading />
  if (isError || !course) return <></>

  return <CourseSharedContent course={course} shareToken={shareToken} />
}

interface CourseSharedContentProps {
  course: SharedCourseDto
  shareToken: string
}

function CourseSharedContent({ course, shareToken }: CourseSharedContentProps) {
  const router = useRouter()
  const { token } = useAuthStore()
  const { mutateAsync: mutateImportSharedCourse } = useImportSharedCourseMutation()
  const { openToast } = useToast()
  const { courseMapRef, selectCourseStop, onNaverMapsLoad, selectedStopIndex } = useCourseMap(course)
  const { openDialog, closeDialog } = useDialog()

  const [likedStopIds, setLikedStopIds] = useState<Set<number>>(new Set())

  const share = async () => {
    if (!navigator.share) return
    await navigator.share(shareData(course.name, shareToken))
  }

  const requireLogin = (message: string) => {
    openDialog({
      type: 'confirm',
      title: '',
      message,
      onConfirm: () => {
        closeDialog()
        router.push('/login')
      },
      onCancel: closeDialog,
    })
  }

  const saveCourse = () => {
    if (!token) {
      requireLogin('코스 저장은 로그인 후 이용할 수 있어요.')
      return
    }

    const successSaveCourseToastButton = (
      <div className="flex items-center gap-4">
        <div>보러가기</div>
        <ArrowRightIcon width="16" height="16" fill="white" />
      </div>
    )

    openDialog({
      type: 'confirm',
      title: '코스를 저장',
      message: `${course.name}을 내 코스에 저장할까요?`,
      leftLabel: '취소',
      rightLabel: '저장하기',
      onConfirm: async () => {
        closeDialog()
        const importedCourse = await mutateImportSharedCourse(shareToken)
        openToast({
          message: '내 코스에 추가했어요.',
          action: {
            content: successSaveCourseToastButton,
            onPress: () => router.push(`/course/${importedCourse.courseId}`),
          },
        })
      },
      onCancel: closeDialog,
    })
  }

  const toggleLike = (shopId?: number) => {
    if (!token || !shopId) {
      requireLogin('찜은 로그인 후 이용할 수 있어요.')
      return
    }

    setLikedStopIds((prev) => {
      const next = new Set(prev)
      next.has(shopId) ? next.delete(shopId) : next.add(shopId)
      return next
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
      <div className="relative h-full w-full">
        <div className="absolute left-0 right-0 top-0 z-10">
          <CourseSharedHeader
            title={course.name}
            onSaveCourse={saveCourse}
            nickname={course.ownerNickname}
            onShare={share}
          />
          <CourseStopStepper stops={course.stops} onSelect={selectCourseStop} selectedStopIndex={selectedStopIndex} />
        </div>

        <div ref={courseMapRef} className="h-full w-full" />

        <CourseStopSwiper
          stops={course.stops}
          selectedIndex={selectedStopIndex ?? 0}
          onSelect={selectCourseStop}
          showStamp={false}
          likedStopIds={likedStopIds}
          onToggleLike={toggleLike}
        />
      </div>
    </>
  )
}
