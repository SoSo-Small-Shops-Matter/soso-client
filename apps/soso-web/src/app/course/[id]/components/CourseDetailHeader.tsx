import BackIcon from '@/shared/components/icons/BackIcon'

interface Props {
  title: string
  onBack?: () => void
  onMore?: () => void
}

export function CourseDetailHeader({ title, onBack, onMore }: Props) {
  return (
    <div className="row-gap-10 flex h-[52px] items-center justify-between bg-white px-16">
      <button type="button" onClick={onBack} className="flex items-center justify-center">
        <BackIcon />
      </button>
      <span className="max-w-[90px] flex-1 truncate text-center text-lg font-bold text-black">
        {title.trim()}
      </span>
      <div className="flex items-center gap-12">
        <button type="button" className="flex items-center justify-center">
          <img src="/images/course/share.svg" alt="공유" className="size-24" />
        </button>
        <button type="button" onClick={onMore} className="flex items-center justify-center">
          <span className="text-xl font-bold leading-none tracking-widest text-black">···</span>
        </button>
      </div>
    </div>
  )
}
