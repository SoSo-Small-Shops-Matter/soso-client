import ReportRadio from '@/app/shop/components/ShopTopInfo/components/ReportModal/components/ReportRadio'
import Button from '@/shared/components/button/Button'
import ModalCloseButton from '@/shared/components/button/MocalCloseButton'
import Textarea from '@/shared/components/inputs/Textarea'
import Flex from '@/shared/components/layout/Flex'
import { usePostReviewReportMutation } from '@/shared/api/review/queries'
import BottomModal from '@/shared/components/modal/BottomModal'
import { useDialog } from '@/shared/context/DialogContext'
import useInput from '@/shared/hooks/useInput'
import { useState } from 'react'
import { REVIEW_ETC_REPORT_ID, REVIEW_REPORT_LIST } from '@/shared/api/review/constants'

interface ReviewReportModalProps {
  shopId?: number
  reviewId?: number
  isReportModal: boolean
  handleToggleReportModal: () => void
}

export default function ReviewReportModal({
  shopId,
  reviewId,
  isReportModal,
  handleToggleReportModal,
}: ReviewReportModalProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { value: etcValue, onChange: handleChangeEtcValue, setValue: setEtcValue } = useInput('')
  const { openDialog } = useDialog()

  const { mutate: reviewReportMutate } = usePostReviewReportMutation()

  const handleChange = (reportId: number) => {
    if (!reviewId) return

    setSelectedId(reportId)
  }

  const handleSubmitReviewReport = () => {
    const data = {
      shopId: Number(shopId),
      reviewId: Number(reviewId),
      status: selectedId!,
      message: etcValue,
    }

    reviewReportMutate(data, {
      onSuccess: () => {
        handleToggleReportModal()
        setEtcValue('')
        openDialog({
          type: 'alert',
          title: '신고 완료',
          message: (
            <span>
              소중한 정보 감사합니다.
              <br />
              확인 후 해당 리뷰는 삭제될 예정입니다.
            </span>
          ),
        })
        setSelectedId(null)
      },
    })
  }

  return (
    <BottomModal isOpen={isReportModal} onClose={handleToggleReportModal}>
      <Flex direction="col" gap={18} className="relative w-full">
        <Flex justify="between" align="center" className="w-full">
          <h4 className="font-title_s">신고 사유</h4>
          <ModalCloseButton onClick={handleToggleReportModal} />
        </Flex>

        <Flex direction="col" gap={0} className="w-full">
          {REVIEW_REPORT_LIST.map((list) => (
            <ReportRadio
              key={list.id}
              text={list.text}
              id={String(list.id)}
              name={`reviewReport_${list.text}`}
              isChecked={selectedId === list.id}
              onChange={() => handleChange(list.id)}
            />
          ))}
          {selectedId === REVIEW_ETC_REPORT_ID && (
            <Textarea
              value={etcValue}
              onChange={handleChangeEtcValue}
              height="100px"
              placeholder="신고 사유를 입력해 주세요."
            />
          )}
        </Flex>
        <Button
          disabled={!selectedId && !etcValue}
          title="신고하기"
          onClick={handleSubmitReviewReport}
          className="mt-16"
        />
      </Flex>
    </BottomModal>
  )
}
