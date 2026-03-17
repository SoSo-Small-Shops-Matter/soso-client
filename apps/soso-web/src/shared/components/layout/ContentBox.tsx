import Flex from '@/shared/components/layout/Flex'
import clsx from 'clsx'
import { ReactNode } from 'react'

interface ContentBoxProps {
  children: ReactNode
  gap?: number
  className?: string
}

export default function ContentBox({ children, gap, className }: ContentBoxProps) {
  return (
    <Flex direction="col" gap={gap || 8} className={clsx('w-full px-16 py-24', className)}>
      {children}
    </Flex>
  )
}
