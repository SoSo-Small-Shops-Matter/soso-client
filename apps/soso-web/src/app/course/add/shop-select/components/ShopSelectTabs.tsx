import Chip from '@/shared/components/button/Chip'

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
        leftIcon={activeTab === 'wish' ? <span>♥</span> : undefined}
        onClick={() => onTabChange('wish')}
      />
      <Chip
        label="추천"
        isActive={activeTab === 'recommend'}
        onClick={() => onTabChange('recommend')}
      />
    </div>
  )
}
