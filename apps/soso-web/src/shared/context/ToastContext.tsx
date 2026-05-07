'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsNavigation } from '@/shared/hooks/useIsNavigation'
import clsx from 'clsx'

interface ToastOptions {
  message: string
  duration?: number
  action?: {
    content: ReactNode
    onPress: () => void
  }
}

interface ToastContextType {
  openToast: (options: ToastOptions) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastOptions | null>(null)
  const isNavigation = useIsNavigation()

  const openToast = (options: ToastOptions) => {
    setToast(options)
    setTimeout(() => setToast(null), options.duration || 3000)
  }

  return (
    <ToastContext.Provider value={{ openToast }}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={clsx(
              'fixed left-1/2 z-modal w-full max-w-screen px-16',
              isNavigation ? 'bottom-72' : 'bottom-12'
            )}
            initial={{ opacity: 0, y: 30, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex w-full items-center justify-between rounded-12 bg-gray-800 px-16 py-14 text-white font-body_s">
              <span>{toast.message}</span>
              {toast.action && (
                <div role="button" onClick={toast.action.onPress}>
                  {toast.action.content}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  )
}

// Toast 컨텍스트 사용을 위한 커스텀 훅
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within a ToastProvider')
  return context
}
