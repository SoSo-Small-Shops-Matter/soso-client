import ListIcon from '@/shared/components/icons/ListIcon'
import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface ListViewButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  totalShopCount: number
}

export default function ListViewButton({ className, totalShopCount, ...props }: ListViewButtonProps) {
  return (
    <button
      className={clsx(
        'flex h-40 w-40 items-center justify-center overflow-visible rounded-full bg-white shadow-button hover:bg-gray-50',
        className
      )}
      {...props}
    >
      <ListIcon fill={'#72787f'} width={'24'} height={'24'} />
    </button>
  )
}
