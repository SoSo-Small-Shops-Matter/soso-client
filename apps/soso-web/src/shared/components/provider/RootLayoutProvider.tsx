'use client'

import AuthComponent from '@/shared/components/config/AuthComponent'
import BottomNavigation from '@/shared/components/layout/BottomNavigation'
import TanstackQueryProvider from '@/shared/components/provider/TanstackQueryProvider'
import { DialogProvider } from '@/shared/context/DialogContext'
import { ToastProvider, useToast } from '@/shared/context/ToastContext'
import { useIsNavigation } from '@/shared/hooks/useIsNavigation'
import { CustomError } from '@/shared/utils/customFetch'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useRef } from 'react'

interface RootLayoutProviderProps {
  children: ReactNode
}

// ToastProvider 안에서 useToast를 호출할 수 있도록 내부 컴포넌트로 분리
function InnerProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isNavigation = useIsNavigation()
  const { openToast } = useToast()

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    }

    setVh()
    window.addEventListener('resize', setVh)

    return () => {
      window.removeEventListener('resize', setVh)
    }
  }, [])

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [pathname])

  const handleMutationError = (error: unknown) => {
    if (error instanceof CustomError) {
      openToast({ message: error.message })
    }
  }

  return (
    <TanstackQueryProvider onMutationError={handleMutationError}>
      <DialogProvider>
        <AuthComponent />
        <div
          ref={contentRef}
          className={`m-auto h-screenVh w-full max-w-screen overflow-y-auto pb-60 ${pathname === '/' ? 'pt-0' : 'pt-56'} shadow-md`}
        >
          {children}
          {isNavigation && <BottomNavigation />}
        </div>
        <div id="bottom-modal-root" className=""></div>
        <div id="portal-root" className=""></div>
      </DialogProvider>
    </TanstackQueryProvider>
  )
}

export default function RootLayoutProvider({ children }: RootLayoutProviderProps) {
  return (
    <ToastProvider>
      <InnerProvider>{children}</InnerProvider>
    </ToastProvider>
  )
}
