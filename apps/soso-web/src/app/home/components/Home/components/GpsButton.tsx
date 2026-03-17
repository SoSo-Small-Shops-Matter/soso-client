import GpsIcon from '@/shared/components/icons/GpsIcon'
import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface GpsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export default function GpsButton({ className, ...props }: GpsButtonProps) {
  return (
    <button
      className={clsx(
        'flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-button hover:bg-gray-50',
        className
      )}
      {...props}
    >
      <GpsIcon />
    </button>
  )
}
