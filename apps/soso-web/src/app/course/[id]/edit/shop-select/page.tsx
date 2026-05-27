'use client'

import { use } from 'react'
import { useCourseEditStore } from '@/shared/store/useCourseEditStore'
import Header from '@/shared/components/layout/Header'
import ShopSelectView from '@/app/course/components/ShopSelectView'
import SelectedShopsBottom from '@/app/course/components/SelectedShopsBottom'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function CourseEditShopSelectPage({ params }: PageProps) {
  const courseId = Number(use(params).id)
  const { selectedShops, toggleShop, removeShop, clearShops } = useCourseEditStore()

  return (
    <ShopSelectView
      header={<Header title="코스 수정" />}
      selectedShops={selectedShops}
      toggleShop={toggleShop}
      footer={
        <SelectedShopsBottom
          selectedShops={selectedShops}
          maxSelect={30}
          nextPath={`/course/${courseId}/edit`}
          onRemove={removeShop}
          onReset={clearShops}
        />
      }
    />
  )
}
