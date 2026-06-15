import clsx from 'clsx'
import CheckIcon from '../icons/CheckIcon'

type ControlSize = 'default' | 's'
type ControlState = 'checked' | 'unchecked' | 'none'

interface ControlProps {
  label: string
  checked: boolean | 'none'
  size?: ControlSize
  onClick?: () => void
  className?: string
}

const sizeConfig = {
  default: { container: 24, circle: 20, icon: 16 },
  s: { container: 20, circle: 18, icon: 14 },
} as const

const circleStyles: Record<ControlState, string> = {
  checked: 'bg-main border-main',
  unchecked: 'bg-gray-100 border-gray-100',
  none: 'bg-white border-gray-300',
}

//TODO: CheckboxIcon 사용하는 곳 찾아서 Control component로 교체
export default function Control({ size = 'default', checked, onClick, className }: ControlProps) {
  const { container, circle, icon } = sizeConfig[size]
  const state: ControlState = checked === 'none' ? 'none' : checked ? 'checked' : 'unchecked'

  return (
    <div
      role="checkbox"
      aria-checked={checked === 'none' ? false : checked}
      onClick={onClick}
      className={clsx('flex cursor-pointer items-center justify-center p-2', container, className)}
    >
      <div
        className={clsx(
          'flex items-center justify-center rounded-full border-[1.5px] border-solid',
          circleStyles[state]
        )}
        style={{ width: circle, height: circle }}
      >
        {state !== 'none' && <CheckIcon width={`${icon}`} height={`${icon}`} fill="white" />}
      </div>
    </div>
  )
}
