import CopyIcon from '@/shared/components/icons/CopyIcon'
import ShareIcon from '@/shared/components/icons/ShareIcon'
import ProfileImage from '@/shared/components/ui/ProfileImage'
import { getSafeImageUrl } from '@/shared/utils/getSafeImageUrl'

interface Props {
  title: string
  profileImg?: string | null
  nickname?: string | null
  onSaveCourse?: () => void
  onShare?: () => void
}

export function CourseSharedHeader({ title, onSaveCourse, onShare, nickname, profileImg }: Props) {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex h-[52px] items-center justify-between px-20 py-13">
        <span className="flex-1 truncate font-title_s text-gray-900">{title.trim()}</span>
        <div className="flex items-center gap-12">
          <button type="button" onClick={onSaveCourse} className="flex items-center justify-center">
            <CopyIcon />
          </button>
          <button type="button" onClick={onShare} className="flex items-center justify-center">
            <ShareIcon />
          </button>
        </div>
      </div>

      <div className="pointer-events-none flex items-center gap-8 px-16 pb-4">
        <ProfileImage imgUrl={getSafeImageUrl(profileImg)} size={28} />
        <span className="font-body_s text-gray-700">{nickname ?? '닉네임'}</span>
      </div>
    </div>
  )
}
