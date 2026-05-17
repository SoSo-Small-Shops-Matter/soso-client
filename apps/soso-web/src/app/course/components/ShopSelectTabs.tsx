import Chip from '@/shared/components/button/Chip'
import WishIcon from '@/shared/components/icons/WishIcon'

export type FilterType = 'wish' | 'recommend'

interface ShopSelectTabsProps {
  activeTab: FilterType | null
  onTabChange: (tab: FilterType) => void
}

export default function ShopSelectTabs({ activeTab, onTabChange }: ShopSelectTabsProps) {
  return (
    <div className="flex gap-8 px-20 py-10">
      <Chip
        label="찜"
        isActive={activeTab === 'wish'}
        leftIcon={
          <WishIcon
            width="16"
            height="16"
            isActive={activeTab === 'wish'}
            fill={activeTab === 'wish' ? 'var(--main-color)' : 'var(--gray-900)'}
          />
        }
        onClick={() => onTabChange('wish')}
      />
      <Chip label="추천" isActive={activeTab === 'recommend'} onClick={() => onTabChange('recommend')} />
    </div>
  )
}
