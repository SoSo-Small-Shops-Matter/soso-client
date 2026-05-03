import type { CourseStopDto } from '@/shared/api/course/types'
import CheckBoxIcon from '@/shared/components/icons/CheckBoxIcon'

interface Props {
  stop: CourseStopDto
  index: number
  isLast: boolean
  isVisited?: boolean
  isSelected?: boolean
  nextIsVisited?: boolean
  onSelect: (index: number) => void
}

export function CourseStopStep({ stop, index, isLast, isVisited, isSelected, nextIsVisited, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      className="flex w-[60px] flex-shrink-0 flex-col items-center gap-8"
    >
      <div className="relative flex h-32 w-full items-center justify-center">
        {!isLast && (
          <div
            className={`absolute left-1/2 top-1/2 h-0.5 h-1 w-full -translate-y-1/2 ${
              isVisited && nextIsVisited ? 'bg-[#FF7F50]' : 'bg-[#C9CDD2]'
            }`}
          />
        )}
        {isVisited ? (
          <div className="absolute z-10">
            <CheckBoxIcon checked={true} width="28" height="28" />
          </div>
        ) : (
          <div
            className={`absolute z-10 flex h-[28] w-[28] items-center justify-center rounded-full text-xs font-medium text-white ${isSelected ? 'bg-orange-500' : 'bg-gray-100'}`}
          >
            {index + 1}
          </div>
        )}
      </div>
      <span
        className={`w-full max-w-[51px] truncate text-center text-xs leading-tight transition-colors ${
          isVisited ? 'font-medium text-main' : isSelected ? 'text-orange-500' : 'text-gray-400'
        }`}
      >
        {stop.shop.name}
      </span>
    </button>
  )
}
