'use client'

import { SelectedShop } from '@/shared/store/useCourseAddStore'
import Button from '@/shared/components/button/Button'
import RefreshIcon from '@/shared/components/icons/RefreshIcon'
import XIcon from '@/shared/components/icons/XIcon'
import { useRouter } from 'next/navigation'

interface SelectedShopsBottomProps {
  selectedShops: SelectedShop[]
  maxSelect: number
  onRemove: (shopId: number) => void
  onReset: () => void
}

export default function SelectedShopsBottom({ selectedShops, maxSelect, onRemove, onReset }: SelectedShopsBottomProps) {
  const router = useRouter()
  const isEmpty = selectedShops.length === 0

  const handleNext = () => {
    if (selectedShops.length > 0) router.push('/course/add/finalize')
  }

  return (
    <div className="fixed bottom-0 left-0 w-full gap-6 bg-white px-16 py-8 layout-center">
      {!isEmpty && (
        <>
          <div className="flex flex-shrink-0 items-center justify-between">
            <span className="text-gray-400 font-caption">
              <span className="text-main">{selectedShops.length}</span>/{maxSelect}
            </span>
            <button type="button" onClick={onReset} className="flex items-center gap-2 text-gray-400 font-caption">
              <RefreshIcon width="16" height="16" fill="#7E848C" />
              초기화
            </button>
          </div>
          <div className="w-full">
            <div className="flex flex-wrap gap-8">
              {selectedShops.map((shop) => (
                <button
                  key={shop.id}
                  type="button"
                  onClick={() => onRemove(shop.id)}
                  className="flex items-center gap-4 rounded-full bg-gray-50 px-12 py-6"
                >
                  <span className="text-gray-700 font-caption">{shop.name}</span>
                  <XIcon width="16" height="16" fill="#9EA4AA" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="w-full py-10">
        <Button title="다음" onClick={handleNext} disabled={selectedShops.length === 0} />
      </div>
    </div>
  )
}
