'use client'

import Flex from '@/shared/components/layout/Flex'
import ProfileImage from '@/shared/components/ui/ProfileImage'
import { useGetUserProfileQuery } from '@/shared/api/user/queries'
import Link from 'next/link'

export default function MyProfile() {
  const { data: userData } = useGetUserProfileQuery()

  return (
    <Flex direction="col" gap={20} className="w-full pb-16 pt-20">
      <Flex justify="between" align="center" className="w-full px-20">
        <Flex align="center" gap={12}>
          <ProfileImage imgUrl={userData?.profileImg || ''} />
          <p className="font-title_s text-black">
            {userData?.nickName}
            <span className="font-title_s">님</span>
          </p>
        </Flex>
        <Link
          href="/my/edit"
          className="font-body_s flex h-34 w-52 items-center justify-center rounded-10 bg-gray-50 text-gray-400"
        >
          수정
        </Link>
      </Flex>
    </Flex>
  )
}
