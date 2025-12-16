'use client'

import { useGetMyShopQuery } from '@/app/my/components/ProductLists/hooks/useGetMyShopQuery'
import Flex from '@/shared/components/layout/Flex'
import Header from '@/shared/components/layout/Header'
import Loading from '@/shared/components/loading/Loading'
import ShopInfo from '@/shared/components/ui/ShopInfo'
import { useInView } from 'react-intersection-observer'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDialog } from '@/shared/context/DialogContext'
import { useDeleteSubmitShopMutation } from '@/app/my/shop/hooks/useDeleteSubmitShopMutation'
import { formatStringDate } from '@/shared/utils/formatStringDate'

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

  const handleDeleteShop = (shopId: string) => {
    deleteSubmitShopMutate(String(shopId))
    closeDialog()
  }

  const handleOpenDeleteModal = (shopId: number) => {
    openDialog({
      type: 'confirm',
      title: '등록한 정보를 삭제하시겠습니까?',
      onConfirm: () => handleDeleteShop(String(shopId)),
    })
  }

  const getStatus = (status: number) => {
    switch (status) {
      case 0:
        return (
          <>
            최초 제보 <br /> 확인 중
          </>
        )
      case 1:
        return <>최초 제보</>
      case 2:
        return (
          <>
            최초 제보 <br />
            거절됨
          </>
        )
      case 3:
        return (
          <>
            운영 정보 수정 <br />
            확인 중
          </>
        )
      case 4:
        return <>운영 정보 수정</>
      case 5:
        return (
          <>
            운영 정보 수정 <br />
            거절됨
          </>
        )
      case 6:
        return (
          <>
            판매 정보 수정 <br />
            확인 중
          </>
        )
      case 7:
        return <>판매 정보 수정</>
      case 8:
        return (
          <>
            판매 정보 수정 <br />
            거절됨
          </>
        )
      default:
        return <>알 수 없음</>
    }
  }

  // inView 상태가 변경될 때 다음 페이지 데이터 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading])

  // 모든 페이지의 데이터를 하나의 배열로 펼치기
  const allShops = myShopData?.pages.flatMap((page) => page.data) || []

  const getStatusColor = (status: number) => {
    if (status === 0 || status === 3 || status === 6) {
      return 'bg-orange-light text-main'
    }
    return 'text-gray-500 bg-gray-50'
  }

  return (
    <div>
      <Header title="내가 알린 소품샵" type="back" />
      <Flex direction="col" className="w-full">
        {allShops?.map((data, index) => (
          <div key={`shop-${data?.id}-${index}`} className="relative w-full">
            <button
              onClick={() => handleLink(data?.shop.id)}
              disabled={data?.type === 0}
              className="flex w-full items-center justify-between border-b border-gray-100 px-16 py-18"
            >
              <ShopInfo
                name={data?.shop.name}
                date={formatStringDate(data?.createdAt)}
                disabled={data?.type === 0}
                imgUrl={data?.shop.mainImage || ''}
              />
            </button>
            <Flex direction="col" gap={8} className="absolute right-16 top-1/2 -translate-y-1/2">
              <div
                className={clsx(
                  'block w-86 py-6 font-caption',
                  'rounded-8 text-center',
                  getStatusColor(data?.submitStatus)
                )}
              >
                {getStatus(data?.submitStatus)}
              </div>
              <button
                onClick={() => handleOpenDeleteModal(data?.id)}
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
        {isLoading && <Loading />}

        {/* 데이터가 없을 때 표시할 내용 */}
        {myShopData && allShops.length === 0 && (
          <Flex direction="col" justify="center" align="center" className="mt-90 w-full" gap={16}>
            <p className="text-center text-gray-400 font-body1_m">
              아직 내가 알린 소품샵이 없어요. <br />
              새로운 소품샵을 소소에 알려주세요!
            </p>
          </Flex>
        )}
      </Flex>
    </div>
  )
}
