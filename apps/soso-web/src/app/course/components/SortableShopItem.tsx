'use client'

import clsx from 'clsx'
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
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'flex w-full items-center gap-12 px-16 py-8',
        isDragging ? 'bg-white shadow-[0px_0px_5.5px_rgba(0,0,0,0.21)]' : isSelected ? 'bg-gray-50' : 'bg-white'
      )}
    >
      {/* 체크박스 */}
      <div className="flex items-center self-stretch">
        <Control
          label={`${shop.name}_${isSelected ? '선택됨' : '선택안됨'}`}
          checked={isSelected}
          size="s"
          onClick={() => onToggleSelect(shop.id)}
        />
      </div>

      {/* 가게명 카드 */}
      <button
        type="button"
        onClick={() => onToggleSelect(shop.id)}
        className="flex min-w-0 flex-1 items-center gap-8 rounded-16 bg-white p-16 shadow-[0px_0px_3px_rgba(0,0,0,0.08)]"
      >
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-10 bg-gray-100">
          <span className="text-13 font-bold leading-[12px] text-gray-400">{index + 1}</span>
        </div>
        <span className="truncate text-left font-subtitle_m">{shop.name}</span>
      </button>

      {/* 드래그 핸들 */}
      <div className="flex items-center self-stretch">
        <div
          className="flex h-full cursor-grab items-center touch-none active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <ListIcon width="28" height="28" fill="var(--gray-300)" />
        </div>
      </div>
    </div>
  )
}
