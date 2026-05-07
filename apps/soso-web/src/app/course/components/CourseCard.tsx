'use client'

import 'react-swipeable-list/dist/styles.css'

import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { SwipeableList, SwipeableListItem, SwipeAction, TrailingActions, Type as ListType } from 'react-swipeable-list'
import { COURSE_STATUS, type CourseListItemDto } from '@/shared/api/course/types'
import { useDeleteCourseMutation } from '@/shared/api/course/queries'
import { useDialog } from '@/shared/context/DialogContext'
import { useToast } from '@/shared/context/ToastContext'
import { getFormatDateString } from '@repo/utils'
import TrashCanIcon from '@/shared/components/icons/TrashCanIcon'

interface CourseCardProps {
  course: CourseListItemDto
}

export default function CourseCard({ course }: CourseCardProps) {
  const isInProgress = course.status === COURSE_STATUS.IN_PROGRESS
  const thumbnail = course.thumbnails[0] ?? null

  const { openDialog, closeDialog } = useDialog()
  const { openToast } = useToast()
  const { mutate: deleteCourse } = useDeleteCourseMutation()

  const handleDelete = () => {
    openDialog({
      type: 'confirm',
      title: '코스 삭제',
      message: (
        <>
          {course.name} 코스를 삭제할까요?
          <br />
          삭제 시 다시 복구할 수 없습니다.
        </>
      ),
      leftLabel: '취소',
      rightLabel: '확인',
      onCancel: closeDialog,
      onConfirm: () => {
        closeDialog()
        deleteCourse(course.id, {
          onSuccess: () => openToast({ message: `${course.name} 코스가 삭제되었습니다.` }),
        })
      },
    })
  }

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={false} onClick={handleDelete}>
        <div className="flex h-full w-[64px] items-center justify-center">
          <div className="mr-16 flex h-[48px] w-[48px] items-center justify-center rounded-14 bg-etc-red">
            <TrashCanIcon />
          </div>
        </div>
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList type={ListType.IOS} fullSwipe={false}>
      <SwipeableListItem trailingActions={trailingActions()} fullSwipe={false}>
        <Link href={`/course/${course.id}`} className="w-full">
          <div className="flex items-center gap-14 bg-white px-20 py-16 transition-colors active:bg-gray-50">
            {/* 썸네일 */}
            <div className="h-52 w-52 flex-shrink-0 overflow-hidden rounded-12 bg-gray-100">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={course.name}
                  width={52}
                  height={52}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-100" />
              )}
            </div>

            {/* 이름 + 날짜 */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-gray-800 font-subtitle_m">{course.name}</p>
              <p className="mt-2 text-gray-400 font-caption">{getFormatDateString(course.createdAt, 'yyyy.MM.dd')}</p>
            </div>

            {/* 진행도 */}
            <div
              className={clsx(
                'flex w-[68px] flex-shrink-0 flex-col items-center justify-center rounded-10 px-12 py-6',
                isInProgress ? 'bg-orange-light' : 'bg-gray-50'
              )}
            >
              <span className={clsx('font-subtitle_m', isInProgress ? 'text-orange-normal' : 'text-gray-400')}>
                {course.progress}%
              </span>
              <span className={clsx('font-caption', isInProgress ? 'text-orange-normal' : 'text-gray-400')}>
                {isInProgress ? '진행 중' : '완료'}
              </span>
            </div>
          </div>

          {/* 구분선 */}
          <div className="mx-20 h-[1px] bg-gray-100" />
        </Link>
      </SwipeableListItem>
    </SwipeableList>
  )
}
