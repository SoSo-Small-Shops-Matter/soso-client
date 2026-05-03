'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'

import { useDialog } from '@/shared/context/DialogContext'

import { use } from 'react'
import { useGetCourseDetailQuery } from '@/shared/api/course/queries'
import Loading from '@/shared/components/loading/Loading'
import { useToast } from '@/shared/context/ToastContext'
import { useCourseMap } from '../hooks/useCourseMap'
import { CourseStopSwiper } from '../components/courseStop/swiper/CourseStopSwiper'
import { CourseStopStepper } from '../components/courseStop/stepper/CourseStopStepper'

import { CourseSharedHeader } from './components/CourseSharedHeader'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { useGetUserProfileQuery } from '@/shared/api/user/queries'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function CourseSharedPage({ params }: PageProps) {
  const router = useRouter()
  const courseId = Number(use(params).id)
  const { token } = useAuthStore()
  const { data: userData } = useGetUserProfileQuery()
  const { data: course, isLoading, isError } = useGetCourseDetailQuery(courseId)
  const { openToast } = useToast()

  const { courseMapRef, selectCourseStop, initCourseMapOnScriptLoad, selectedStopIndex } = useCourseMap(course)
  const { openDialog, closeDialog } = useDialog()

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

    openDialog({
      type: 'confirm',
      title: '코스를 저장',
      message: `${course?.name}을 내 코스에 저장할까요?`,
      leftLabel: '취소',
      rightLabel: '저장하기',
      onConfirm: () => {
        closeDialog()
        openToast({ message: '코스가 저장되었어요.' })
      },
      onCancel: closeDialog,
    })
  }

  const toggleLike = () => {
    if (!token) requireLogin('찜은 로그인 후 이용할 수 있어요.')
  }

  useEffect(() => {
    if (isError || (!isLoading && !course)) {
      openToast({ message: '코스를 불러오는데 실패했습니다.' })
      router.replace('/course')
    }
  }, [isError, isLoading, course])

  if (isLoading) {
    return <Loading />
  }

  if (isError || !course) return <></>

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
          <CourseSharedHeader title={course.name} onSaveCourse={saveCourse} user={userData} />
          <CourseStopStepper stops={course.stops} onSelect={selectCourseStop} selectedStopIndex={selectedStopIndex} />
        </div>

        <div ref={courseMapRef} className="h-full w-full" />

        <CourseStopSwiper
          stops={course.stops}
          selectedIndex={selectedStopIndex ?? 0}
          onSelect={selectCourseStop}
          showStamp={false}
          onToggleLike={toggleLike}
        />
      </div>
    </>
  )
}
