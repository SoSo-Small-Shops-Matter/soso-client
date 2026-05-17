'use client'

import { MY_SHOP_SUBMIT_STATUS, MyShopSubmitStatus } from '@/shared/api/my/types'
import clsx from 'clsx'

interface MyShopStatusBadgeProps {
  submitStatus: MyShopSubmitStatus
}

const SUBMIT_STATUS_CONTENT: Record<MyShopSubmitStatus, React.ReactNode> = {
  [MY_SHOP_SUBMIT_STATUS.NEW_SHOP_PENDING]: (
    <>
      최초 제보 <br /> 확인 중
    </>
  ),
  [MY_SHOP_SUBMIT_STATUS.NEW_SHOP_APPROVED]: <>최초 제보</>,
  [MY_SHOP_SUBMIT_STATUS.NEW_SHOP_REJECTED]: (
    <>
      최초 제보 <br /> 거절됨
    </>
  ),

  [MY_SHOP_SUBMIT_STATUS.NEW_OPERATING_PENDING]: (
    <>
      운영 정보 수정 <br /> 확인 중
    </>
  ),
  [MY_SHOP_SUBMIT_STATUS.NEW_OPERATING_APPROVED]: <>운영 정보 수정</>,
  [MY_SHOP_SUBMIT_STATUS.NEW_OPERATING_REJECTED]: (
    <>
      운영 정보 수정 <br /> 거절됨
    </>
  ),

  [MY_SHOP_SUBMIT_STATUS.NEW_PRODUCT_PENDING]: (
    <>
      판매 정보 수정 <br /> 확인 중
    </>
  ),
  [MY_SHOP_SUBMIT_STATUS.NEW_PRODUCT_APPROVED]: <>판매 정보 수정</>,
  [MY_SHOP_SUBMIT_STATUS.NEW_PRODUCT_REJECTED]: (
    <>
      판매 정보 수정 <br /> 거절됨
    </>
  ),
}

export default function MyShopStatusBadge({ submitStatus }: MyShopStatusBadgeProps) {
  const isPending =
    submitStatus === MY_SHOP_SUBMIT_STATUS.NEW_SHOP_PENDING ||
    submitStatus === MY_SHOP_SUBMIT_STATUS.NEW_OPERATING_PENDING ||
    submitStatus === MY_SHOP_SUBMIT_STATUS.NEW_PRODUCT_PENDING

  return (
    <div
      className={clsx(
        'block w-86 py-6 font-caption',
        'rounded-8 text-center',
        isPending ? 'bg-orange-50 text-main' : 'bg-gray-50 text-gray-500'
      )}
    >
      {SUBMIT_STATUS_CONTENT[submitStatus]}
    </div>
  )
}
