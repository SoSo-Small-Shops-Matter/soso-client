import XIcon from '@/shared/components/icons/XIcon'
import NaverMap from '@/shared/components/layout/NaverMap'

interface FullMap {
  isOpen: boolean
  onClose: () => void
}
export default function FullMap({ isOpen, onClose }: FullMap) {
  return (
    isOpen && (
      <div className="fixed top-0 z-important h-screen bg-white layout-center">
        <NaverMap height="100%" />
        <button onClick={onClose} className="fixed right-24 top-24">
          <XIcon />
        </button>
      </div>
    )
  )
}
