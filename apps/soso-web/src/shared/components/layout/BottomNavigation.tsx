import HomeNaviIcon from '@/shared/components/layout/BottomNavigation/components/HomeNaviIcon'
import MyNaviIcon from '@/shared/components/layout/BottomNavigation/components/MyNaviIcon'
import ReportNaviIcon from '@/shared/components/layout/BottomNavigation/components/ReportNaviIcon'
import SearchNaviIcon from '@/shared/components/layout/BottomNavigation/components/SearchNaviIcon'
import Flex from '@/shared/components/layout/Flex'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default function BottomNavigation() {
  const pathname = usePathname()

  const MENU = [
    {
      label: '홈',
      icon: <HomeNaviIcon isActive={pathname === '/'} />,
      href: '/',
    },
    {
      label: '검색',
      icon: <SearchNaviIcon isActive={pathname.includes('/search')} />,
      href: '/search',
    },
    {
      label: '등록',
      icon: <ReportNaviIcon isActive={pathname.includes('/report')} />,
      href: '/report',
    },
    {
      label: '마이페이지',
      icon: <MyNaviIcon isActive={pathname.includes('/my')} />,
      href: '/my',
    },
  ]

  type MenuType = {
    label: string
    icon: ReactNode
    href: string
  }

  return (
    <Flex className="fixed bottom-0 left-0 z-sticky w-full bg-white layout-center">
      {MENU.map((menu: MenuType) => (
        <Link href={menu.href} key={menu.href} className="flex-1 pb-6 pt-7">
          <Flex direction="col" gap={5} align="center" className="h-full w-full">
            {menu.icon}
            {menu.href === '/' ? (
              <span className={`font-caption ${pathname === menu.href ? 'text-main' : 'text-gray-400'} `}>
                {menu.label}
              </span>
            ) : (
              <span className={`font-caption ${pathname.includes(menu.href) ? 'text-main' : 'text-gray-400'} `}>
                {menu.label}
              </span>
            )}
          </Flex>
        </Link>
      ))}
    </Flex>
  )
}
