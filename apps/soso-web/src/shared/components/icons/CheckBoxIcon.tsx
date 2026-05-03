import { IconProps } from '@/shared/types/shareType'

interface CheckBoxIcon extends IconProps {
  checked: boolean
}

export default function CheckIcon({ width, height, fill, checked }: CheckBoxIcon) {
  return checked ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '20'}
      height={height || '20'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" fill="#FF7F50" />
      <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="#FF7F50" strokeWidth="1.5" />
      <path
        d="M15.1133 6.38714C15.4517 6.7256 15.4517 7.27434 15.1133 7.61279L9.11328 13.6128C8.77483 13.9512 8.22609 13.9512 7.88763 13.6128L4.88763 10.6128C4.54918 10.2743 4.54918 9.7256 4.88763 9.38714C5.22608 9.04869 5.77483 9.04869 6.11328 9.38714L8.50046 11.7743L13.8876 6.38714C14.2261 6.04869 14.7748 6.04869 15.1133 6.38714Z"
        fill={fill || 'white'}
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '20'}
      height={height || '20'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" fill="#E8EBED" />
      <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="#E8EBED" strokeWidth="1.5" />
      <path
        d="M15.1133 6.38714C15.4517 6.7256 15.4517 7.27434 15.1133 7.61279L9.11328 13.6128C8.77483 13.9512 8.22609 13.9512 7.88763 13.6128L4.88763 10.6128C4.54918 10.2743 4.54918 9.7256 4.88763 9.38714C5.22608 9.04869 5.77483 9.04869 6.11328 9.38714L8.50046 11.7743L13.8876 6.38714C14.2261 6.04869 14.7748 6.04869 15.1133 6.38714Z"
        fill={fill || 'white'}
      />
    </svg>
  )
}
