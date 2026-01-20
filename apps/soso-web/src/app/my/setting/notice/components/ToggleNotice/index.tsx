'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ToggleIcon from '@/app/my/setting/notice/components/ToggleNotice/components/ToggleIcon'
import Flex from '@/shared/components/layout/Flex'
import { getFormatDateString } from '@repo/utils/formatDateString'

interface ToggleNoticeProps {
  title: string
  date: string
  content: string
}

export default function ToggleNotice({
  title = '공지사항 제목',
  date = '2024.01.01',
  content = '자기 개발은 목표를 설정하고 달성하기 위한 여정입니다. 이 블로그 포스트에서는 일상 생활에 쉽게 통합할 수 있는 5가지 핵심 습관을 소개합니다. 첫 번째는 목표 설정과 시간 관리입니다. 이는 개인적 성취와 전문적 성장을 위한 기초를 마련합니다. 두 번째 습관은 긍정적 사고를 통한 자기 격려입니다. 이는 도전을 극복하고 성공으로 나아가는 데 중요합니다. 세 번째는 건강 유지를 위한 일상적인 운동과 균형 잡힌 식단입니다. 건강한 몸은 능률적인 마음의 기초입니다. 네 번째는 지속적인 학습과 자기 계발입니다. 새로운 기술과 지식은 경쟁력을 높이고 삶의 질을 향상시킵니다. 마지막으로 다섯 번째 습관은 일상 속에서의 작은 목표 달성을 통해 성취감을 느끼는 것입니다. 이러한 습관들은 개인의 성장과 발전에 필수적이며, 이 글을 통해 자기 계발의 길을 찾는 데 도움을 줄 것입니다.',
}: ToggleNoticeProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleContent = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Flex direction="col" gap={16} className="w-full py-16">
      <button className="flex w-full flex-col items-start gap-4" onClick={toggleContent}>
        <Flex className="w-full justify-between">
          <h3 className="text-left text-gray-800 font-title4_semi">{title}</h3>
          <div>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ToggleIcon />
            </motion.div>
          </div>
        </Flex>
        <p className="text-gray-400 font-caption">{getFormatDateString(date, 'yyyy.MM.dd')}</p>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
            className="w-full"
          >
            <div className="w-full rounded-20 bg-gray-50 px-20 py-18 text-gray-500 font-body2_m">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}
