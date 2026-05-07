import { useGetShopsQuery } from '@/shared/api/shops/queries'
import { ShopType } from '@/shared/api/shops/types'
import { useLocationStore } from '@/shared/store/useLocationStore'
import ShopListItem from './ShopListItem'

interface RecommendShopListProps {
  selectedCount: number
  maxSelect: number
  isSelected: (shopId: number) => boolean
  selectedOrder: (shopId: number) => number
  onToggle: (shop: ShopType) => void
}

export default function RecommendShopList({
  selectedCount,
  maxSelect,
  isSelected,
  selectedOrder,
  onToggle,
}: RecommendShopListProps) {
  const { lat, lng } = useLocationStore()
  const { data: shops, isLoading } = useGetShopsQuery({ lat, lng })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-60">
        <p className="text-gray-400 font-body_m">불러오는 중...</p>
      </div>
    )
  }

  if (!shops || shops.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 py-80">
        <p className="text-gray-400 font-body_m">주변 소품샵이 없어요.</p>
      </div>
    )
  }

  return (
    <>
      {shops.map((shop) => (
        <ShopListItem
          key={shop.id}
          id={shop.id}
          name={shop.name}
          location={shop.location}
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
