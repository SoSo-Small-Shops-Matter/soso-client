import { ButtonHTMLAttributes, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  icon: ReactNode
}

export default function IconButton({ label, icon, ...props }: IconButtonProps) {
  return (
    <button className="flex items-center gap-2" {...props}>
      <span className="text-gray-400 font-caption">{label}</span>
      {icon}
    </button>
  )
}
