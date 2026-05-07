interface BottomModalTitleProps {
  title: string
}

export default function BottomModalTitle({ title }: BottomModalTitleProps) {
  return <h3 className="text-black font-title_s">{title}</h3>
}
