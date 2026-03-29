'use client'

import { useGetMyReviewQuery } from '@/shared/api/my/queries'
import MyReview from '@/app/my/review/components/MyReview'
import Divider from '@/shared/components/divider/Divider'
import Flex from '@/shared/components/layout/Flex'
import Header from '@/shared/components/layout/Header'
import Loading from '@/shared/components/loading/Loading'
import { useInView } from 'react-intersection-observer'
import clsx from 'clsx'
import { MouseEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MyReviewPage() {
  const router = useRouter()

  const [isLatest, setIsLatest] = useState(true)

  const {
    data: myReviewData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetMyReviewQuery(10, isLatest ? 'DESC' : 'ASC')

  const { ref, inView } = useInView({
    threshold: 0.2,
  })

  const handleClickFilter = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    if (!target) return
    const name = target.name

    if (name === 'latest') {
      setIsLatest(true)
      return
    }

    if (name === 'old') {
      setIsLatest(false)
    }
  }

  // inView 상태가 변경될 때 다음 페이지 데이터 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading])

  // 모든 페이지의 데이터를 하나의 배열로 펼치기
  const allReviews = myReviewData?.pages.flatMap((page) => page.data) || []

  return (
    <div>
      <Header title="나의 후기" type="back" />
      <Flex direction="col" className="w-full">
        <Flex justify="end" align="center" gap={8} className="w-full px-16">
          <button
            onClick={handleClickFilter}
            name="latest"
            className={clsx('font-body2_m', isLatest ? 'text-main' : 'text-gray-400')}
          >
            최신순
          </button>
          <Divider width="1px" height="11px" bgColor="#9EA4AA" />
          <button
            onClick={handleClickFilter}
            name="old"
            className={clsx('font-body2_m', isLatest ? 'text-gray400' : 'text-main')}
          >
            오래된 순
          </button>
        </Flex>
        <Flex direction="col" className="w-full">
          {allReviews.map((review, index) => (
            <div
              key={review.id || index}
              className="group w-full cursor-pointer border-b-[10px] border-gray-50 py-20 last:border-none"
              onClick={() => router.push(`/shop/${review.shop.id}/review`)}
            >
              <MyReview data={review} />
            </div>
          ))}

          {!isLoading && <div ref={ref} className="h-40" />}

          {isLoading && <Loading />}

          {myReviewData && allReviews.length === 0 && (
            <Flex direction="col" justify="center" align="center" className="mt-90 w-full" gap={16}>
              <p className="text-center text-gray-400 font-body1_m">
                아직 후기가 없어요.
                <br />
                소소하게 써주신 한 줄이 큰 도움이 돼요!
              </p>
            </Flex>
          )}
        </Flex>
      </Flex>
    </div>
  )
}
