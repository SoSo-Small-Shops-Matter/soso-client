import { SelectedShop } from '@/shared/store/useCourseAddStore'
import { handleImageError } from '@/shared/utils/handleImageError'
import Image from 'next/image'

interface ShopPreviewCardProps {
  shop: SelectedShop
  index: number
  onNavigate: () => void
}

export default function ShopPreviewCard({ shop, index, onNavigate }: ShopPreviewCardProps) {
  return (
    <div className="mx-4 flex items-center gap-12 rounded-16 bg-white p-16 shadow-lg">
      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-white font-caption">
        {index + 1}
      </div>
      <div className="relative h-56 w-56 flex-shrink-0 overflow-hidden rounded-8">
        <Image
          src={shop.mainImage || '/images/default_item.svg'}
          fill
          style={{ objectFit: 'cover' }}
          alt={shop.name}
          onError={handleImageError}
          unoptimized
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <span className="font-subtitle_l truncate">{shop.name}</span>
        <button type="button" onClick={onNavigate} className="w-fit text-left text-main font-caption">
          상세보기
        </button>
      </div>
    </div>
  )
}
