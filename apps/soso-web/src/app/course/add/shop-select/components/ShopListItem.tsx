import clsx from 'clsx'
import Image from 'next/image'
import CheckBoxIcon from '@/shared/components/icons/CheckBoxIcon'
import { handleImageError } from '@/shared/utils/handleImageError'

export interface ShopListItemProps {
  id: number
  name: string
  location?: string
  mainImage: string | null
  selected: boolean
  order: number
  disabled: boolean
  onToggle: () => void
}

export default function ShopListItem({
  name,
  location,
  mainImage,
  selected,
  order,
  disabled,
  onToggle,
}: ShopListItemProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={clsx(
        'w-full border-b border-gray-100 px-20 py-16 transition-colors',
        disabled && 'opacity-40'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* 썸네일 + 순서 번호 */}
          <div className="relative h-56 w-56 flex-shrink-0 overflow-hidden rounded-8">
            <Image
              src={mainImage || '/images/default_item.svg'}
              fill
              style={{ objectFit: 'cover' }}
              alt={name}
              onError={handleImageError}
              unoptimized
            />
            {selected && (
              <div className="absolute left-4 top-4 flex h-18 w-18 items-center justify-center rounded-full bg-main">
                <span
                  className="text-white"
                  style={{ fontSize: '10px', fontWeight: 700, lineHeight: 1 }}
                >
                  {order}
                </span>
              </div>
            )}
          </div>
          {/* 이름 + 위치 */}
          <div className="flex flex-col gap-4">
            <span className="text-left font-subtitle_l">{name}</span>
            {location && (
              <span className="text-left text-gray-400 font-caption">{location}</span>
            )}
          </div>
        </div>
        {/* 체크박스 */}
        <div className="flex-shrink-0">
          <CheckBoxIcon checked={selected} width="24" height="24" />
        </div>
      </div>
    </button>
  )
}
