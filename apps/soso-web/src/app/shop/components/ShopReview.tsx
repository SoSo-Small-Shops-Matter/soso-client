'use client'

import IconButton from '@/shared/components/button/IconButton'
import LinkIcon from '@/shared/components/icons/LinkIcon'
import ContentBox from '@/shared/components/layout/ContentBox'
import Flex from '@/shared/components/layout/Flex'
import Review from '@/shared/components/layout/Review'
import ReviewPhoto from '@/shared/components/layout/Review/components/ReviewPhoto'
import ContentTitle from '@/shared/components/text/ContentTitle'
import EmptyData from '@/shared/components/ui/EmptyData'
import { ShopDetailType } from '@/shared/types/shopType'
import { useRouter } from 'next/navigation'

interface ShopReviewProps {
  shopData: ShopDetailType | undefined
  id?: string
}

export default function ShopReview({ shopData, id }: ShopReviewProps) {
  const router = useRouter()

  const handleGoReviewPage = () => {
    router.push(`/shop/${id}/review`)
  }

  return (
    <ContentBox>
      <Flex justify="between" align="center" className="w-full">
        <Flex align="center" gap={4}>
          <ContentTitle title="후기" />
          <span className="text-gray-400 font-body1_m">
            {shopData ? shopData?.userReviews.length + shopData?.otherReviews.length : 0}개
          </span>
        </Flex>
        {shopData && shopData?.otherReviews.length + shopData?.userReviews.length > 1 && (
          <IconButton onClick={handleGoReviewPage} label="전체보기" icon={<LinkIcon width="16" height="16" />} />
        )}
      </Flex>
      <Flex direction="col" gap={20} className="w-full">
        <Review isMe={true} isWrite={shopData && shopData?.userReviews.length > 0} data={shopData?.userReviews[0]} />
        <ReviewPhoto data={shopData && shopData?.imageList} />
        {shopData?.otherReviews.map((review) => <Review key={review.id} data={review} />)}
        {!shopData?.otherReviews.length && !shopData?.userReviews.length && (
          <EmptyData text="등록된 후기가 없습니다." />
        )}
      </Flex>
    </ContentBox>
  )
}
