export default function ShopListItemSkeleton() {
  return (
    <div className="w-full border-b border-gray-100 px-20 py-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="h-56 w-56 flex-shrink-0 rounded-8 bg-gray-100 animate-pulse" />
          <div className="h-16 w-80 rounded-8 bg-gray-100 animate-pulse" />
        </div>
        <div className="h-20 w-20 rounded-4 bg-gray-100 animate-pulse" />
      </div>
    </div>
  )
}
