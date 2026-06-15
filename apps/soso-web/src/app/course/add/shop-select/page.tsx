'use client'

import { useCourseAddStore } from '@/shared/store/useCourseAddStore'
import Header from '@/shared/components/layout/Header'
import SelectedShopsBottom from '@/app/course/components/SelectedShopsBottom'
import ShopSelectView from '@/app/course/components/ShopSelectView'

export default function CourseShopSelectPage() {
  const { selectedShops, toggleShop, removeShop, reset } = useCourseAddStore()

  return (
    <ShopSelectView
      header={<Header title="코스 추가하기" />}
      selectedShops={selectedShops}
      toggleShop={toggleShop}
      footer={
        <SelectedShopsBottom
          selectedShops={selectedShops}
          maxSelect={30}
          nextPath="/course/add/finalize"
          onRemove={removeShop}
          onReset={reset}
        />
      }
    />
  )
}
