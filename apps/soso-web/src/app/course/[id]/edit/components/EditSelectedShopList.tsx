'use client'

import { useCourseEditStore } from '@/shared/store/useCourseEditStore'
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
import EditSortableShopItem from './EditSortableShopItem'

interface EditSelectedShopListProps {
  selectedIds: number[]
  onToggleSelect: (id: number) => void
}

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

export default function EditSelectedShopList({ selectedIds, onToggleSelect }: EditSelectedShopListProps) {
  const { selectedShops: shops, reorderShops } = useCourseEditStore()

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
      <DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToParent]} onDragEnd={handleDragEnd}>
        <SortableContext items={shops.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {shops.map((shop, index) => (
            <EditSortableShopItem
              key={shop.id}
              shop={shop}
              index={index}
              isSelected={selectedIds.includes(shop.id)}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
