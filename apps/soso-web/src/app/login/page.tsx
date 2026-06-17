'use client'

import AppleLogin from '@/app/login/components/AppleLogin'
import GoogleIcon from '@/shared/components/icons/GoogleIcon'
import Flex from '@/shared/components/layout/Flex'
import { useIsNativeApp } from '@/shared/hooks/useIsNativeApp'
import { useAuthStore } from '@/shared/store/useAuthStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const isNativeApp = useIsNativeApp()
  const [redirectUri, setRedirectUri] = useState('')

  const router = useRouter()
  const { isHydrated, token } = useAuthStore()

  const handleGuestLogin = () => {
    router.push('/')
  }

  const googleLogin = () => {
    if (!redirectUri) return

    if (isNativeApp) {
      window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'GOOGLE_LOGIN_REQUEST' }))
      return
    }

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    const scope = encodeURIComponent('openid profile email')

    const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`
    window.location.href = authUrl
  }

  useEffect(() => {
    if (!isHydrated || !token) return
    if (token) {
      router.push('/')
    }
  }, [token, isHydrated])

  useEffect(() => {
    if (!isNativeApp || !redirectUri) return

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)

        if (data.type === 'GOOGLE_LOGIN_SUCCESS') {
          const { code } = data.payload
          if (code) {
            router.push(`${redirectUri}?code=${code}`)
          }
        }
      } catch (err) {
        console.error('메시지 파싱 에러:', err)
      }
    }

    window.addEventListener('message', handleMessage)
    document.addEventListener('message', handleMessage as any)

    return () => {
      window.removeEventListener('message', handleMessage)
      document.removeEventListener('message', handleMessage as any)
    }
  }, [isNativeApp, redirectUri])

  useEffect(() => {
    setRedirectUri(`${window.location.origin}/login/callback`)
  }, [])

  return (
    <Flex justify="center" align="center" className="h-screenVh w-full">
      <Image
        width={205}
        height={120}
        style={{ width: '68%', height: 'auto' }}
        src="/images/logo.svg"
        alt="소소 로고"
        className="mb-[200px]"
      />
      <Flex
        direction="col"
        gap={12}
        justify="center"
        className="fixed bottom-100 left-1/2 w-full -translate-x-1/2 px-16"
      >
        <button
          onClick={googleLogin}
          className="relative flex h-56 w-full items-center justify-center gap-6 rounded-16 border border-gray-200 bg-white font-body_m"
        >
          <GoogleIcon />
          Google로 시작하기
        </button>
        <AppleLogin />
        <button
          onClick={handleGuestLogin}
          className="flex h-56 w-full items-center justify-center text-gray-500 font-body_s"
        >
          로그인 없이 시작하기
        </button>
      </Flex>
    </Flex>
  )
}
