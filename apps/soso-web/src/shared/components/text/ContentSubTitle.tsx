import clsx from 'clsx'

interface ContentSubTitleProps {
  title: string
  className?: string
}

export default function ContentSubTitle({ title, className }: ContentSubTitleProps) {
  return <h4 className={clsx('text-gray-500 font-body2_m', className)}>{title}</h4>
}
