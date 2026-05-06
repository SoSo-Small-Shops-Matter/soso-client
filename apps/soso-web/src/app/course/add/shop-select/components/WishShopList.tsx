import { MyWishType } from '@/shared/api/my/types'
import ShopListItem from './ShopListItem'

interface WishShopListProps {
  wishList: MyWishType[]
  isLoading: boolean
  selectedCount: number
  maxSelect: number
  isSelected: (shopId: number) => boolean
  selectedOrder: (shopId: number) => number
  onToggle: (wish: MyWishType) => void
}

export default function WishShopList({
  wishList,
  isLoading,
  selectedCount,
  maxSelect,
  isSelected,
  selectedOrder,
  onToggle,
}: WishShopListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-60">
        <p className="text-gray-400 font-body1_m">불러오는 중...</p>
      </div>
    )
  }

  if (wishList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 py-80">
        <p className="text-gray-400 font-body1_m">찜한 소품샵이 없어요.</p>
        <p className="text-gray-300 font-caption">소품샵을 찜하고 코스에 추가해보세요!</p>
      </div>
    )
  }

  return (
    <>
      {wishList.map((wish) => (
        <ShopListItem
          key={wish.id}
          id={wish.shop.id}
          name={wish.shop.name}
          mainImage={wish.shop.mainImage}
          selected={isSelected(wish.shop.id)}
          order={selectedOrder(wish.shop.id)}
          disabled={!isSelected(wish.shop.id) && selectedCount >= maxSelect}
          onToggle={() => onToggle(wish)}
        />
      ))}
    </>
  )
}
