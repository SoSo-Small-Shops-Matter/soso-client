'use client';

import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/inputs/Input';
import Flex from '@/shared/components/layout/Flex';
import Header from '@/shared/components/layout/Header';
import ValidationText from '@/shared/components/text/ValidationText';
import { useRouter } from 'next/navigation';

export default function InfoSetting() {
  const [isError, setIsError] = useState({
    lengthError: true,
    patternError: true,
  });

  const router = useRouter();

  const { register, handleSubmit, watch } = useForm({
    mode: 'onChange',
  });

  const nickname = watch('nickname');

  useEffect(() => {
    const lengthError = nickname?.length < 2 || nickname?.length > 10;
    const patternError = !/^[가-힣a-zA-Z0-9]+$/.test(nickname);

    setIsError((prevErrors) => ({
      ...prevErrors,
      lengthError,
      patternError,
    }));
  }, [nickname]);

  const handleClick: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    router.push('/');
  };

  return (
    <div className="modal-page">
      <Header type="back" />
      <Flex direction="col" gap={20} className="w-full px-20 pt-56">
        <h2 className="text-[#191919] font-title2_bold">
          반가워요!
          <br />
          닉네임을 설정해 주세요.
        </h2>
        <form className="w-full" onSubmit={handleSubmit(handleClick)}>
          <Flex direction="col" gap={8} className="w-full">
            <Input placeholder="닉네임을 입력해 주세요." {...register('nickname')} />
            <Flex direction="col" gap={2}>
              <ValidationText text="2자 이상 10자 이하" isError={isError.lengthError} />
              <ValidationText text="한글,영문, 숫자 가능" isError={isError.patternError} />
            </Flex>
          </Flex>
          <div className="bottom-button">
            <Button type="submit" title="완료" disabled={isError.lengthError || isError.patternError || !nickname} />
          </div>
        </form>
      </Flex>
    </div>
  );
}
