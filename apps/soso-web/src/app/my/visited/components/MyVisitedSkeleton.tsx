export default function MyVisitedSkeleton() {
  return (
    <div className="grid w-full grid-cols-3 gap-11">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="flex w-full flex-col items-start gap-8">
          <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-100" />
          <div className="h-12 w-4/5 animate-pulse rounded-8 bg-gray-100" />
        </div>
      ))}
    </div>
  )
}
