import Flex from '@/shared/components/layout/Flex'
import ProductImage from '@/shared/components/ui/ProductImage'
import clsx from 'clsx'

interface ShopInfoProps {
  name: string
  date: string
  imgUrl?: string
  disabled?: boolean
}

export default function ShopInfo({ name, date, imgUrl, disabled }: ShopInfoProps) {
  return (
    <Flex align="center" gap={12}>
      <ProductImage size={48} imgUrl={!disabled ? imgUrl : '/images/confirm.png'} />
      <Flex direction="col" gap={4}>
        <h3 className={clsx('font-subtitle_m text-gray-900', disabled && 'text-gray-400')}>{name}</h3>
        <p className={clsx('text-gray-400 font-caption', disabled && 'text-gray-200')}>{date}</p>
      </Flex>
    </Flex>
  )
}
