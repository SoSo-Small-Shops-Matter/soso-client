'use client'

import { SelectedShop } from '@/shared/store/useCourseAddStore'
import CheckBoxIcon from '@/shared/components/icons/CheckBoxIcon'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-full items-center gap-12 border-b border-gray-100 bg-white py-16"
    >
      {/* 체크박스 */}
      <button type="button" className="flex-shrink-0" onClick={() => onToggleSelect(shop.id)}>
        <CheckBoxIcon checked={isSelected} width="24" height="24" />
      </button>

      {/* 가게명 + 순서 */}
      <div className="flex flex-1 min-w-0 items-center gap-8">
        <span className="truncate font-title4_semi">{shop.name}</span>
        <span className="flex-shrink-0 text-gray-400 font-caption">{index + 1}</span>
      </div>

      {/* 드래그 핸들 */}
      <button
        type="button"
        className="flex-shrink-0 cursor-grab touch-none px-4 py-2 text-gray-300 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 7h12M4 10h12M4 13h12" stroke="#C5CBD2" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
