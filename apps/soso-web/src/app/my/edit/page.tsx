'use client'

import { usePatchUserProfileMutation } from '@/app/my/edit/hooks/usePatchUserProfileMutation'
import { PatchUserRequestType } from '@/app/my/edit/types'
import Button from '@/shared/components/button/Button'
import Input from '@/shared/components/inputs/Input'
import ProfileUpload from '@/shared/components/inputs/ProfileUpload'
import Flex from '@/shared/components/layout/Flex'
import Header from '@/shared/components/layout/Header'
import Loading from '@/shared/components/loading/Loading'
import ValidationText from '@/shared/components/text/ValidationText'
import { useToast } from '@/shared/context/ToastContext'
import useDebounce from '@/shared/hooks/useDebounce'
import { useSingleFileUpload } from '@/shared/hooks/useFileUpload'
import { useGetDuplicateNicknameQuery } from '@/shared/hooks/useGetDuplicateNicknameQuery'
import { useGetUserProfileQuery } from '@/shared/hooks/useGetUserProfileQuery'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export default function ProfileEditPage() {
  const { openToast } = useToast()
  const router = useRouter()

  const [isError, setIsError] = useState({
    lengthError: true,
    patternError: true,
  })
  const { preview, file, setSingleFile } = useSingleFileUpload()
  const { data: userData } = useGetUserProfileQuery()
  const { mutate: patchUserMutate, isPending } = usePatchUserProfileMutation()
  const { register, handleSubmit, watch, setValue } = useForm({
    mode: 'onChange',
  })

  const nickname = watch('nickName')
  const debounceNickname = useDebounce(nickname, 200)
  const { data: isDuplicateNickname, isLoading } = useGetDuplicateNicknameQuery(debounceNickname)

  useEffect(() => {
    const lengthError = nickname?.length < 2 || nickname?.length > 10
    const patternError = !/^[가-힣a-zA-Z0-9]+$/.test(nickname)

    setIsError((prevErrors) => ({
      ...prevErrors,
      lengthError,
      patternError,
    }))
  }, [nickname])

  const handleClick: SubmitHandler<FieldValues> = (data) => {
    let request: PatchUserRequestType
    if (userData?.nickName !== data.nickName) {
      request = {
        nickName: data.nickName,
      }
    }

    if (file) {
      request = {
        ...request,
        file,
      }
    }

    patchUserMutate(request, {
      onSuccess: () => {
        router.push('/my')
        openToast({
          message: '프로필이 변경되었습니다.',
        })
      },
    })
  }

  useEffect(() => {
    if (!userData) return
    setValue('nickName', userData?.nickName)
  }, [userData])

  const isDisabled =
    isError.lengthError ||
    isError.patternError ||
    !nickname ||
    (userData?.nickName === nickname && !file) ||
    (isDuplicateNickname && !file) ||
    isLoading

  return (
    <div>
      <Header title="프로필 수정" type="back" />
      <Flex direction="col" align="center" gap={50} className="w-full px-16 py-20">
        <ProfileUpload prevImage={userData?.photoUrl || ''} preview={preview} setSingleFile={setSingleFile} />
        <form className="w-full" onSubmit={handleSubmit(handleClick)}>
          <Flex direction="col" gap={8} className="w-full">
            <Input placeholder="닉네임을 입력해 주세요." {...register('nickName')} defaultValue={''} />
            <Flex direction="col" gap={2}>
              <ValidationText text="2자 이상 10자 이하로 입력해 주세요." isError={isError.lengthError} />
              <ValidationText text="한글,영문, 숫자만 가능합니다." isError={isError.patternError} />

              <ValidationText
                text="중복된 닉네임입니다."
                isError={isDuplicateNickname && userData?.nickName !== debounceNickname}
              />
            </Flex>
          </Flex>
          <div className="bottom-fixed-button">
            <Button type="submit" title="변경 완료" disabled={isDisabled} />
          </div>
        </form>
      </Flex>

      {isPending && <Loading />}
    </div>
  )
}
