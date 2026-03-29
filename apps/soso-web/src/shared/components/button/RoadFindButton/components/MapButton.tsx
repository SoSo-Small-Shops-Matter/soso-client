import { ButtonHTMLAttributes } from 'react'

interface MapButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export default function MapButton({ title, ...props }: MapButtonProps) {
  return (
    <button className="h-56 w-full rounded-16 bg-gray-50 font-body1_m" {...props}>
      {title}
    </button>
  )
}
