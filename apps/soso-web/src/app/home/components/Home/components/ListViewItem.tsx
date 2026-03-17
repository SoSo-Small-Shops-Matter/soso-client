import { ShopType } from '@/shared/types/shopType'
import Flex from '@/shared/components/layout/Flex'
import Image from 'next/image'
import Link from 'next/link'
import { handleImageError } from '@/shared/utils/handleImageError'
import { getDistance } from '@/shared/utils/getDistance'
import RoadFindButton from '@/shared/components/button/RoadFindButton'
import { applefindUrl, kakaoFindUrl, naverFindUrl } from '@/shared/utils/findShop'

interface ListViewItemProps {
  shop: ShopType
  currentLat: number | null
  currentLng: number | null
  onClick: (lat: number, lng: number, id: number) => void
}

export default function ListViewItem({ shop, currentLat, currentLng, onClick }: ListViewItemProps) {
  return (
    <Link
      href={`/shop/${shop.id}`}
      onClick={() => onClick(shop.lat, shop.lng, shop.id)}
      className="overflow-hidden bg-white"
    >
      <Flex align="center" className="border-b border-gray-100 px-18 py-16">
        <div className="relative h-72 min-w-72 overflow-hidden rounded-8">
          <Image
            src={shop.mainImage || '/images/default_item.svg'}
            style={{ objectFit: 'cover' }}
            fill
            alt=""
            onError={handleImageError}
          />
        </div>

        <Flex className="flex-1 overflow-x-hidden" align="center">
          <div className="flex flex-1 flex-col overflow-x-hidden px-8">
            <h4 className="mb-6 overflow-hidden text-ellipsis whitespace-nowrap font-title4_semi">{shop.name}</h4>
            <p className="text-gray-400 font-body1_m">
              {currentLat === 0 ? '-' : getDistance(Number(currentLat), Number(currentLng), shop.lat, shop.lng)}
            </p>
          </div>
          <RoadFindButton
            naverUrl={naverFindUrl(shop.name, shop.lat, shop.lng)}
            kakaoUrl={kakaoFindUrl(shop.name, shop.lat, shop.lng)}
            appleUrl={applefindUrl(shop.lat, shop.lng)}
          />
        </Flex>
      </Flex>
    </Link>
  )
}
