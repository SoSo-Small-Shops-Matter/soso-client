import MapIcon from '@/shared/components/icons/MapIcon'
import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface MapViewButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export default function MapViewButton({ className, ...props }: MapViewButtonProps) {
  return (
    <button
      className={clsx(
        'flex h-40 w-40 items-center justify-center overflow-visible rounded-full bg-white shadow-button hover:bg-gray-50',
        className
      )}
      {...props}
    >
      <MapIcon width={'24'} height={'24'} />
    </button>
  )
}
