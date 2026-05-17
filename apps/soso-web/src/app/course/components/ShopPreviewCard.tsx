'use client'

import { handleImageError } from '@/shared/utils/handleImageError'
import Image from 'next/image'
import Link from 'next/link'
import { ShopCoord } from '@/app/course/hooks/useCourseShopMap'

interface ShopPreviewCardProps {
  shop: ShopCoord
  index: number
}

export default function ShopPreviewCard({ shop, index }: ShopPreviewCardProps) {
  return (
    <Link href={`/shop/${shop.id}`}>
      <div className="mx-4 flex items-center gap-12 rounded-16 bg-white px-18 py-16 shadow-lg">
        <div className="relative h-56 w-56 flex-shrink-0 overflow-hidden rounded-8">
          <Image
            src={shop.mainImage || '/images/default_item.svg'}
            fill
            style={{ objectFit: 'cover' }}
            alt={shop.name}
            onError={handleImageError}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <span className="truncate font-subtitle_l">{shop.name}</span>
        </div>
        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 font-bold text-gray-400 font-caption">
          {index + 1}
        </div>
      </div>
    </Link>
  )
}
