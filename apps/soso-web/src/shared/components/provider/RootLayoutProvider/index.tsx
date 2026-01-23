'use client'

import AuthComponent from '@/shared/components/config/AuthComponent'
import BottomNavigation from '@/shared/components/layout/BottomNavigation'
import TanstackQueryProvider from '@/shared/components/provider/TanstackQueryProvider'
import { DialogProvider } from '@/shared/context/DialogContext'
import { ToastProvider } from '@/shared/context/ToastContext'
import { useIsNavigation } from '@/shared/hooks/useIsNavigation'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useRef } from 'react'

interface RootLayoutProviderProps {
  children: ReactNode
}

export default function RootLayoutProvider({ children }: RootLayoutProviderProps) {
  const pathname = usePathname()

  const isNavigation = useIsNavigation()

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

  // 라우팅 했을 때 스크롤 최상단
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [pathname])

  return (
    <div>
      <TanstackQueryProvider>
        <DialogProvider>
          <ToastProvider>
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
          </ToastProvider>
        </DialogProvider>
      </TanstackQueryProvider>
    </div>
  )
}
