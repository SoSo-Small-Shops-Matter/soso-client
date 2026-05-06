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
    <div className="[box-shadow: 0px 5px 6px 3px rgba(0, 0, 0, 0.08)] rounded-b-xl bg-white px-16 py-16">
      <div className="no-scrollbar overflow-x-auto">
        <div className="flex w-max items-start">
          {stops.map((stop, index) => {
            const shopId = getStopShopId(stop)
            return (
              <CourseStopStep
                key={shopId}
                stop={stop}
                index={index}
                isLast={index === stops.length - 1}
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
