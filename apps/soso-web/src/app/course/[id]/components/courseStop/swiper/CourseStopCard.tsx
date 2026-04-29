'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { CourseStopDto } from '@/shared/api/course/types'
import { useDialog } from '@/shared/context/DialogContext'

interface Props {
  stop: CourseStopDto
  isStamped: boolean
  onToggleStamp: (shopId: number) => void
  isLiked?: boolean
  onToggleLike?: (shopId: number, liked: boolean) => void
}

export function CourseStopCard({ stop, isStamped, onToggleStamp, isLiked = false, onToggleLike }: Props) {
  const router = useRouter()
  const { openDialog, closeDialog } = useDialog()
  const [liked, setLiked] = useState(isLiked)

  const handleLike = () => {
    const next = !liked
    setLiked(next)
    onToggleLike?.(stop.shopId, next)
  }

  const handleNavigate = () => {
    router.push(`/shop/${stop.shop.id}`)
  }

  const handleStamp = () => {
    const stampConfig = isStamped
      ? { title: '방문 도장 취소할까요?', message: '이 소품샵의 방문 기록이 해제돼요.', leftLabel: '닫기', rightLabel: '도장 취소' }
      : { title: '방문 도장 찍을까요?', message: '이 소품샵을 방문한 곳으로 기록돼요. 이후에도 변경할 수 있어요.', leftLabel: '취소', rightLabel: '도장찍기' }

    openDialog({
      type: 'confirm',
      ...stampConfig,
      onConfirm: () => {
        onToggleStamp(stop.shopId)
        closeDialog()
      },
      onCancel: closeDialog,
    })
  }

  return (
    <>
      <div className="flex items-center gap-10 overflow-hidden rounded-2xl bg-white p-16 shadow-sm">
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-[11px] font-bold text-gray-400">
          {stop.orderIndex + 1}
        </div>

        <div className="relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
          {stop.shop.mainImage && (
            <img src={stop.shop.mainImage} alt={stop.shop.name} className="h-full w-full object-cover" />
          )}
          <button type="button" onClick={handleLike} className="absolute left-[6px] top-[6px]">
            <img
              src={liked ? '/images/course/liked.svg' : '/images/course/unliked.svg'}
              alt={liked ? '좋아요' : '좋아요 취소'}
              width={24}
              height={24}
            />
          </button>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate text-base font-bold text-gray-900">{stop.shop.name}</span>
          <button
            type="button"
            onClick={handleNavigate}
            className="flex w-fit items-center gap-1 text-sm text-gray-400"
          >
            <img src="/images/course/find.svg" alt="길찾기" width={12} height={12} className="mr-4" />
            <span className="text-xs color-gray-500 font-medium">길찾기</span>
          </button>
        </div>

        <button type="button" onClick={handleStamp} className="flex-shrink-0">
          <img
            src={isStamped ? '/images/course/stampped.svg' : '/images/course/un-stampped.svg'}
            alt={isStamped ? '스탬프 완료' : '스탬프 미완료'}
            width={28}
            height={28}
          />
        </button>
      </div>
    </>
  )
}
