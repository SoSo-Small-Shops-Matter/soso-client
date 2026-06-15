import CheckIcon from '@/shared/components/icons/CheckIcon'
import { RegionType } from '@/shared/api/my/types'

interface FilterSelectButtonProps {
  region: RegionType
  active?: boolean
  onClick: (region: RegionType) => void
}

export default function FilterSelectButton({ region, active, onClick }: FilterSelectButtonProps) {
  return (
    <button className="flex h-44 w-full items-center justify-between px-14 py-10" onClick={() => onClick(region)}>
      <span className="text-gray-900 font-body_s">{region.name}</span>
      {active && <CheckIcon />}
    </button>
  )
}
