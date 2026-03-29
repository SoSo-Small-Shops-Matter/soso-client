import { motion } from 'framer-motion'

interface BackDropProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export default function Backdrop({ onClick }: BackDropProps) {
  return (
    <motion.div
      onClick={onClick && onClick}
      className="fixed top-0 z-backdrop h-screen bg-black-50 layout-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  )
}
