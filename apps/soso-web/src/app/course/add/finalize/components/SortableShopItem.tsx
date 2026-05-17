'use client'

import { SelectedShop } from '@/shared/store/useCourseAddStore'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ListIcon from '@/shared/components/icons/ListIcon'
import Control from '@/shared/components/inputs/Control'

interface SortableShopItemProps {
  shop: SelectedShop
  index: number
  isSelected: boolean
  onToggleSelect: (id: number) => void
}

export default function SortableShopItem({ shop, index, isSelected, onToggleSelect }: SortableShopItemProps) {
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
    <div ref={setNodeRef} style={style} className="flex w-full items-center gap-12 bg-white px-16 py-8">
      <div onClick={() => onToggleSelect(shop.id)} className="flex w-full items-center gap-12">
        {/* 체크박스 */}
        <Control label={`${shop.name}_${isSelected ? '선택됨' : '선택안됨'}`} checked={isSelected} />

        {/* 가게명 + 순서 */}
        <div className="flex min-w-0 flex-1 items-center gap-8 p-16">
          <div className="flex h-18 w-18 items-center justify-center rounded-full bg-gray-100 text-center">
            <span className="font-bold text-gray-400 font-caption">{index + 1}</span>
          </div>
          <span className="truncate font-subtitle_l">{shop.name}</span>
        </div>
      </div>

      {/* 드래그 핸들 */}
      <button
        type="button"
        className="flex-shrink-0 cursor-grab touch-none px-4 py-2 text-gray-300 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <ListIcon width="28" height="28" fill="var(--gray-300)" />
      </button>
    </div>
  )
}
