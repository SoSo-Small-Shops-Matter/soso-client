import Flex from '@/shared/components/layout/Flex'
import clsx from 'clsx'
import { ReactNode } from 'react'

interface InputContentProps {
  label: string
  className?: string
  children: ReactNode
}

export default function InputContent({ label, className, children }: InputContentProps) {
  return (
    <Flex direction="col" gap={8} className="w-full">
      <h5 className={clsx('text-gray-500 font-body1_m', className)}>{label}</h5>
      {children}
    </Flex>
  )
}
