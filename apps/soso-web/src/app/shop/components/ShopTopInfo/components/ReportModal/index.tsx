'use client'

import ReportRadio from '@/app/shop/components/ShopTopInfo/components/ReportModal/components/ReportRadio'
import { REPORT_LIST } from '@/app/shop/components/ShopTopInfo/components/ReportModal/constant/reportList'
import { usePatchReportMutation } from '@/app/shop/components/ShopTopInfo/components/ReportModal/hooks/usePatchReportMutation'
import Button from '@/shared/components/button/Button'
import ModalCloseButton from '@/shared/components/button/MocalCloseButton'
import Flex from '@/shared/components/layout/Flex'
import BottomModal from '@/shared/components/modal/BottomModal'
import { useDialog } from '@/shared/context/DialogContext'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { ShopReportTypeValue } from './types'

interface ReportModalProps {
  isReportModal: boolean
  handleToggleReportModal: () => void
}
export default function ReportModal({ isReportModal, handleToggleReportModal }: ReportModalProps) {
  const [selectedReportType, setSelectedReportType] = useState<ShopReportTypeValue | undefined>()
  const { id } = useParams()
  const { openDialog } = useDialog()

  const { mutate: patchReportMutate } = usePatchReportMutation()

  const handleChange = (type: ShopReportTypeValue) => {
    setSelectedReportType(type)
  }

  const handleSubmitReport = () => {
    const shopId = Number(id)
    if (!selectedReportType || isNaN(shopId)) return
    const data = {
      shopId: shopId,
      type: selectedReportType,
    }

    patchReportMutate(data, {
      onSuccess: () => {
        handleToggleReportModal()
        openDialog({
          type: 'alert',
          title: '신고 완료',
          message: (
            <span>
              소중한 정보 감사합니다.
              <br />
              확인 후 해당 장소는 삭제될 예정입니다.
            </span>
          ),
        })
        setSelectedReportType(undefined)
      },
    })
  }

  return (
    <BottomModal isOpen={isReportModal} onClose={handleToggleReportModal}>
      <Flex direction="col" gap={18} className="relative w-full">
        <Flex justify="between" align="center" className="w-full">
          <h4 className="font-title3_bold">신고 사유</h4>
          <ModalCloseButton onClick={handleToggleReportModal} />
        </Flex>

        <Flex direction="col" gap={0} className="w-full">
          {REPORT_LIST.map((list) => (
            <ReportRadio
              key={`shop_report_reason_${list.type}`}
              text={list.text}
              id={list.type}
              name={list.name}
              isChecked={selectedReportType === list.type}
              onChange={() => handleChange(list.type)}
            />
          ))}
        </Flex>
        <Button disabled={!selectedReportType} title="신고하기" onClick={handleSubmitReport} className="mt-16" />
      </Flex>
    </BottomModal>
  )
}
