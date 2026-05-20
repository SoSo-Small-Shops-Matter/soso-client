export default function MyShopSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="relative w-full">
          <div className="flex w-full items-center justify-between border-b border-gray-100 px-16 py-18">
            <div className="flex items-center gap-12">
              <div className="h-48 w-48 flex-shrink-0 animate-pulse rounded-12 bg-gray-100" />
              <div className="flex flex-col gap-4">
                <div className="h-16 w-80 animate-pulse rounded-8 bg-gray-100" />
                <div className="h-12 w-56 animate-pulse rounded-8 bg-gray-100" />
              </div>
            </div>
          </div>
          <div className="absolute right-16 top-1/2 flex -translate-y-1/2 flex-col gap-8">
            <div className="h-34 w-86 animate-pulse rounded-8 bg-gray-100" />
            <div className="h-26 w-86 animate-pulse rounded-8 bg-gray-100" />
          </div>
        </div>
      ))}
    </>
  )
}
