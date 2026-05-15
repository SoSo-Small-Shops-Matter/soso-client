import clsx from 'clsx'

export type FilterType = 'wish' | 'recommend'

interface ShopSelectTabsProps {
  activeTab: FilterType | null
  onTabChange: (tab: FilterType) => void
}

export default function ShopSelectTabs({ activeTab, onTabChange }: ShopSelectTabsProps) {
  return (
    <div className="flex gap-8 px-20 py-10">
      <button
        type="button"
        onClick={() => onTabChange('wish')}
        className={clsx(
          'flex items-center gap-4 rounded-full px-14 py-7 font-body_s transition-colors',
          activeTab === 'wish'
            ? 'bg-main text-white'
            : 'border border-gray-200 bg-white text-gray-500'
        )}
      >
        {activeTab === 'wish' && <span>♥</span>}
        <span>찜</span>
      </button>
      <button
        type="button"
        onClick={() => onTabChange('recommend')}
        className={clsx(
          'flex items-center gap-4 rounded-full px-14 py-7 font-body_s transition-colors',
          activeTab === 'recommend'
            ? 'bg-main text-white'
            : 'border border-gray-200 bg-white text-gray-500'
        )}
      >
        <span>추천</span>
      </button>
    </div>
  )
}
