'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useGetTokenMutation } from '@/shared/api/auth/queries'
import Loading from '@/shared/components/loading/Loading'

const AuthCallback = () => {
  return (
    <Suspense fallback={'로딩중'}>
      <AuthCallbackContent />
    </Suspense>
  )
}

const AuthCallbackContent = () => {
  const searchParams = useSearchParams()
  const [code, setCode] = useState<string | null>(null)
  const [redirectUri, setRedirectUri] = useState('')

  const { mutate: getTokenMutate, isSuccess } = useGetTokenMutation()

  useEffect(() => {
    setRedirectUri(`${window.location.origin}/login/callback`)
  }, [])

  useEffect(() => {
    const authCode = searchParams.get('code')
    if (authCode) {
      setCode(authCode)
    }
  }, [searchParams])

  useEffect(() => {
    if (!code || !redirectUri) return
    const data = {
      code,
      redirectUri,
    }

    getTokenMutate(data)
  }, [code, redirectUri])

  return !isSuccess && <Loading text="로그인 중입니다." />
}

export default AuthCallback
