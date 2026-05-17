'use client'

import { useCourseAddStore } from '@/shared/store/useCourseAddStore'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { Modifier } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableShopItem from './SortableShopItem'

const restrictToParent: Modifier = ({ transform, containerNodeRect, draggingNodeRect }) => {
  if (!containerNodeRect || !draggingNodeRect) return transform

  const top = containerNodeRect.top - draggingNodeRect.top + transform.y
  const bottom = containerNodeRect.bottom - draggingNodeRect.bottom + transform.y

  return {
    ...transform,
    x: 0,
    y: Math.min(Math.max(transform.y, top), bottom),
  }
}

interface SelectedShopListProps {
  selectedIds: Set<number>
  onToggleSelect: (id: number) => void
}

export default function SelectedShopList({ selectedIds, onToggleSelect }: SelectedShopListProps) {
  const { selectedShops: shops, reorderShops } = useCourseAddStore()

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
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToParent]} onDragEnd={handleDragEnd}>
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
