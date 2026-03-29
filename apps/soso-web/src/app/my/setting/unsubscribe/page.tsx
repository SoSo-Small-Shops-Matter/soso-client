'use client'

import { UNSUBSCRIBE_LIST } from '@/app/my/setting/unsubscribe/constants'
import { useDeleteUserMutation } from '@/shared/api/user/queries'
import Button from '@/shared/components/button/Button'
import Radio from '@/shared/components/inputs/Radio'
import Flex from '@/shared/components/layout/Flex'
import Header from '@/shared/components/layout/Header'
import { useDialog } from '@/shared/context/DialogContext'
import { useGetUserProfileQuery } from '@/shared/api/user/queries'
import { ChangeEvent, useState } from 'react'
import { WithdrawalReasonCodeType } from '@/shared/api/user/types'

export default function UnsubscribePage() {
  const { data: userData } = useGetUserProfileQuery()
  const { mutate: deleteUserMutate } = useDeleteUserMutation()
  const { openDialog } = useDialog()
  const [reasonCode, setReasonCode] = useState<WithdrawalReasonCodeType>()

  const handleDeleteUser = () => {
    if (!userData || !reasonCode) return
    const data = {
      withdrawalReasonCode: reasonCode,
    }
    deleteUserMutate(data)
  }

  const handleClickUnsubScribe = () => {
    openDialog({
      type: 'confirm',
      title: '회원탈퇴',
      message: (
        <span>
          회원 탈퇴 시 작성된 모든 데이터가 삭제됩니다.
          <br /> 계속 진행하시겠습니까?
        </span>
      ),
      onConfirm: handleDeleteUser,
    })
  }

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setReasonCode(e.target.value as WithdrawalReasonCodeType)
  }

  return (
    <div>
      <Header title="탈퇴하기" type="back" />
      <Flex direction="col" gap={28} className="px-16 py-20">
        <Flex direction="col" gap={4}>
          <p className="text-black font-title2_bold">
            소중한 {userData?.nickName}님
            <br />
            떠나신다니 너무 아쉬워요.
          </p>
          <p className="text-gray-400 font-body2_m">
            계정 탈퇴 이유를 알려주시면 <br />더 나은 서비스를 제공하도록 노력하겠습니다.
          </p>
        </Flex>
        <Flex direction="col" gap={30}>
          {UNSUBSCRIBE_LIST.map((list) => (
            <Radio
              key={list.id}
              id={list.id}
              name="unsubScribe"
              value={list.id}
              label={list.label}
              onChange={handleChangeValue}
              checked={reasonCode === list.id}
            />
          ))}
        </Flex>
      </Flex>
      <div className="fixed bottom-0 px-16 py-10 layout-center">
        <Button disabled={!reasonCode} title="탈퇴하기" onClick={handleClickUnsubScribe} />
      </div>
    </div>
  )
}
