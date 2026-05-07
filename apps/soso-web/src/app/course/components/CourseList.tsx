import type { CourseListItemDto } from '@/shared/api/course/types'
import CourseCard from './CourseCard'
import CourseCardSkeleton from './CourseCardSkeleton'

interface CourseListProps {
  items: CourseListItemDto[]
  isLoading: boolean
}

export default function CourseList({ items, isLoading }: CourseListProps) {
  if (isLoading) {
    return (
      <div className="mt-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-10 py-80">
        <p className="text-gray-400 font-body_s">아직 코스가 없어요</p>
        <p className="text-gray-300 font-caption">코스를 추가해 소품샵 탐방을 시작해보세요!</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      {items.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
