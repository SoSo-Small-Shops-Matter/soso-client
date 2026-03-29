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
      <ProductImage imgUrl={!disabled ? imgUrl : '/images/confirm.png'} />
      <Flex direction="col" gap={4}>
        <h3 className={clsx('text-black font-title4_semi', disabled && 'text-gray-400')}>{name}</h3>
        <p className={clsx('text-gray-400 font-caption', disabled && 'text-gray-200')}>{date}</p>
      </Flex>
    </Flex>
  )
}
