import { ReactNode } from 'react'

interface MessageBoxProps {
  children: ReactNode
  isMe?: boolean
  isWrite?: boolean
}

export default function MessageBox({ children, isMe, isWrite }: MessageBoxProps) {
  return (
    <div
      style={{
        backgroundColor: isMe && isWrite ? '#FFF2EE' : '#F7F8F9',
      }}
      className="relative w-full rounded-12 px-18 py-16 text-gray-600 font-body2_m"
    >
      {children}
      <svg
        className="absolute -top-11 left-17"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.40192 1.5C6.55662 -0.499998 9.44338 -0.499999 10.5981 1.5L14.9282 9C16.0829 11 14.6395 13.5 12.3301 13.5L3.66987 13.5C1.36047 13.5 -0.0829034 11 1.0718 9L5.40192 1.5Z"
          fill={isMe && isWrite ? '#FFF2EE' : '#F7F8F9'}
        />
      </svg>
    </div>
  )
}
