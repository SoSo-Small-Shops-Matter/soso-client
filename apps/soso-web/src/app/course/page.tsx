'use client'

import clsx from 'clsx'
import { useState } from 'react'
import Link from 'next/link'
import Button from '@/shared/components/button/Button'
import { useGetCoursesQuery } from '@/shared/api/course/queries'
import { COURSE_STATUS, type CourseStatus, type GetCoursesParams } from '@/shared/api/course/types'
import CourseList from './components/CourseList'

type TabValue = 'all' | CourseStatus

const TABS: { label: string; value: TabValue }[] = [
  { label: '전체', value: 'all' },
  { label: '진행 중', value: COURSE_STATUS.IN_PROGRESS },
  { label: '완료', value: COURSE_STATUS.COMPLETED },
]

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState<TabValue>('all')

  const params: GetCoursesParams = activeTab === 'all' ? {} : { status: activeTab }
  const { data, isLoading } = useGetCoursesQuery(params)

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="px-20 pb-0 pt-4">
        <h1 className="text-gray-800 font-title1">소품샵 코스</h1>
      </div>

      {/* 탭바 */}
      <div className="sticky top-56 z-dropdown border-b border-gray-100 bg-white px-20">
        <div className="flex">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={clsx(
                'flex-1 py-14 transition-colors font-body1_m',
                activeTab === tab.value
                  ? 'border-b-2 border-gray-800 text-gray-800'
                  : 'border-b-2 border-transparent text-gray-400'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 코스 목록 */}
      <CourseList items={data?.items ?? []} isLoading={isLoading} />

      {/* 코스 추가 버튼 */}
      <div className="fixed bottom-[72px] left-1/2 z-sticky w-full max-w-screen -translate-x-1/2 px-20">
        <Link href="/course/add">
          <Button title="+ 코스 추가하기" />
        </Link>
      </div>
    </div>
  )
}
