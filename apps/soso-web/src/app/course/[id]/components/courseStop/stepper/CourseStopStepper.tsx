import type { CourseStopDto, SharedCourseDto, SharedStopDto } from '@/shared/api/course/types'

import { CourseStopStep } from './CourseStopStep'
import { getStopShopId } from '../../../../utils/stopUtils'

interface Props {
  stops: CourseStopDto[] | SharedStopDto[]
  onSelect: (index: number) => void
  stampedIds?: Set<number>
  selectedStopIndex?: number | null
}

export function CourseStopStepper({ stops, onSelect, stampedIds, selectedStopIndex }: Props) {
  return (
    <div className="py-16">
      <div className="no-scrollbar overflow-x-auto px-16">
        <div className="relative flex min-w-full items-start">
          <div className="absolute left-[30px] right-0 top-[16px] h-1 bg-gray-100" />
          {stops.map((stop, index) => {
            const shopId = getStopShopId(stop)
            return (
              <CourseStopStep
                key={shopId}
                stop={stop}
                index={index}
                isFirst={index === 0}
                isVisited={stampedIds?.has(shopId)}
                isSelected={selectedStopIndex === index}
                onSelect={onSelect}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
