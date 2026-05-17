'use client'

import { useCourseEditStore } from '@/shared/store/useCourseEditStore'
import Button from '@/shared/components/button/Button'
import Chip from '@/shared/components/button/Chip'
import RefreshIcon from '@/shared/components/icons/RefreshIcon'
import XIcon from '@/shared/components/icons/XIcon'
import { useRouter } from 'next/navigation'

interface EditSelectedShopsBottomProps {
  courseId: number
  maxSelect: number
}

export default function EditSelectedShopsBottom({ courseId, maxSelect }: EditSelectedShopsBottomProps) {
  const router = useRouter()
  const { selectedShops, removeShop, clearShops } = useCourseEditStore()
  const isEmpty = selectedShops.length === 0

  const handleNext = () => {
    if (!isEmpty) router.push(`/course/${courseId}/edit`)
  }

  return (
    <div className="fixed bottom-0 left-0 w-full gap-6 bg-white px-16 py-8 layout-center">
      {!isEmpty && (
        <>
          <div className="flex flex-shrink-0 items-center justify-between">
            <span className="text-gray-400 font-caption">
              <span className="text-main">{selectedShops.length}</span>/{maxSelect}
            </span>
            <button type="button" onClick={clearShops} className="flex items-center gap-2 text-gray-400 font-caption">
              <RefreshIcon width="16" height="16" fill="#7E848C" />
              초기화
            </button>
          </div>
          <div className="w-full">
            <div className="flex flex-wrap gap-8">
              {selectedShops.map((shop) => (
                <Chip
                  key={shop.id}
                  label={shop.name}
                  rightIcon={<XIcon width="16" height="16" fill="var(--gray-400)" />}
                  onClick={() => removeShop(shop.id)}
                />
              ))}
            </div>
          </div>
        </>
      )}

      <div className="w-full py-10">
        <Button title="다음" onClick={handleNext} disabled={isEmpty} />
      </div>
    </div>
  )
}
