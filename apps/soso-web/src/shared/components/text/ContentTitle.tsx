import clsx from 'clsx'

interface ContentTitleProps {
  title: string
  className?: string
}

export default function ContentTitle({ title, className }: ContentTitleProps) {
  return <h3 className={clsx('text-gray-800 font-title4_semi', className)}>{title}</h3>
}
