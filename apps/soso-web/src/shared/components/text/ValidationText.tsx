import Flex from '@/shared/components/layout/Flex'
import clsx from 'clsx'

interface ValidationTextProps {
  text: string
  isError?: boolean
}

export default function ValidationText({ text, isError }: ValidationTextProps) {
  return (
    <Flex align="center" gap={8}>
      <div className={clsx('h-[2.5px] w-[2.5px] rounded-full', isError ? 'bg-etc-red' : 'bg-gray-400')}></div>
      <p className={clsx('font-caption', isError ? 'text-etc-red' : 'text-gray-400')}>{text}</p>
    </Flex>
  )
}
