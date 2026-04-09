import type { Metadata } from 'next'
import RootLayoutProvider from '@/shared/components/provider/RootLayoutProvider'
import './globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import { Amplitude } from '@/shared/utils/amplitude'

export const metadata: Metadata = {
  title: '소품샵은 소중해 | 소중한 소품샵 추천 앱',
  description: '내 주변 소품샵을 찾고 기록을 남겨보세요!',
  keywords: '소품샵, 소품샵 추천, 감성 소품샵, 캐릭터샵, 빈티지샵, 서울 소품샵, 소소 앱',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Amplitude />
      <body>
        <RootLayoutProvider>{children}</RootLayoutProvider>
      </body>
    </html>
  )
}
