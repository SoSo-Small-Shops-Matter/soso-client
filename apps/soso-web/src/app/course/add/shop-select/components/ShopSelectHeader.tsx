import BackIcon from '@/shared/components/icons/BackIcon'

interface ShopSelectHeaderProps {
  onBack: () => void
}

export default function ShopSelectHeader({ onBack }: ShopSelectHeaderProps) {
  return (
    <div className="fixed left-0 top-0 z-sticky h-56 w-full bg-white layout-center">
      <div className="relative flex h-full w-full items-center justify-between px-20">
        <button type="button" onClick={onBack}>
          <BackIcon />
        </button>
        <h2 className="position-center min-w-[200px] text-center font-title4_semi">코스 추가하기</h2>
        <div className="w-24" />
      </div>
    </div>
  )
}
