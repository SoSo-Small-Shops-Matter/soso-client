'use client'

import { courseKeys, useUpdateCourseMutation } from '@/shared/api/course/queries'
import { useQueryClient } from '@tanstack/react-query'
import Header from '@/shared/components/layout/Header'
import MapIcon from '@/shared/components/icons/MapIcon'
import { useCourseEditStore } from '@/shared/store/useCourseEditStore'
import { useToast } from '@/shared/context/ToastContext'
import { useRouter } from 'next/navigation'
import Button from '@/shared/components/button/Button'
import IconButton from '@/shared/components/button/IconButton'
import CourseEditorView from '@/app/course/components/CourseEditorView'

interface CourseEditContentProps {
  courseId: number
}

export default function CourseEditContent({ courseId }: CourseEditContentProps) {
  const router = useRouter()
  const { selectedShops, courseName, setCourseName, removeShop, reorderShops, reset } = useCourseEditStore()
  const queryClient = useQueryClient()
  const { mutate: updateCourse, isPending } = useUpdateCourseMutation(courseId)
  const { openToast } = useToast()

  const isSubmittable = !!courseName.trim() && selectedShops.length > 0

  const handleComplete = () => {
    if (!isSubmittable) return
    updateCourse(
      { name: courseName.trim(), shopIds: selectedShops.map((s) => s.id) },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: courseKeys.detail(courseId) })
          openToast({ message: '코스가 수정되었습니다.' })
          reset()
          router.replace(`/course/${courseId}`)
        },
      }
    )
  }

  return (
    <CourseEditorView
      header={
        <Header
          title="코스 수정"
          rightIcon={
            <IconButton
              variant="tertiary"
              icon={<MapIcon width="24" height="24" />}
              onClick={() => router.push(`/course/${courseId}/edit/map`)}
              label=""
            />
          }
        />
      }
      shops={selectedShops}
      courseName={courseName}
      onChangeCourseName={setCourseName}
      onRemoveShop={removeShop}
      onReorderShops={reorderShops}
      onClickAddShop={() => router.push(`/course/${courseId}/edit/shop-select`)}
      bottomButtons={({ selectedIds, onDelete }) => (
        <div className="flex w-full gap-9">
          <Button variant="tertiary" title="삭제" size="xLarge" width="30%" onClick={onDelete} disabled={selectedIds.size === 0} />
          <Button
            variant="primary"
            title={isPending ? '수정 중...' : '완료'}
            size="xLarge"
            onClick={handleComplete}
            disabled={!isSubmittable || isPending}
          />
        </div>
      )}
    />
  )
}
