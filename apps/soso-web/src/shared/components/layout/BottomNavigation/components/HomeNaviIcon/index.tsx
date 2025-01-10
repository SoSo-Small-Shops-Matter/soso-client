import { IconProps } from '@/shared/types/shareType';

export default function HomeNaviIcon({ isActive }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_181_2820)">
        <path
          d="M13.2 2.65C12.8538 2.39036 12.4327 2.25 12 2.25C11.5673 2.25 11.1462 2.39036 10.8 2.65L3.8 7.9C3.55161 8.08629 3.35 8.32786 3.21115 8.60557C3.07229 8.88328 3 9.18951 3 9.5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H8.9C9.19174 21 9.47153 20.8841 9.67782 20.6778C9.88411 20.4715 10 20.1917 10 19.9V15C10 14.4696 10.2107 13.9609 10.5858 13.5858C10.9609 13.2107 11.4696 13 12 13C12.5304 13 13.0391 13.2107 13.4142 13.5858C13.7893 13.9609 14 14.4696 14 15V19.9C14 20.1917 14.1159 20.4715 14.3222 20.6778C14.5285 20.8841 14.8083 21 15.1 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V9.5C21 9.18951 20.9277 8.88328 20.7889 8.60557C20.65 8.32786 20.4484 8.08629 20.2 7.9L13.2 2.65Z"
          fill={isActive ? '#FF7F50' : '#C9CDD2'}
        />
      </g>
      <defs>
        <clipPath id="clip0_181_2820">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
