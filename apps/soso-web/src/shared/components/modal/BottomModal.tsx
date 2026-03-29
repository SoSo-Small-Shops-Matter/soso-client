'use client'

import { handleStopEvent } from '@/shared/utils/stopEvent'
import { motion, AnimatePresence } from 'framer-motion'
import { MouseEvent, ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface BottomModalProps {
  isOpen: boolean
  onClose: (e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>) => void
  children: ReactNode
}

export default function BottomModal({ isOpen, onClose, children }: BottomModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    handleStopEvent(e)
    onClose(e)
  }

  if (!mounted) return null

  const modalRoot = document.getElementById('bottom-modal-root')

  if (!modalRoot) return null

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 */}
          <motion.div
            className="fixed inset-0 z-backdrop bg-black bg-opacity-50 layout-center"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />

          {/* 모달 */}
          <motion.div
            className="fixed bottom-0 z-modal w-full rounded-t-3xl bg-white p-20 shadow-lg layout-center"
            initial={{ y: '100%', x: '-50%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              duration: 0.1,
              type: 'spring',
              stiffness: 100,
              damping: 20,
            }}
            onClick={handleStopEvent}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    modalRoot
  )
}
