'use client'

import ToggleNotice from '@/app/my/setting/notice/components/ToggleNotice'
import { useGetNoticeQuery } from '@/shared/api/notice/queries'
import Flex from '@/shared/components/layout/Flex'
import Header from '@/shared/components/layout/Header'

export default function NoticePage() {
  const { data: noticeData } = useGetNoticeQuery()

  return (
    <div>
      <Header title="공지사항" type="back" />
      <Flex direction="col" className="w-full px-16">
        {noticeData && noticeData.length > 0 ? (
          noticeData?.map((notice) => (
            <ToggleNotice key={notice.id} title={notice.title} content={notice.text} date={notice.createdAt} />
          ))
        ) : (
          <p className="w-full pt-60 text-center text-gray-400 font-body_m">등록된 공지사항이 없습니다.</p>
        )}
      </Flex>
    </div>
  )
}
