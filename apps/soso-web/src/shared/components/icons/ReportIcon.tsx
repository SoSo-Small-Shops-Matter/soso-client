import { IconProps } from '@/shared/types/shareType'

export default function ReportIcon({ width, height }: IconProps) {
  return (
    <svg
      width={width || '32'}
      height={width || '32'}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 12.7273C8 10.6779 8.84285 8.71241 10.3431 7.26327C11.8434 5.81412 13.8783 5 16 5C18.1217 5 20.1566 5.81412 21.6569 7.26327C23.1571 8.71241 24 10.6779 24 12.7273V22H8V12.7273Z"
        stroke="#9EA4AA"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 25C5 24.2044 5.33112 23.4413 5.92052 22.8787C6.50992 22.3161 7.30932 22 8.14286 22H23.8571C24.6907 22 25.4901 22.3161 26.0795 22.8787C26.6689 23.4413 27 24.2044 27 25V28H5V25Z"
        stroke="#9EA4AA"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 13V22" stroke="#9EA4AA" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
