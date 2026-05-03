import type { CourseStopDto } from '@/shared/api/course/types'
import { CourseStopStep } from './CourseStopStep'

interface Props {
  stops: CourseStopDto[]
  onSelect: (index: number) => void
  stampedIds?: Set<number>
  selectedStopIndex?: number | null
}

export function CourseStopStepper({ stops, onSelect, stampedIds, selectedStopIndex }: Props) {
  return (
    <div className="[box-shadow: 0px 5px 6px 3px rgba(0, 0, 0, 0.08)] rounded-b-xl bg-white px-16 py-16">
      <div className="no-scrollbar overflow-x-auto">
        <div className="flex w-max items-start">
          {stops.map((stop, index) => (
            <CourseStopStep
              key={stop.shopId}
              stop={stop}
              index={index}
              isLast={index === stops.length - 1}
              isVisited={stampedIds?.has(stop.shopId)}
              isSelected={selectedStopIndex === index}
              nextIsVisited={stampedIds?.has(stops[index + 1]?.shopId)}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
