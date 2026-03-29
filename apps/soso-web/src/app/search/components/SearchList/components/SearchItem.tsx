import DeleteIcon from '@/shared/components/icons/DeleteIcon'
import Link from 'next/link'
import { MouseEvent } from 'react'

interface SearchItemProps {
  label: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  id: number
}

export default function SearchItem({ label, onClick, id }: SearchItemProps) {
  return (
    <Link href={`/shop/${id}`} className="flex items-center gap-4 rounded-full border border-gray-100 px-10 py-6">
      <span className="text-gray-600 font-body2_m">{label}</span>
      <button onClick={onClick}>
        <DeleteIcon />
      </button>
    </Link>
  )
}
