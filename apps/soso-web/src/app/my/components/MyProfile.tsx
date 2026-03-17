'use client'

import Flex from '@/shared/components/layout/Flex'
import ProfileImage from '@/shared/components/ui/ProfileImage'
import { useGetUserProfileQuery } from '@/shared/hooks/useGetUserProfileQuery'
import Image from 'next/image'
import Link from 'next/link'

export default function MyProfile() {
  const { data: userData } = useGetUserProfileQuery()

  return (
    <Flex direction="col" gap={20} className="w-full pb-16 pt-20">
      <Flex justify="between" align="center" className="w-full px-20">
        <Flex align="center" gap={12}>
          <ProfileImage imgUrl={userData?.profileImg || ''} />
          <p className="text-black font-title3_bold">
            {userData?.nickName}
            <span className="font-title3_m">님</span>
          </p>
        </Flex>
        <Link
          href="/my/edit"
          className="flex h-34 w-52 items-center justify-center rounded-10 bg-gray-50 text-gray-400 font-body2_m"
        >
          수정
        </Link>
      </Flex>
      <div className="w-full px-16">
        <Flex justify="between" align="center" className="w-full rounded-16 bg-[#F3EDE8] px-18 py-16">
          <p className="text-[#8E847C] font-body1_m">나만의 소품샵을 둘러보세요.</p>
          <Image width={36} height={35} src="/images/my/basket_icon.svg" alt="장바구니 아이콘" />
        </Flex>
      </div>
    </Flex>
  )
}
