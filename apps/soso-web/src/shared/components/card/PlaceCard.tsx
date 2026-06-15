import RoadFindButton from '@/shared/components/button/RoadFindButton'
import Flex from '@/shared/components/layout/Flex'
import { useLocationStore } from '@/shared/store/useLocationStore'
import { ShopType } from '@/shared/types/shopType'
import { applefindUrl, kakaoFindUrl, naverFindUrl } from '@/shared/utils/findShop'
import { formatDistance } from '@/shared/utils/formatDistance'
import { handleImageError } from '@/shared/utils/handleImageError'
import Image from 'next/image'
import Link from 'next/link'

interface PlaceCardProps {
  width?: string
  height?: string
  type?: 'default' | 'map'
  data: Pick<ShopType, 'id' | 'name' | 'mainImage' | 'lat' | 'lng' | 'distance'>
}
export default function PlaceCard({ width, height, type, data }: PlaceCardProps) {
  const { setPrevShop } = useLocationStore()

  const handleSavePrevLocation = (lat: number, lng: number, id: number) => {
    setPrevShop({ id, lat, lng })
  }

  return type === 'map' ? (
    <Link
      href={`/shop/${data.id}`}
      onClick={() => handleSavePrevLocation(data.lat, data.lng, data.id)}
      style={{
        width: width || '327px',
        height: height || 'auto',
      }}
      className="overflow-hidden bg-white"
    >
      <Flex className="relative h-full w-full rounded-16 bg-white px-18 py-16" align="end" justify="between">
        <Flex align="center" gap={12} className="w-full">
          <div className="relative h-64 min-w-64 overflow-hidden rounded-8">
            <Image
              src={data?.mainImage || '/images/default_item.svg'}
              style={{ objectFit: 'cover' }}
              fill
              alt=""
              onError={handleImageError}
            />
          </div>
          <Flex direction="col" gap={8} className="min-w-0 flex-1">
            <h4 className="block w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-subtitle_l">
              {data.name}
            </h4>
            <p className="text-gray-400 font-body_m">{formatDistance(data?.distance)}</p>
          </Flex>
        </Flex>
        <div className="absolute bottom-16 right-18">
          <RoadFindButton
            naverUrl={naverFindUrl(data.name, data.lat, data.lng)}
            kakaoUrl={kakaoFindUrl(data.name, data.lat, data.lng)}
            appleUrl={applefindUrl(data.lat, data.lng)}
          />
        </div>
      </Flex>
    </Link>
  ) : (
    <Link
      href={`/shop/${data.id}`}
      onClick={() => handleSavePrevLocation(data.lat, data.lng, data.id)}
      style={{
        width: width || '100%',
        height: height || 'auto',
      }}
      className="overflow-hidden bg-white"
    >
      <Flex className="h-full w-full rounded-16 bg-white px-18 py-16" align="center" justify="between">
        <Flex align="center" gap={12}>
          <div className="relative h-72 w-72 overflow-hidden rounded-8">
            <Image
              src={data?.mainImage || '/images/default_item.svg'}
              style={{ objectFit: 'cover' }}
              fill
              alt=""
              onError={handleImageError}
            />
          </div>
          <Flex direction="col" gap={8}>
            <h4 className="font-subtitle_l">{data.name}</h4>
            <p className="text-gray-400 font-body_m">{formatDistance(data?.distance)}</p>
          </Flex>
        </Flex>
        <RoadFindButton
          naverUrl={naverFindUrl(data.name, data.lat, data.lng)}
          kakaoUrl={kakaoFindUrl(data.name, data.lat, data.lng)}
          appleUrl={applefindUrl(data.lat, data.lng)}
        />
      </Flex>
    </Link>
  )
}
