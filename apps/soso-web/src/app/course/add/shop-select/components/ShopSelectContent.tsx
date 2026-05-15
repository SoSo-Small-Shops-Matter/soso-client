import { SearchedShopType } from '@/shared/api/search/types'
import { MyWishType } from '@/shared/api/my/types'
import { SelectedShop } from '@/shared/store/useCourseAddStore'
import { type FilterType } from './ShopSelectTabs'
import ShopSearchResults from './ShopSearchResults'
import WishShopList from './WishShopList'
import RecommendShopList from './RecommendShopList'

interface ShopSelectContentProps {
  isSearchMode: boolean
  activeFilter: FilterType | null
  searchResults: SearchedShopType[]
  isSearchLoading: boolean
  wishList: MyWishType[]
  isWishLoading: boolean
  selectedCount: number
  maxSelect: number
  isSelected: (shopId: number) => boolean
  selectedOrder: (shopId: number) => number
  onToggle: (shop: SelectedShop) => void
}

export default function ShopSelectContent({
  isSearchMode,
  activeFilter,
  searchResults,
  isSearchLoading,
  wishList,
  isWishLoading,
  selectedCount,
  maxSelect,
  isSelected,
  selectedOrder,
  onToggle,
}: ShopSelectContentProps) {
  if (isSearchMode) {
    return (
      <ShopSearchResults
        results={searchResults}
        isLoading={isSearchLoading}
        selectedCount={selectedCount}
        maxSelect={maxSelect}
        isSelected={isSelected}
        selectedOrder={selectedOrder}
        onToggle={(shop) => onToggle(shop)}
      />
    )
  }
  if (activeFilter === 'wish') {
    return (
      <WishShopList
        wishList={wishList}
        isLoading={isWishLoading}
        selectedCount={selectedCount}
        maxSelect={maxSelect}
        isSelected={isSelected}
        selectedOrder={selectedOrder}
        onToggle={(wish) => onToggle(wish.shop)}
      />
    )
  }
  if (activeFilter === 'recommend') {
    return (
      <RecommendShopList
        selectedCount={selectedCount}
        maxSelect={maxSelect}
        isSelected={isSelected}
        selectedOrder={selectedOrder}
        onToggle={(shop) => onToggle(shop)}
      />
    )
  }
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-80">
      <p className="text-gray-400 font-body_m">소품샵을 검색하거나 필터를 선택해 보세요.</p>
    </div>
  )
}
