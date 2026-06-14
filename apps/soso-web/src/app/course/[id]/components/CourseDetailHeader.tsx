import BackIcon from '@/shared/components/icons/BackIcon'
import ShareIcon from '@/shared/components/icons/ShareIcon'

interface Props {
  title: string
  onBack?: () => void
  onMore?: () => void
  onShare?: () => void
}

export function CourseDetailHeader({ title, onBack, onMore, onShare }: Props) {
  return (
    <div className="row-gap-10 flex h-[52px] items-center justify-between px-16">
      <button type="button" onClick={onBack} className="flex items-center justify-center">
        <BackIcon />
      </button>
      <span className="max-w-[90px] flex-1 truncate text-center text-gray-900 font-subtitle_l">{title.trim()}</span>
      <div className="flex items-center gap-12">
        <button type="button" className="flex items-center justify-center" onClick={onShare}>
          <ShareIcon />
        </button>
        <button type="button" onClick={onMore} className="flex items-center justify-center">
          <span className="leading-none tracking-widest text-gray-900 font-title_s">···</span>
        </button>
      </div>
    </div>
  )
}
