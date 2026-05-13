'use client'

import { courseKeys, useUpdateCourseMutation } from '@/shared/api/course/queries'
import { useQueryClient } from '@tanstack/react-query'
import Header from '@/shared/components/layout/Header'
import MapIcon from '@/shared/components/icons/MapIcon'
import { useCourseEditStore } from '@/shared/store/useCourseEditStore'
import { useDialog } from '@/shared/context/DialogContext'
import { useToast } from '@/shared/context/ToastContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CourseNameEditor from '@/app/course/add/finalize/components/CourseNameEditor'
import EditSelectedShopList from './EditSelectedShopList'
import TextButton from '@/shared/components/button/TextButton'
import Button from '@/shared/components/button/Button'
import IconButton from '@/shared/components/button/IconButton'

interface CourseEditContentProps {
  courseId: number
}

export default function CourseEditContent({ courseId }: CourseEditContentProps) {
  const router = useRouter()
  const { selectedShops, courseName, setCourseName, removeShop, reset } = useCourseEditStore()
  const queryClient = useQueryClient()
  const { mutate: updateCourse, isPending } = useUpdateCourseMutation(courseId)
  const { openDialog, closeDialog } = useDialog()
  const { openToast } = useToast()
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]))
  }

  const onClickMap = () => {
    router.push(`/course/${courseId}/edit/map`)
  }

  const onClickAddShop = () => {
    router.push(`/course/${courseId}/edit/shop-select`)
  }

  const handleDelete = () => {
    if (selectedIds.length === 0) return
    openDialog({
      type: 'confirm',
      title: '소품샵 삭제',
      message: (
        <>
          선택한 소품샵을 삭제할까요?
          <br />
          삭제 시 리스트에서 삭제됩니다.
        </>
      ),
      leftLabel: '취소',
      rightLabel: '삭제',
      onCancel: closeDialog,
      onConfirm: () => {
        selectedIds.forEach((id) => removeShop(id))
        setSelectedIds([])
        closeDialog()
      },
    })
  }

  const handleComplete = () => {
    if (!courseName.trim() || selectedShops.length === 0) return
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
    <div className="flex h-[calc(var(--vh,1vh)*100)] flex-col bg-white">
      <Header
        type="customBack"
        title="코스 수정"
        customBtn={
          <IconButton variant={'tertiary'} icon={<MapIcon width="24" height="24" />} onClick={onClickMap} label={''} />
        }
      />

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto pb-80 pt-56">
        {/* 코스명 + 추가하기 */}
        <div className="px-20">
          <CourseNameEditor value={courseName} onChange={setCourseName} />
          <div className="flex justify-end pb-8 pt-4">
            <TextButton label={'추가하기'} variant={'tertiary'} size={'small'} onClick={onClickAddShop} />
          </div>
        </div>

        <EditSelectedShopList selectedIds={selectedIds} onToggleSelect={handleToggleSelect} />
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 w-full bg-white px-16 py-10 pb-32 layout-center">
        <div className="flex w-full gap-10">
          <Button
            variant="tertiary"
            width="50%"
            size="xLarge"
            title={'삭제'}
            onClick={handleDelete}
            disabled={selectedIds.length === 0}
          />
          <Button
            title={isPending ? '수정 중...' : '완료'}
            variant="primary"
            size="xLarge"
            onClick={handleComplete}
            disabled={!courseName.trim() || isPending}
          />
        </div>
      </div>
    </div>
  )
}
