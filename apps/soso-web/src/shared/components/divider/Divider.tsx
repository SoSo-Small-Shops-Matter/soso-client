import clsx from 'clsx'

interface DividerProps {
  width?: string
  height?: string
  className?: string
  bgColor?: string
}

export default function Divider({ width, height, className, bgColor }: DividerProps) {
  return (
    <div
      style={{
        width: width ? width : '100%',
        height: height ? height : '2px',
        backgroundColor: bgColor ? bgColor : 'var(--gray-50)',
      }}
      className={clsx(className)}
    />
  )
}
