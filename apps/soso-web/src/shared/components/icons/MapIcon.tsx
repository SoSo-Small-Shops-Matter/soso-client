import { IconProps } from '@/shared/types/shareType'

export default function MapIcon({ width = '16', height = '16' }: IconProps) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${width}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2341_12170)" transform={`translate(${(+width - 20) / 2}, ${(+width - 19.53) / 2})`}>
        <path
          d="M12.1098 3.32C12.6698 3.6 13.3398 3.6 13.8998 3.32L17.5598 1.49C18.0498 1.24 18.6498 1.44 18.8998 1.94C18.9698 2.08 19.0098 2.23 19.0098 2.39V15.15C19.0098 15.53 18.7998 15.87 18.4598 16.04L13.9098 18.32C13.3498 18.6 12.6798 18.6 12.1198 18.32L7.90977 16.21C7.34977 15.93 6.67977 15.93 6.11977 16.21L2.45977 18.04C1.96977 18.29 1.36977 18.09 1.11977 17.59C1.04977 17.45 1.00977 17.3 1.00977 17.14V4.38C1.00977 4 1.21977 3.66 1.55977 3.49L6.10977 1.21C6.66977 0.93 7.33977 0.93 7.89977 1.21L12.1098 3.32Z"
          stroke="#72787F"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M13 3.52979V18.5298" stroke="#72787F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 1V16" stroke="#72787F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_2341_12170">
          <rect width="20" height="19.53" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
