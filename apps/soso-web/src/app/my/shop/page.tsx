'use client'

import { useGetMyShopQuery } from '@/shared/api/my/queries'
import Flex from '@/shared/components/layout/Flex'
import Header from '@/shared/components/layout/Header'
import ShopInfo from '@/shared/components/ui/ShopInfo'
import MyShopSkeleton from './components/MyShopSkeleton'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDialog } from '@/shared/context/DialogContext'
import { useDeleteSubmitShopMutation } from '@/shared/api/my/queries'
import MyShopStatusBadge from './components/MyShopStatusBadge'
import { getFormatDateString } from '@repo/utils/formatDateString'
import { SUBMISSION_TYPE } from '@/shared/api/my/types'

export default function MyShopPage() {
  const router = useRouter()

  const { openDialog, closeDialog } = useDialog()

  // useInfiniteQuery로 변경된 훅 사용
  const { data: myShopData, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetMyShopQuery(10)
  const { mutate: deleteSubmitShopMutate } = useDeleteSubmitShopMutation()

  // 무한 스크롤을 위한 InView 설정
  const { ref, inView } = useInView({
    threshold: 0.2,
  })

  // 숍 상세 페이지로 이동하는 함수
  const handleLink = (shopId: number) => {
    router.push(`/shop/${shopId}`)
  }

  const handleDeleteShop = (shopId: number) => {
    deleteSubmitShopMutate(shopId)
    closeDialog()
  }

  const handleOpenDeleteModal = (shopId: number) => {
    openDialog({
      type: 'confirm',
      title: '등록한 정보를 삭제하시겠습니까?',
      onConfirm: () => handleDeleteShop(shopId),
    })
  }

  // inView 상태가 변경될 때 다음 페이지 데이터 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading])

  // 모든 페이지의 데이터를 하나의 배열로 펼치기
  const allShops = myShopData?.pages.flatMap((page) => page.data) || []

  return (
    <div>
      <Header title="내가 알린 소품샵" type="back" />
      <Flex direction="col" className="w-full">
        {allShops.map((data, index) => (
          <div key={`shop-${data?.id}-${index}`} className="relative w-full">
            <button
              onClick={() => handleLink(data?.shop.id)}
              disabled={data?.type === SUBMISSION_TYPE.NEW_SHOP}
              className="flex w-full items-center justify-between border-b border-gray-100 px-16 py-18"
            >
              <ShopInfo
                name={data.shop.name}
                date={getFormatDateString(data?.createdAt, 'yyyy.MM.dd')}
                disabled={data?.type === SUBMISSION_TYPE.NEW_SHOP}
                imgUrl={data?.shop.mainImage || ''}
              />
            </button>
            <Flex direction="col" gap={8} className="absolute right-16 top-1/2 -translate-y-1/2">
              <MyShopStatusBadge submitStatus={data.submitStatus} />
              <button
                onClick={() => handleOpenDeleteModal(data.id)}
                className="h-26 w-86 rounded-8 border border-gray-100 text-gray-500 font-caption"
              >
                삭제
              </button>
            </Flex>
          </div>
        ))}

        {/* 무한 스크롤을 위한 관찰 요소 */}
        {!isLoading && <div ref={ref} className="h-40" />}

        {/* 로딩 상태 표시 */}
        {isLoading && <MyShopSkeleton />}

        {/* 데이터가 없을 때 표시할 내용 */}
        {myShopData && allShops.length === 0 && (
          <Flex direction="col" justify="center" align="center" className="mt-90 w-full" gap={16}>
            <p className="text-center text-gray-400 font-body_m">
              아직 내가 알린 소품샵이 없어요. <br />
              새로운 소품샵을 소소에 알려주세요!
            </p>
          </Flex>
        )}
      </Flex>
    </div>
  )
}
