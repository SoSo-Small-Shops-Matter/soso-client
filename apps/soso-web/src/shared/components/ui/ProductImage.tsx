import { handleImageError } from '@/shared/utils/handleImageError'
import clsx from 'clsx'
import Image from 'next/image'

interface ProductImageProps {
  imgUrl?: string
  size?: number
  className?: string
}
export default function ProductImage({ imgUrl, size, className }: ProductImageProps) {
  return (
    <div style={{ width: size || '72px', height: size || '72px' }} className="relative">
      <Image
        fill
        style={{ objectFit: 'cover' }}
        src={imgUrl || '/images/default_item.svg'}
        className={clsx('rounded-12', className)}
        alt="프로덕트 이미지"
        onError={handleImageError}
      />
    </div>
  )
}
