'use client'

import { useRouter } from 'next/navigation'
import type { CourseStopDto, SharedStopDto } from '@/shared/api/course/types'

import { useDialog } from '@/shared/context/DialogContext'
import NavigationArrowIcon from '@/shared/components/icons/NavigationArrow'
import FavoriteIcon from '@/shared/components/icons/FavoriteIcon'
import FavoriteFillIcon from '@/shared/components/icons/FavoriteFillIcon'
import CheckBoxIcon from '@/shared/components/icons/CheckBoxIcon'
import { getStopShopId } from '../../../../utils/stopUtils'
import Image from 'next/image'
import { handleImageError } from '@/shared/utils/handleImageError'

interface Props {
  stop: CourseStopDto | SharedStopDto
  isStamped?: boolean
  onToggleStamp?: (shopId: number) => void
  isLiked?: boolean
  onToggleLike?: (shopId?: number) => void
  showStamp?: boolean
}

export function CourseStopCard({
  stop,
  isStamped = false,
  onToggleStamp,
  isLiked = false,
  onToggleLike,
  showStamp = true,
}: Props) {
  const router = useRouter()
  const shopId = getStopShopId(stop)
  const { openDialog, closeDialog } = useDialog()

  const handleLike = () => {
    onToggleLike?.(shopId)
  }

  const handleNavigate = () => {
    router.push(`/shop/${stop.shop.id}`)
  }

  const handleStamp = () => {
    const stampConfig = isStamped
      ? {
          title: '방문 도장 취소할까요?',
          message: '이 소품샵의 방문 기록이 해제돼요.',
          leftLabel: '닫기',
          rightLabel: '도장 취소',
        }
      : {
          title: '방문 도장 찍을까요?',
          message: '이 소품샵을 방문한 곳으로 기록돼요. 이후에도 변경할 수 있어요.',
          leftLabel: '취소',
          rightLabel: '도장찍기',
        }

    openDialog({
      type: 'confirm',
      ...stampConfig,
      onConfirm: () => {
        onToggleStamp?.(shopId)
        closeDialog()
      },
      onCancel: closeDialog,
    })
  }

  return (
    <>
      <div className="flex items-center gap-10 overflow-hidden rounded-2xl bg-white p-16 shadow-sm">
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400 font-caption">
          {stop.orderIndex}
        </div>
        <div className="relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
          <Image src={stop.shop.mainImage || '/images/default_item.svg'} fill alt={stop.shop.name} className="object-cover" onError={handleImageError} />
          <button type="button" onClick={handleLike} className="absolute left-[6px] top-[6px]">
            {isLiked ? <FavoriteFillIcon fill="var(--etc-red)" /> : <FavoriteIcon />}
          </button>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="font-subtitle_m truncate text-gray-900">{stop.shop.name}</span>
          {showStamp && (
            <button
              type="button"
              onClick={handleNavigate}
              className="font-body_s flex w-fit items-center gap-1 text-gray-400"
            >
              <NavigationArrowIcon width="12.67" height="12.67" fill="rgba(126, 132, 140, 1)" rotate={90} />
              <span className="color-gray-500 ml-4 font-caption">길찾기</span>
            </button>
          )}
        </div>
        {showStamp && (
          <button type="button" onClick={handleStamp} className="flex-shrink-0">
            <CheckBoxIcon checked={isStamped} width="28" height="28" />
          </button>
        )}
      </div>
    </>
  )
}
