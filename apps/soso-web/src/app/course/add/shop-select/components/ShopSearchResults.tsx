import { SearchedShopType } from '@/shared/api/search/types'
import Link from 'next/link'
import ShopListItem from './ShopListItem'
import Button from '@/shared/components/button/Button'

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
      <div className="flex flex-col items-center justify-center gap-20 py-80">
        <p className="text-center text-gray-500 font-body_m">
          검색하신 소품샵이 없습니다.
          <br />
          소품샵을 등록해보세요!
        </p>
        <Link href="/report">
          <Button title={'소품샵 등록하기'} variant="secondary" width="auto" />
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
          mainImage={shop.mainImage}
          selected={isSelected(shop.id)}
          disabled={!isSelected(shop.id) && selectedCount >= maxSelect}
          onToggle={() => onToggle(shop)}
        />
      ))}
    </>
  )
}
