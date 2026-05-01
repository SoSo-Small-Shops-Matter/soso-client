import { usePathname } from 'next/navigation';

export const useIsNavigation = () => {
  const pathname = usePathname();

  const isNavigation = pathname === '/' || pathname === '/search' || pathname === '/report' || pathname === '/my' || pathname === '/course';

  return isNavigation;
};
