'use client'

import ShopLocation from '@/app/shop/components/ShopLocation'
import ShopOperInfo from '@/app/shop/components/ShopOperInfo'
import ShopProducts from '@/app/shop/components/ShopProducts'
import ShopReview from '@/app/shop/components/ShopReview'
import ShopTopInfo from '@/app/shop/components/ShopTopInfo'
import SnsInfo from '@/app/shop/components/SnsInfo'
import { useGetShopDetailQuery } from '@/shared/api/shops/queries'
import Divider from '@/shared/components/divider/Divider'
import Header from '@/shared/components/layout/Header'
import useMapStore from '@/shared/store/useMapStore'
import { use, useEffect } from 'react'

interface PageProps {
  params: Promise<{ id: string }> // ✅ params가 Promise 객체임
}

export default function ShopDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const { setCenter, addMarker, map, clearMarkers } = useMapStore()

  const { data: shopDetailData, isLoading } = useGetShopDetailQuery(id)

  useEffect(() => {
    if (isLoading || !shopDetailData || !map) return
    clearMarkers()
    addMarker({
      id: shopDetailData?.shop.id,
      position: { lat: shopDetailData?.shop.lat, lng: shopDetailData?.shop.lng },
    })
    setCenter(shopDetailData?.shop.lat, shopDetailData?.shop.lng)
  }, [shopDetailData, map, addMarker])

  return (
    <div>
      <Header type="back" />
      <ShopTopInfo shopData={shopDetailData} />
      <Divider height="10px" bgColor="var(--gray-50)" />
      <ShopLocation location={shopDetailData?.shop.location} />
      <Divider height="10px" bgColor="var(--gray-50)" />
      <ShopOperInfo operData={shopDetailData?.shop.operatingHours} />
      <Divider height="10px" bgColor="var(--gray-50)" />
      <SnsInfo instaId={shopDetailData?.shop.instagramId || ''} />
      <Divider height="10px" bgColor="var(--gray-50)" />
      <ShopProducts productData={shopDetailData?.shop.products} />
      <Divider height="10px" bgColor="var(--gray-50)" />
      <ShopReview id={id} shopData={shopDetailData} />
    </div>
  )
}
