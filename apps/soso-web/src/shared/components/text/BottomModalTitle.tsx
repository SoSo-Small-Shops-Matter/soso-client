interface BottomModalTitleProps {
  title: string
}

export default function BottomModalTitle({ title }: BottomModalTitleProps) {
  return <h3 className="text-black font-title3_bold">{title}</h3>
}
