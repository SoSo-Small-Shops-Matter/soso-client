export default function CourseCardSkeleton() {
  return (
    <>
      <div className="flex items-center gap-14 px-20 py-16">
        {/* 썸네일 skeleton */}
        <div className="w-52 h-52 rounded-12 bg-gray-100 flex-shrink-0 animate-pulse" />

        {/* 텍스트 skeleton */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <div className="h-16 w-3/5 rounded-8 bg-gray-100 animate-pulse" />
          <div className="h-12 w-2/5 rounded-8 bg-gray-100 animate-pulse" />
        </div>

        {/* 진행도 skeleton */}
        <div className="flex flex-col items-end gap-6 flex-shrink-0">
          <div className="h-16 w-10 rounded-8 bg-gray-100 animate-pulse" />
          <div className="h-12 w-10 rounded-8 bg-gray-100 animate-pulse" />
        </div>
      </div>
      <div className="h-[1px] bg-gray-100 mx-20" />
    </>
  )
}
