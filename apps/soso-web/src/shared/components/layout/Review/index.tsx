'use client'

import { useGetShopDetailQuery } from '@/app/shop/hooks/useGetShopDetailQuery'
import Flex from '@/shared/components/layout/Flex'
import MessageBox from '@/shared/components/layout/Review/components/MessageBox'
import ReviewWrite from '@/shared/components/layout/Review/components/ReviewWrite'
import { useDeleteReviewMutation } from '@/shared/components/layout/Review/hooks/useDeleteReviewMutation'
import Loading from '@/shared/components/loading/Loading'
import ImageSwiperModal from '@/shared/components/modal/ImageSwiperModal'
import ProfileImage from '@/shared/components/ui/ProfileImage'
import { useDialog } from '@/shared/context/DialogContext'
import { useToast } from '@/shared/context/ToastContext'
import { useGetUserProfileQuery } from '@/shared/hooks/useGetUserProfileQuery'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { ReviewType } from '@/shared/types/shopType'
import { getSafeImageUrl } from '@/shared/utils/getSafeImageUrl'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode } from 'swiper/modules'
import ReviewReportModal from '@/shared/components/layout/Review/components/ReviewReportModal'
import { getFormatDateString } from '@repo/utils/formatDateString'

interface ReviewProps {
  isMe?: boolean
  isWrite?: boolean
  isBorder?: boolean
  data: ReviewType | undefined
}
export default function Review({ isMe, isWrite = false, isBorder = true, data }: ReviewProps) {
  const [isWriteModal, setIsWriteModal] = useState(false)
  const [isImageViewer, setIsImageViewer] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isReportModal, setIsReportModal] = useState(false)

  const { openDialog, closeDialog } = useDialog()
  const { openToast } = useToast()
  const { id } = useParams()
  const router = useRouter()

  const { token } = useAuthStore()

  const { mutate: deleteReviewMutate, isPending } = useDeleteReviewMutation()
  const { data: detailData, refetch: detailRefetch } = useGetShopDetailQuery(String(id))
  const { data: userData } = useGetUserProfileQuery()

  const confirm = () => {
    router.push('/login')
    closeDialog()
  }

  const handleToggleReportModal = () => {
    if (!token) {
      openDialog({
        type: 'alert',
        title: '',
        message: '로그인이 필요한 서비스입니다.',
        rightLabel: '로그인/회원가입하기',
        onConfirm: () => confirm(),
        onCancel: () => closeDialog(),
      })
      return
    }

    setIsReportModal((prev) => !prev)
  }

  const handleToggleWriteModal = () => {
    if (token) {
      setIsWriteModal((prev) => !prev)
    } else {
      openDialog({
        type: 'alert',
        title: '',
        message: '로그인이 필요한 서비스입니다.',
        rightLabel: '로그인/회원가입하기',
        onConfirm: () => confirm(),
        onCancel: () => closeDialog(),
      })
    }
  }

  const handleOpenImageViewer = (index: number) => {
    setSelectedIndex(index)
    setIsImageViewer(true)
  }

  const handleCloseImageViewer = () => {
    setIsImageViewer(false)
  }

  const handleReviewDelete = () => {
    if (!detailData?.userReviews[0].id) return
    deleteReviewMutate(
      {
        shopId: detailData.shop.id,
        reviewId: detailData?.userReviews[0].id,
      },
      {
        onSuccess: () => {
          closeDialog()
          detailRefetch()
          openToast({
            message: '리뷰가 삭제 되었습니다.',
          })
        },
      }
    )
  }

  const handleOpenDeleteModal = () => {
    openDialog({
      title: '후기 삭제',
      message: (
        <>
          닉네임 님이 등록한 후기를
          <br /> 삭제하시겠습니까?
        </>
      ),
      type: 'confirm',
      onConfirm: handleReviewDelete,
    })
  }

  return (
    <Flex
      direction="col"
      gap={14}
      className={`w-full pb-20 last:border-none ${isBorder ? 'border-b border-gray-100' : 'border-none'}`}
    >
      <Flex justify="between" align="center" className="relative w-full">
        {!isMe && (
          <button onClick={handleToggleReportModal} className="absolute right-0 top-6 text-gray-400 font-caption">
            신고하기
          </button>
        )}
        <Flex align="center" gap={12} className="flex-1">
          <ProfileImage
            imgUrl={
              (isMe ? getSafeImageUrl(userData?.profileImg || '') : getSafeImageUrl(data?.user?.photoUrl || '')) ||
              '/images/default_profile.png'
            }
          />
          <Flex direction="col" className="flex-1">
            <p className="text-gray-800 font-body2_m">{data?.user?.nickName || isMe ? data?.user?.nickName : '익명'}</p>
            {data?.createdAt && (
              <p className="text-gray-400 font-caption">{getFormatDateString(data.createdAt, 'yyyy.MM.dd')}</p>
            )}
          </Flex>
        </Flex>
        {isMe && isWrite && (
          <>
            <Flex align="center" gap={12}>
              <button
                onClick={handleToggleWriteModal}
                className="h-30 w-41 rounded-[100px] border border-gray-100 text-gray-600 font-caption"
              >
                수정
              </button>
              <button
                onClick={handleOpenDeleteModal}
                className="h-30 w-41 rounded-[100px] border border-gray-100 text-gray-600 font-caption"
              >
                삭제
              </button>
            </Flex>
            <ReviewWrite isEdit isOpen={isWriteModal} onClose={handleToggleWriteModal} />
          </>
        )}
      </Flex>
      {isMe && !isWrite ? (
        <>
          <MessageBox isMe={isMe} isWrite={isWrite}>
            <Flex direction="col" align="start" gap={16} className="w-full">
              <button
                onClick={handleToggleWriteModal}
                className="block w-full break-all text-left text-gray-400 font-body2_m"
              >
                후기를 작성해 주세요.
              </button>
            </Flex>
          </MessageBox>
          <ReviewWrite isOpen={isWriteModal} onClose={handleToggleWriteModal} />
        </>
      ) : (
        <MessageBox isMe={isMe} isWrite={isWrite}>
          <Flex direction="col" gap={16}>
            <pre className="whitespace-pre-wrap break-all font-['Pretendard'] text-gray-600 font-body2_m">
              {data?.content || ''}
            </pre>
            {data && data?.images?.length > 0 && (
              <Swiper
                modules={[Navigation, FreeMode]}
                slidesPerView="auto"
                spaceBetween={8}
                freeMode={true}
                grabCursor={true}
                className="w-full"
              >
                {data?.images?.map((image, index) => (
                  <SwiperSlide key={`image-${image.id}`} style={{ width: 'auto' }}>
                    <div onClick={() => handleOpenImageViewer(index)} className="relative h-72 w-72">
                      <Image
                        fill
                        src={getSafeImageUrl(image?.url || '') || ''}
                        alt="리뷰 이미지"
                        className="rounded-12 object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Flex>
        </MessageBox>
      )}
      <ImageSwiperModal
        isOpen={isImageViewer}
        onClose={handleCloseImageViewer}
        images={data?.images?.map((image) => image.url) || []}
        initialSlide={selectedIndex}
      />

      {isPending && <Loading />}

      <ReviewReportModal
        shopId={detailData?.shop.id}
        reviewId={data?.id}
        isReportModal={isReportModal}
        handleToggleReportModal={handleToggleReportModal}
      />
    </Flex>
  )
}
