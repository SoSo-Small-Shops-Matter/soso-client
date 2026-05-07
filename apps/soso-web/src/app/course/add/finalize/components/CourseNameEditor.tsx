'use client'

import Backdrop from '@/shared/components/layout/Backdrop'
import Button from '@/shared/components/button/Button'
import { useRef, useState } from 'react'

interface CourseNameEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function CourseNameEditor({ value, onChange }: CourseNameEditorProps) {
  const [isOpen, setIsOpen] = useState(!value)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOpen = () => {
    setDraft(value)
    setIsOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleConfirm = () => {
    if (!draft.trim()) return
    onChange(draft.trim())
    setIsOpen(false)
  }

  const handleCancel = () => {
    if (!value) return
    setIsOpen(false)
  }

  return (
    <>
      {/* 이름 표시 영역 */}
      <div className="flex items-start gap-8 py-4">
        <p className="flex-1 break-words text-gray-900 font-title_m">
          {value || <span className="text-gray-300">코스 이름을 입력해 주세요.</span>}
        </p>
        <button type="button" onClick={handleOpen} className="mt-2 flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M2 13.5V16h2.5l7.38-7.38-2.5-2.5L2 13.5zM15.71 4.04a.996.996 0 0 0 0-1.41l-1.34-1.34a.996.996 0 0 0-1.41 0l-1.05 1.05 2.75 2.75 1.05-1.05z"
              fill="#9EA4AA"
            />
          </svg>
        </button>
      </div>

      {/* 이름 편집 모달 */}
      {isOpen && (
        <>
          <Backdrop onClick={value ? handleCancel : undefined} />
          <div className="fixed left-1/2 top-1/2 z-modal w-[323px] -translate-x-1/2 -translate-y-1/2 rounded-20 bg-white px-16 pb-20 pt-24">
            <div className="flex flex-col items-center gap-20">
              <h3 className="font-subtitle_l">코스 제목</h3>

              {/* 입력창 */}
              <div className="relative w-full">
                <input
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value.slice(0, 30))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleConfirm()
                  }}
                  placeholder="코스 이름을 입력해 주세요."
                  maxLength={30}
                  autoFocus
                  className="h-48 w-full rounded-10 bg-gray-50 px-16 pr-40 text-gray-900 outline-none font-body_m placeholder:text-gray-300"
                />
                {draft && (
                  <button
                    type="button"
                    onClick={() => setDraft('')}
                    className="absolute right-12 top-1/2 -translate-y-1/2"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="9" fill="#C5CBD2" />
                      <path d="M6 6l6 6M12 6l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>

              <p className="w-full text-right text-gray-300 font-caption">{draft.length}/30</p>

              {/* 버튼 */}
              <div className="flex w-full gap-9">
                <Button
                  title="취소"
                  bgColor="var(--gray-50)"
                  textColor="var(--gray-400)"
                  borderColor="none"
                  width="auto"
                  className="flex-1"
                  onClick={handleCancel}
                  disabled={!value}
                />
                <Button title="확인" width="auto" className="flex-1" onClick={handleConfirm} disabled={!draft.trim()} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
