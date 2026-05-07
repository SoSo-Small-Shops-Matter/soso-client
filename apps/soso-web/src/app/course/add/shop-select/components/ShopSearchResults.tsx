import { SearchedShopType } from '@/shared/api/search/types'
import Link from 'next/link'
import ShopListItem from './ShopListItem'

interface ShopSearchResultsProps {
  results: SearchedShopType[]
  isLoading: boolean
  selectedCount: number
  maxSelect: number
  isSelected: (shopId: number) => boolean
  selectedOrder: (shopId: number) => number
  onToggle: (shop: SearchedShopType) => void
}

export default function ShopSearchResults({
  results,
  isLoading,
  selectedCount,
  maxSelect,
  isSelected,
  selectedOrder,
  onToggle,
}: ShopSearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-60">
        <p className="text-gray-400 font-body_m">검색 중...</p>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-16 py-80">
        <p className="text-gray-800 font-body_m">검색하신 소품샵이 없습니다.</p>
        <p className="text-gray-400 font-caption">소품샵을 등록해보세요!</p>
        <Link href="/shop/register" className="rounded-full border border-main px-20 py-10 text-main font-body_s">
          소품샵 등록하기
        </Link>
      </div>
    )
  }

  return (
    <>
      {results.map((shop) => (
        <ShopListItem
          key={shop.id}
          id={shop.id}
          name={shop.name}
          location={shop.location ?? undefined}
          mainImage={shop.mainImage}
          selected={isSelected(shop.id)}
          order={selectedOrder(shop.id)}
          disabled={!isSelected(shop.id) && selectedCount >= maxSelect}
          onToggle={() => onToggle(shop)}
        />
      ))}
    </>
  )
}
