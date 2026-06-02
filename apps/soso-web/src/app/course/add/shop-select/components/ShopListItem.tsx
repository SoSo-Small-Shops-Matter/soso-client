import clsx from 'clsx'
import Image from 'next/image'
import CheckBoxIcon from '@/shared/components/icons/CheckBoxIcon'
import { handleImageError } from '@/shared/utils/handleImageError'

export interface ShopListItemProps {
  id: number
  name: string
  mainImage: string | null
  selected: boolean
  disabled: boolean
  onToggle: () => void
}

export default function ShopListItem({ name, mainImage, selected, disabled, onToggle }: ShopListItemProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={clsx('w-full border-b border-gray-50 px-20 py-16 transition-colors', disabled && 'opacity-40')}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* 썸네일 + 순서 번호 */}
          <div className="relative h-56 w-56 flex-shrink-0 overflow-hidden rounded-8 border border-gray-100">
            <Image
              src={mainImage || '/images/default_item.svg'}
              fill
              style={{ objectFit: 'cover' }}
              alt={name}
              onError={handleImageError}
            />
          </div>
          {/* 이름 */}
          <div className="flex flex-col gap-4">
            <span className="text-left font-subtitle_l">{name}</span>
          </div>
        </div>
        {/* 체크박스 */}
        <CheckBoxIcon width="24" height="24" checked={selected} />
      </div>
    </button>
  )
}
