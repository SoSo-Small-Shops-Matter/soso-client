'use client'

import { SelectedShop } from '@/shared/store/useCourseEditStore'
import CheckBoxIcon from '@/shared/components/icons/CheckBoxIcon'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ListIcon from '@/shared/components/icons/ListIcon'

interface EditSortableShopItemProps {
  shop: SelectedShop
  index: number
  isSelected: boolean
  onToggleSelect: (id: number) => void
}

export default function EditSortableShopItem({ shop, index, isSelected, onToggleSelect }: EditSortableShopItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: shop.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-full items-center gap-12 border-b border-gray-100 bg-white py-16"
    >
      {/* 체크박스 */}
      <button type="button" className="flex-shrink-0" onClick={() => onToggleSelect(shop.id)}>
        <CheckBoxIcon checked={isSelected} width="24" height="24" />
      </button>

      {/* 순서 번호 + 가게명 */}
      <div className="flex min-w-0 flex-1 items-center gap-8">
        <span className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400 font-caption">
          {index + 1}
        </span>
        <span className="truncate font-subtitle_l">{shop.name}</span>
      </div>

      {/* 드래그 핸들 */}
      <button
        type="button"
        className="cursor-grab touch-none px-4 py-2 text-gray-300 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <ListIcon width="28" height="28" fill={'#B2B7BD'} />
      </button>
    </div>
  )
}
