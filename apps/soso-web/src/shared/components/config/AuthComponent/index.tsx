'use client'

import { useDialog } from '@/shared/context/DialogContext'
import { useGetUserProfileQuery } from '@/shared/hooks/useGetUserProfileQuery'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const { openDialog, closeDialog } = useDialog()
  const { data: userData } = useGetUserProfileQuery()

  const { isHydrated, token, isLoggingOut } = useAuthStore()

  const confirm = () => {
    closeDialog()
    router.push('/login')
  }

  useEffect(() => {
    if (!isHydrated || isLoggingOut) return
    if (!token && (pathname.includes('/my') || pathname.includes('/report'))) {
      openDialog({
        type: 'alert',
        title: '',
        message: '로그인이 필요한 서비스입니다.',
        rightLabel: '로그인/회원가입하기',
        onConfirm: () => confirm(),
      })
    }
  }, [token, isHydrated, pathname])

  useEffect(() => {
    if (!userData) return

    if (userData.nickName === null && pathname !== '/login/setting') {
      router.push('/login/agree-view')
    }
  }, [userData])

  return null
}
