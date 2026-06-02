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
      <div className="font-body-m flex flex-col items-center justify-center gap-1 pt-80 text-gray-500">
        <p>아직 추가한 코스가 없어요</p>
        <p>나만의 소품샵 코스를 만들어보세요!</p>
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
