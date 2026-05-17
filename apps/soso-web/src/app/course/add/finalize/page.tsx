'use client'

import { useCreateCourseMutation } from '@/shared/api/course/queries'
import MapIcon from '@/shared/components/icons/MapIcon'
import { useCourseAddStore } from '@/shared/store/useCourseAddStore'
import { useDialog } from '@/shared/context/DialogContext'
import { useToast } from '@/shared/context/ToastContext'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CourseNameEditor from './components/CourseNameEditor'
import SelectedShopList from './components/SelectedShopList'
import TextButton from '@/shared/components/button/TextButton'
import IconButton from '@/shared/components/button/IconButton'
import Button from '@/shared/components/button/Button'
import Header from '@/shared/components/layout/Header'

export default function CourseFinalizePage() {
  const router = useRouter()
  const { selectedShops, courseName, setCourseName, removeShop, reset } = useCourseAddStore()
  const { mutate: createCourse, isPending } = useCreateCourseMutation()
  const { openDialog, closeDialog } = useDialog()
  const { openToast } = useToast()
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleDelete = () => {
    if (selectedIds.size === 0) return
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
        setSelectedIds(new Set())
        closeDialog()
        openToast({ message: `${courseName} 코스가 삭제되었습니다.` })
      },
    })
  }

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
    <div className="flex h-[calc(var(--vh,1vh)*100)] flex-col bg-white">
      {/* 헤더 */}
      <Header
        title="코스 추가하기"
        rightIcon={
          <button type="button" onClick={() => router.push('/course/add/map')}>
            <MapIcon width="24" height="24" />
          </button>
        }
      />

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto pb-80 pt-56">
        {/* 코스명 + 추가하기 */}
        <div className="px-20">
          <CourseNameEditor value={courseName} onChange={setCourseName} />
          <div className="flex justify-end pb-8 pt-4">
            <TextButton
              label={'추가하기'}
              variant={'tertiary'}
              size={'small'}
              onClick={() => router.push('/course/add/shop-select')}
            />
          </div>
        </div>

        <SelectedShopList selectedIds={selectedIds} onToggleSelect={handleToggleSelect} />
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 w-full bg-white px-20 pb-24 pt-8 layout-center">
        <div className="flex w-full gap-9">
          <Button
            variant="tertiary"
            title="삭제"
            size="xLarge"
            width="30%"
            onClick={handleDelete}
            disabled={selectedIds.size === 0}
          />

          <Button
            variant="primary"
            title={isPending ? '생성 중...' : '코스 추가하기'}
            size="xLarge"
            onClick={handleCreate}
            disabled={!courseName.trim() || isPending}
          />
        </div>
      </div>
    </div>
  )
}
