export default function MyWishShopListSkeleton() {
  return (
    <div className="flex h-[100px] w-full gap-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex w-[72px] flex-shrink-0 flex-col gap-6">
            <div className="h-[72px] w-[72px] animate-pulse rounded-12 bg-gray-100" />
            <div className="h-[12px] animate-pulse rounded-4 bg-gray-100" />
          </div>
        ))}
    </div>
  )
}
