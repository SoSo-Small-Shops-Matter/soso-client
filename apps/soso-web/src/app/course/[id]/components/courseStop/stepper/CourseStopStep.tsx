import type { CourseStopDto, SharedStopDto } from '@/shared/api/course/types'
import CheckBoxIcon from '@/shared/components/icons/CheckBoxIcon'

interface Props {
  stop: CourseStopDto | SharedStopDto
  index: number
  isFirst?: boolean
  isVisited?: boolean
  isSelected?: boolean
  onSelect: (index: number) => void
}

export function CourseStopStep({ stop, index, isVisited, isSelected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      className="flex w-[60px] flex-shrink-0 flex-col items-center gap-8"
    >
      <div className="relative flex h-32 w-full items-center justify-center">
        {isVisited ? (
          <div className="absolute z-10">
            <CheckBoxIcon checked={true} width="28" height="28" />
          </div>
        ) : (
          <div
            className={`absolute z-10 flex h-28 w-28 items-center justify-center rounded-full text-white font-caption ${isSelected ? 'bg-orange-500' : 'bg-gray-100'}`}
          >
            {index + 1}
          </div>
        )}
      </div>
      <span
        className={`w-full max-w-[51px] truncate text-center leading-tight transition-colors font-caption ${
          isVisited ? 'font-medium text-main' : isSelected ? 'text-orange-500' : 'text-gray-400'
        }`}
      >
        {stop.shop.name}
      </span>
    </button>
  )
}
