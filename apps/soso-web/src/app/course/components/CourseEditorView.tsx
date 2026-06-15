'use client'

import { ReactNode, useState } from 'react'
import { SelectedShop } from '@/shared/store/useCourseAddStore'
import { useDialog } from '@/shared/context/DialogContext'
import CourseNameEditor from './CourseNameEditor'
import TextButton from '@/shared/components/button/TextButton'
import SortableShopList from './SortableShopList'

interface CourseEditorViewProps {
  header: ReactNode
  shops: SelectedShop[]
  courseName: string
  onChangeCourseName: (name: string) => void
  onRemoveShop: (id: number) => void
  onReorderShops: (from: number, to: number) => void
  onClickAddShop: () => void
  onDeleteSuccess?: () => void
  bottomButtons: (params: { selectedIds: Set<number>; onDelete: () => void }) => ReactNode
}

export default function CourseEditorView({
  header,
  shops,
  courseName,
  onChangeCourseName,
  onRemoveShop,
  onReorderShops,
  onClickAddShop,
  onDeleteSuccess,
  bottomButtons,
}: CourseEditorViewProps) {
  const { openDialog, closeDialog } = useDialog()
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
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
        selectedIds.forEach((id) => onRemoveShop(id))
        setSelectedIds(new Set())
        closeDialog()
        onDeleteSuccess?.()
      },
    })
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {header}

      <div className="flex-1 overflow-y-auto pb-80 pt-12">
        <div className="px-20">
          <CourseNameEditor value={courseName} onChange={onChangeCourseName} />
          <div className="flex justify-end pb-8 pt-4">
            <TextButton label="추가하기" variant="tertiary" size="small" onClick={onClickAddShop} />
          </div>
        </div>

        <SortableShopList
          shops={shops}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onReorder={onReorderShops}
        />
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white px-20 pb-24 pt-8 layout-center">
        {bottomButtons({ selectedIds, onDelete: handleDelete })}
      </div>
    </div>
  )
}

export { type CourseEditorViewProps }
