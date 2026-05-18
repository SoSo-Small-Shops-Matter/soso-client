export default function MyReviewSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="w-full border-b-[10px] border-gray-50 py-20 last:border-none">
          <div className="flex w-full flex-col gap-20 px-16">
            <div className="flex items-center gap-12">
              <div className="h-48 w-48 flex-shrink-0 animate-pulse rounded-12 bg-gray-100" />
              <div className="flex flex-col gap-4">
                <div className="h-16 w-80 animate-pulse rounded-8 bg-gray-100" />
                <div className="h-12 w-56 animate-pulse rounded-8 bg-gray-100" />
              </div>
            </div>

            <div className="relative w-full rounded-12 bg-gray-50 px-18 py-16">
              <svg
                className="absolute -top-11 left-17"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.40192 1.5C6.55662 -0.499998 9.44338 -0.499999 10.5981 1.5L14.9282 9C16.0829 11 14.6395 13.5 12.3301 13.5L3.66987 13.5C1.36047 13.5 -0.0829034 11 1.0718 9L5.40192 1.5Z"
                  fill="#F7F8F9"
                />
              </svg>
              <div className="flex flex-col gap-8">
                <div className="h-12 w-full animate-pulse rounded-8 bg-gray-100" />
                <div className="h-12 w-4/5 animate-pulse rounded-8 bg-gray-100" />
                <div className="h-12 w-3/5 animate-pulse rounded-8 bg-gray-100" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
