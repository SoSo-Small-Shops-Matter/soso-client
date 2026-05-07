import Flex from '@/shared/components/layout/Flex'
import { PRODUCT_BY_ID, PRODUCT_MAP } from '@/shared/constant/Product'
import { ProductType } from '@/shared/types/shopType'
import clsx from 'clsx'
import Image from 'next/image'

interface SellProductProps {
  product: ProductType
  checkbox?: boolean
  isCheck?: boolean
  onClick?: (product: ProductType) => void
  isModal?: boolean
}

export default function SellProduct({ product, checkbox, isCheck, onClick: onClickParent, isModal }: SellProductProps) {
  const onClick = () => {
    onClickParent?.({ id: product.id, name: product.name })
  }

  return (
    <div
      onClick={onClick}
      className={clsx(checkbox && 'cursor-pointer', isModal ? 'w-[calc(25%-12px)]' : 'w-[calc(25%-6px)]')}
    >
      <Flex direction="col" gap={6} justify="center" align="center" className="h-full w-full">
        <Flex justify="center" align="center" className={clsx(`relative aspect-square w-full rounded-12 p-10`)}>
          {product.id === PRODUCT_MAP.proEtc.id ? (
            <Image
              src={`/images/product/${isCheck ? 'pro_etc_active' : 'pro_etc'}.svg`}
              fill
              style={{ objectFit: 'cover' }}
              alt="기타 판매상품 이미지"
            />
          ) : (
            <Image
              src={`/images/product/${PRODUCT_BY_ID[product.id].value}.svg`}
              fill
              style={{ objectFit: 'cover' }}
              alt={`${product.name} 이미지`}
            />
          )}
          <div
            style={{ zIndex: -1 }}
            className={clsx(
              'absolute h-full w-full rounded-12',
              isCheck ? 'border border-main bg-orange-light' : 'bg-gray-50'
            )}
          ></div>
        </Flex>
        <p className={clsx('font-body_s', isCheck ? 'text-main' : 'text-gray-500')}>{product.name}</p>
      </Flex>
    </div>
  )
}
