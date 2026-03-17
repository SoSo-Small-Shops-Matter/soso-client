import { ReactNode } from 'react'
import clsx from 'clsx'

interface FlexProps {
  children: ReactNode
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  gap?: number
  className?: string
}

export default function Flex({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = false,
  gap = 0,
  className,
}: FlexProps) {
  const flexClass = clsx(
    'flex',
    direction === 'col' ? 'flex-col' : 'flex-row',
    align === 'center' && 'items-center',
    align === 'start' && 'items-start',
    align === 'end' && 'items-end',
    align === 'stretch' && 'items-stretch',
    align === 'baseline' && 'items-baseline',
    justify === 'center' && 'justify-center',
    justify === 'start' && 'justify-start',
    justify === 'end' && 'justify-end',
    justify === 'between' && 'justify-between',
    justify === 'around' && 'justify-around',
    justify === 'evenly' && 'justify-evenly',
    wrap && 'flex-wrap',
    className
  )

  return (
    <div style={{ gap: `${gap}px` }} className={flexClass}>
      {children}
    </div>
  )
}
