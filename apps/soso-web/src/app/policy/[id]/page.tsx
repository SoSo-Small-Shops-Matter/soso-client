'use client'

import { POLICY_CONTENT } from '@/app/my/setting/policy/constants'
import Header from '@/shared/components/layout/Header'
import { useParams } from 'next/navigation'

export default function PolicyContentPage() {
  const { id }: { id: 'location' | 'personal-information' } = useParams()

  const title = id ? POLICY_CONTENT[id].title : ''
  const content = id ? POLICY_CONTENT[id].content : ''

  return (
    <div>
      <Header title={title} type="back" />
      <div className="px-16 py-20">
        <pre className="font-['Pretendard'] text-gray-500 font-body_s">{content}</pre>
      </div>
    </div>
  )
}
