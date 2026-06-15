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
      {/* 헤더 + 탭바 (fixed) */}
      {/* TODO: Header fixed 제거 후 사용, 지금은 tabbar sticky 충돌로 staic으로 header 만들어놓음 */}
      <div className="fixed left-0 top-0 z-sticky w-full bg-white layout-center">
        <div className="flex h-56 items-center px-20">
          <h1 className="text-gray-800 font-title_s">소품샵 코스</h1>
        </div>
        <div className="border-b border-gray-100">
          <div className="flex">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={clsx(
                  'flex-1 py-12 transition-colors',
                  activeTab === tab.value
                    ? 'border-b-2 border-gray-900 text-gray-900 font-subtitle_m'
                    : 'border-b-2 border-transparent text-gray-500 font-body_m'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 코스 목록 — 헤더(56px) + 탭바(~48px) 높이만큼 패딩 */}
      <div className="pb-[72px] pt-48">
        <CourseList items={data?.items ?? []} isLoading={isLoading} />
      </div>

      {/* 코스 추가 버튼 */}
      <div className="fixed bottom-[72px] left-1/2 z-sticky max-w-screen -translate-x-1/2 px-20">
        <Link href="/course/add">
          <Button title="+ 코스 추가하기" size="large" />
        </Link>
      </div>
    </div>
  )
}
