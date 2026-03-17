'use client'

import AppleIcon from '@/shared/components/icons/AppleIcon'
import GoogleIcon from '@/shared/components/icons/GoogleIcon'
import Flex from '@/shared/components/layout/Flex'
import { useGetUserProfileQuery } from '@/shared/hooks/useGetUserProfileQuery'

export default function LoginInfo() {
  const { data: userData } = useGetUserProfileQuery()

  return (
    <Flex direction="col" gap={8} className="w-full p-16">
      <h3 className="text-gray-800 font-body1_m">로그인 계정</h3>
      <Flex align="center" gap={8}>
        <Flex justify="center" align="center" className="h-32 w-32 rounded-full">
          {userData?.provider === 'google' ? <GoogleIcon /> : <AppleIcon fill="black" />}
        </Flex>
        <p className="text-gray-500 font-body1_m">{userData?.email}</p>
      </Flex>
    </Flex>
  )
}
