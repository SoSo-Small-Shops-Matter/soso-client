import MyProfile from '@/app/my/components/MyProfile'
import ProductLists from '@/app/my/components/ProductLists'
import Divider from '@/shared/components/divider/Divider'
import LinkIcon from '@/shared/components/icons/LinkIcon'
import SettingIcon from '@/shared/components/icons/SettingIcon'
import Flex from '@/shared/components/layout/Flex'
import Header from '@/shared/components/layout/Header'
import Link from 'next/link'

const MENU_LINKS = [
  { title: '작성한 후기', href: '/my/review' },
  { title: '방문한 소품샵', href: '/my/visited' },
  { title: '내가 알린 소품샵', href: '/my/shop' },
  { title: '소품샵 등록하기', href: '/report' },
]

export default function MyPage() {
  return (
    <div>
      <Header
        title="마이페이지"
        type="customBtn"
        customBtn={
          <Link href="/my/setting">
            <SettingIcon />
          </Link>
        }
      />
      <div className="w-full">
        <MyProfile />
      </div>
      <Divider height="10px" />
      <div className="w-full px-16 py-20">
        <ProductLists />
      </div>
      <Divider height="10px" />
      <Flex direction="col">
        {MENU_LINKS.map(({ title, href }) => (
          <Link key={href} href={href} className="font-subtitle_m flex w-full items-center justify-between p-16">
            {title}
            <LinkIcon />
          </Link>
        ))}
      </Flex>
    </div>
  )
}
