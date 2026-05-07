'use client'

import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/shared/components/button/Button'
import Input from '@/shared/components/inputs/Input'
import Flex from '@/shared/components/layout/Flex'
import Header from '@/shared/components/layout/Header'
import ValidationText from '@/shared/components/text/ValidationText'
import { useGetDuplicateNicknameQuery } from '@/shared/api/user/queries'
import useDebounce from '@/shared/hooks/useDebounce'
import { usePatchUserProfileMutation } from '@/shared/api/user/queries'
import { useRouter } from 'next/navigation'
import { useDialog } from '@/shared/context/DialogContext'

export default function InfoSetting() {
  const router = useRouter()
  const { openDialog } = useDialog()

  const [isError, setIsError] = useState({
    lengthError: true,
    patternError: true,
  })

  const { register, handleSubmit, watch } = useForm({
    mode: 'onChange',
  })

  const nickname = watch('nickName')
  const debounceNickname = useDebounce(nickname, 200)

  const { data: isDuplicateNickname, isLoading } = useGetDuplicateNicknameQuery(debounceNickname)
  const { mutate: patchUserMutate } = usePatchUserProfileMutation()

  useEffect(() => {
    const lengthError = nickname?.length < 2 || nickname?.length > 10
    const patternError = !/^[가-힣a-zA-Z0-9]+$/.test(nickname)

    setIsError((prevErrors) => ({
      ...prevErrors,
      lengthError,
      patternError,
    }))
  }, [nickname])

  const isDisabled = isError.lengthError || isError.patternError || !nickname || isDuplicateNickname || isLoading

  const handleClick: SubmitHandler<FieldValues> = (data) => {
    patchUserMutate(data, {
      onSuccess: () => {
        router.push('/')
        openDialog({
          type: 'alert',
          title: '환영합니다',
          message: (
            <span>
              소중한 소품샵에
              <br /> 회원이 되신 것을 축하드립니다.
            </span>
          ),
        })
      },
      onError: () => {
        openDialog({
          type: 'alert',
          title: '가입 에러',
          message: '잠시 후 다시 요청해주세요.',
        })
      },
    })
  }

  return (
    <div className="modal-page">
      <Header type="back" />
      <Flex direction="col" gap={20} className="w-full px-20 pt-56">
        <h2 className="text-[#191919] font-title_m">
          반가워요!
          <br />
          닉네임을 설정해 주세요.
        </h2>
        <form className="w-full" onSubmit={handleSubmit(handleClick)}>
          <Flex direction="col" gap={8} className="w-full">
            <Input placeholder="닉네임을 입력해 주세요." {...register('nickName')} />
            <Flex direction="col" gap={2}>
              <ValidationText text="2자 이상 10자 이하로 입력해 주세요." isError={isError.lengthError} />
              <ValidationText text="한글,영문, 숫자만 가능합니다." isError={isError.patternError} />
              <ValidationText text="중복된 닉네임입니다." isError={isDuplicateNickname} />
            </Flex>
          </Flex>
          <div className="bottom-button">
            <Button type="submit" title="완료" disabled={isDisabled} />
          </div>
        </form>
      </Flex>
    </div>
  )
}
