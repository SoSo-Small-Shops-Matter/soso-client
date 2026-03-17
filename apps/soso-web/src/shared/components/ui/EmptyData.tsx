interface EmptyDataProps {
  text: string
}

export default function EmptyData({ text }: EmptyDataProps) {
  return <div className="w-full rounded-12 bg-gray-50 px-18 py-16 text-gray-400 font-body2_m">{text}</div>
}
