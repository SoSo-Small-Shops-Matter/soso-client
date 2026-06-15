'use client'

import { useCourseAddStore } from '@/shared/store/useCourseAddStore'
import SortableShopList from '@/app/course/components/SortableShopList'

interface SelectedShopListProps {
  selectedIds: Set<number>
  onToggleSelect: (id: number) => void
}

export default function SelectedShopList({ selectedIds, onToggleSelect }: SelectedShopListProps) {
  const { selectedShops: shops, reorderShops } = useCourseAddStore()

  return (
    <SortableShopList
      shops={shops}
      selectedIds={selectedIds}
      onToggleSelect={onToggleSelect}
      onReorder={reorderShops}
    />
  )
}
