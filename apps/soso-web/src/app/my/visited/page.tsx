'use client'

import Header from '@/shared/components/layout/Header'
import Flex from '@/shared/components/layout/Flex'
import { useGetVisitedShopsQuery } from '@/shared/api/course/queries'
import { GetVisitedShopsResponse, VisitedShop } from '@/shared/api/course/types'
import MyVisitedSkeleton from './components/MyVisitedSkeleton'
import ArrowRightIcon from '@/shared/components/icons/ArrowRightIcon'
import Link from 'next/link'
import Image from 'next/image'
import { InfiniteData } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export default function MyVisitedPage() {
  const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetVisitedShopsQuery(10)

  if (!isLoading && (isError || !data)) {
    return (
      <div>
        <Header title="방문한 소품샵" type="back" />
        <Flex direction="col" justify="center" align="center" className="mt-[217px] w-full">
          <p className="text-center text-gray-400 font-body_m">방문한 소품샵 정보를 불러오는 중 오류가 발생했습니다.</p>
        </Flex>
      </div>
    )
  }

  if (!isLoading && !data?.pages.length) {
    return (
      <div>
        <Header title="방문한 소품샵" type="back" />
        <Flex direction="col" justify="center" align="center" className="mt-[217px] w-full" gap={2}>
          <span className="text-center text-gray-400 font-body_m">아직 방문한 소품샵이 없어요.</span>
          <span className="text-center text-gray-400 font-body_m">소품샵을 방문하고 도장깨기해보세요!</span>
        </Flex>
      </div>
    )
  }

  return (
    <MyVisitedContent
      paginatedVisitedShops={data!}
      fetchNextPage={fetchNextPage}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  )
}

function MyVisitedContent({
  paginatedVisitedShops,
  fetchNextPage,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
}: {
  paginatedVisitedShops: InfiniteData<GetVisitedShopsResponse>
  fetchNextPage: () => void
  isLoading: boolean
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
}) {
  const visitedShops = isLoading ? [] : paginatedVisitedShops.pages.flatMap((page) => page.items)

  const { ref, inView } = useInView({
    threshold: 0.2,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading])

  return (
    <div className="p-16">
      <Header title="방문한 소품샵" type="back" />
      <div className="mb-20 flex cursor-pointer justify-end gap-4">
        <span className="font-body-s text-gray-500">전체 지역</span>
        <ArrowRightIcon rotate={90} fill={'rgba(126, 132, 140, 1)'} />
      </div>
      {isLoading ? (
        <MyVisitedSkeleton />
      ) : (
        <>
          <div className="grid w-full grid-cols-3 gap-11">
            {visitedShops.map(({ shopId, mainImage, name }: VisitedShop) => (
              <Link key={shopId} href={`/shop/${shopId}`} className="flex w-full flex-col items-start gap-8">
                <div className="relative aspect-square w-full">
                  <Image
                    src={mainImage}
                    alt={name || '방문한 소품샵 이미지'}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <span className="max-w-[95%] truncate text-gray-500 font-body_m">{name}</span>
              </Link>
            ))}
          </div>
          <div ref={ref} className="h-40" />
        </>
      )}
    </div>
  )
}
