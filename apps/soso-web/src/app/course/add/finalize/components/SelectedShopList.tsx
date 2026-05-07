'use client'

import { SelectedShop, useCourseAddStore } from '@/shared/store/useCourseAddStore'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableShopItem from './SortableShopItem'

interface SelectedShopListProps {
  shops: SelectedShop[]
  selectedIds: Set<number>
  onToggleSelect: (id: number) => void
}

export default function SelectedShopList({ shops, selectedIds, onToggleSelect }: SelectedShopListProps) {
  const { reorderShops } = useCourseAddStore()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const fromIndex = shops.findIndex((s) => s.id === active.id)
    const toIndex = shops.findIndex((s) => s.id === over.id)
    if (fromIndex !== -1 && toIndex !== -1) {
      reorderShops(fromIndex, toIndex)
    }
  }

  return (
    <div className="px-20">
      <p className="mb-12 font-subtitle_l">선택된 소품샵 ({shops.length}개)</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={shops.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {shops.map((shop, index) => (
            <SortableShopItem
              key={shop.id}
              shop={shop}
              index={index}
              isSelected={selectedIds.has(shop.id)}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
