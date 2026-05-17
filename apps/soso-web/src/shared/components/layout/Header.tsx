'use client'

import BackIcon from '@/shared/components/icons/BackIcon'
import XIcon from '@/shared/components/icons/XIcon'
import Flex from '@/shared/components/layout/Flex'
import useBack from '@/shared/hooks/useBack'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface HeaderProps {
  type?: 'close' | 'back'
  title?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  top?: string
}

export default function Header({ type, title, leftIcon, rightIcon, top }: HeaderProps) {
  const { handleBack } = useBack()
  const pathname = usePathname()

  return (
    <div
      style={{
        top: top || '0',
      }}
      className={`fixed left-0 top-0 z-sticky h-56 w-full px-20 layout-center ${pathname === '/' ? 'bg-transparent' : 'bg-white'}`}
    >
      <Flex justify="between" align="center" className="relative h-full w-full">
        <div>{leftIcon ?? <DefaultLeftIcon type={type} handleBack={handleBack} />}</div>
        <h2 className="min-w-[200px] text-center font-subtitle_l position-center">{title}</h2>
        <div>{rightIcon ?? <div className="w-24" />}</div>
      </Flex>
    </div>
  )
}

const DefaultLeftIcon = ({ type, handleBack }: { type?: string; handleBack: () => void }) => {
  if (type === 'close')
    return (
      <button type="button" onClick={handleBack}>
        <XIcon />
      </button>
    )
  return (
    <button type="button" onClick={handleBack}>
      <BackIcon />
    </button>
  )
}
