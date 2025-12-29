'use client'

import { useGetShopQuery } from '@/shared/hooks/useGetShopQuery'
import { useEffect, useState } from 'react'
import { useLocationStore } from '@/shared/store/useLocationStore'
import SelectCategoryModal, { DEFAULT_CATEGORY_ID_LIST } from './components/SelectCategoryModal'
import { getIsSameArray } from '@/shared/utils/getIsSame'
import MapView from './components/MapView'
import ListView from './components/ListView'
import { useIsNativeApp } from '@/shared/hooks/useIsNativeApp'
import useLocationHandler from '@/shared/hooks/useLocationHandler'

export default function HomePage() {
  useLocationHandler()
  const isNativeApp = useIsNativeApp()
  const { lat, lng, setLocation } = useLocationStore()
  const [categoryIdList, setCategoryIdList] = useState<number[]>(DEFAULT_CATEGORY_ID_LIST)
  const [isWishListView, setIsWishListView] = useState<boolean>(false)
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState<boolean>(false)
  const [isMapViewMode, setIsMapViewMode] = useState<boolean>(true)
  const { data: shopData } = useGetShopQuery(lat, lng, !isMapViewMode, isWishListView, categoryIdList)
  const totalShopCount = shopData?.length ?? 0
  const isCategoryView = categoryIdList.length > 0 && !getIsSameArray(categoryIdList, DEFAULT_CATEGORY_ID_LIST)

  const toggleMapViewMode = () => {
    setIsMapViewMode((prev) => !prev)
  }

  const handleClickWishList = () => {
    setIsWishListView((prev) => !prev)
  }

  // useEffect(() => {
  //   if (prevShopId) {
  //     setSelectedShopId(prevShopId);
  //   }
  // }, [prevShopId]);

  useEffect(() => {
    if (!isNativeApp) {
      return
    }

    const handler = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'INIT_NATIVE_LOCATION') {
          const { lat, lng } = data.payload
          setLocation(lat, lng)
        }
      } catch (err) {
        console.error('INIT_NATIVE_LOCATION 처리 중 에러:', err)
      }
    }

    window.addEventListener('message', handler)

    return () => {
      window.removeEventListener('message', handler)
    }
  }, [isNativeApp])

  return (
    <div className="relative">
      <MapView
        className={isMapViewMode ? 'block' : 'hidden'}
        isNativeApp={isNativeApp}
        shopData={shopData ?? []}
        totalShopCount={totalShopCount}
        toggleMapViewMode={toggleMapViewMode}
        isWishListView={isWishListView}
        isCategoryView={isCategoryView}
        handleClickWishList={handleClickWishList}
        openCategoryModal={() => setIsOpenCategoryModal(true)}
      />
      <ListView
        isMapViewMode={isMapViewMode}
        className={!isMapViewMode ? 'block' : 'hidden'}
        shopData={shopData ?? []}
        toggleMapViewMode={toggleMapViewMode}
        isWishListView={isWishListView}
        isCategoryView={isCategoryView}
        handleClickWishList={handleClickWishList}
        openCategoryModal={() => setIsOpenCategoryModal(true)}
      />

      <SelectCategoryModal
        isOpen={isOpenCategoryModal}
        onClose={() => {
          setIsOpenCategoryModal(false)
        }}
        categoryIdList={categoryIdList}
        onSubmit={setCategoryIdList}
      />
    </div>
  )
}
