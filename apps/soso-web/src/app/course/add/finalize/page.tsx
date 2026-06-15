'use client'

import { useCreateCourseMutation } from '@/shared/api/course/queries'
import MapIcon from '@/shared/components/icons/MapIcon'
import { useCourseAddStore } from '@/shared/store/useCourseAddStore'
import { useToast } from '@/shared/context/ToastContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Button from '@/shared/components/button/Button'
import Header from '@/shared/components/layout/Header'
import CourseEditorView from '@/app/course/components/CourseEditorView'

export default function CourseFinalizePage() {
  const router = useRouter()
  const { selectedShops, courseName, setCourseName, removeShop, reorderShops, reset } = useCourseAddStore()
  const { mutate: createCourse, isPending } = useCreateCourseMutation()
  const { openToast } = useToast()

  const handleCreate = () => {
    if (!courseName.trim() || selectedShops.length === 0) return
    const nameSnapshot = courseName.trim()
    createCourse(
      { name: nameSnapshot, shopIds: selectedShops.map((s) => s.id) },
      {
        onSuccess: () => {
          openToast({ message: `${nameSnapshot} 코스가 추가되었습니다.` })
          reset()
          const timeout = setTimeout(() => {
            router.replace('/course')
            clearTimeout(timeout)
          }, 500)
        },
      }
    )
  }

  useEffect(() => {
    if (selectedShops.length === 0) {
      router.replace('/course/add/shop-select')
    }
  }, [selectedShops.length, router])

  return (
    <CourseEditorView
      header={
        <Header
          title="코스 추가하기"
          rightIcon={
            <button type="button" onClick={() => router.push('/course/add/map')}>
              <MapIcon width="24" height="24" color={'var(--gray-900)'} />
            </button>
          }
        />
      }
      shops={selectedShops}
      courseName={courseName}
      onChangeCourseName={setCourseName}
      onRemoveShop={removeShop}
      onReorderShops={reorderShops}
      onClickAddShop={() => router.push('/course/add/shop-select')}
      onDeleteSuccess={() => openToast({ message: `${courseName} 코스가 삭제되었습니다.` })}
      bottomButtons={({ selectedIds, onDelete }) => (
        <div className="flex w-full gap-9">
          <Button variant="tertiary" title="삭제" size="xLarge" width="30%" onClick={onDelete} disabled={selectedIds.size === 0} />
          <Button
            variant="primary"
            title={isPending ? '생성 중...' : '코스 추가하기'}
            size="xLarge"
            onClick={handleCreate}
            disabled={!courseName.trim() || isPending}
          />
        </div>
      )}
    />
  )
}
