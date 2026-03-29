'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface PageLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  link?: string
  title: string
  icon?: ReactNode
  className?: string
  onClick?: () => void
}
export default function LinkButton({ link, title, icon, onClick, className, ...props }: PageLinkProps) {
  const router = useRouter()

  const handleClick = () => {
    if (link) {
      router.push(link)
    }

    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={clsx('flex w-full items-center justify-between p-16', className)}
      {...props}
    >
      <span className="text-gray-800 font-body1_m">{title}</span>
      {icon && icon}
    </button>
  )
}
