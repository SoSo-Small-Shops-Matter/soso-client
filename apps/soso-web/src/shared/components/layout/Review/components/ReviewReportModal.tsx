import ReportRadio from '@/app/shop/components/ShopTopInfo/components/ReportModal/components/ReportRadio'
import Button from '@/shared/components/button/Button'
import ModalCloseButton from '@/shared/components/button/MocalCloseButton'
import Textarea from '@/shared/components/inputs/Textarea'
import Flex from '@/shared/components/layout/Flex'
import { REVIEW_REPORT_LIST } from '@/shared/components/layout/Review/components/ReviewReportModal/constants/ReviewReportList'
import { usePostReviewReportMutation } from '@/shared/components/layout/Review/components/ReviewReportModal/hooks/usePostReviewReportMutation'
import BottomModal from '@/shared/components/modal/BottomModal'
import { useDialog } from '@/shared/context/DialogContext'
import useInput from '@/shared/hooks/useInput'
import { CustomError } from '@/shared/utils/customFetch'
import { useState } from 'react'

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
  const [selectedId, setSelectedId] = useState<string>('')
  const { value: etcValue, onChange: handleChangeEtcValue, setValue: setEtcValue } = useInput('')
  const { openDialog } = useDialog()

  const { mutate: reviewReportMutate } = usePostReviewReportMutation()

  const handleChange = (reportId: string) => {
    if (!reviewId) return

    setSelectedId(reportId)
  }

  const handleSubmitReviewReport = () => {
    const data = {
      shopId: Number(shopId),
      reviewId: Number(reviewId),
      status: Number(selectedId),
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
        setSelectedId('')
      },
      onError: (error: unknown) => {
        if (error instanceof CustomError) {
          const responseData = error.data
          if (responseData.status === 409) {
            handleToggleReportModal()
            setSelectedId('')
            setEtcValue('')
            openDialog({
              title: '이미 신고한 후기입니다.',
              type: 'alert',
            })
          }
        } else {
          console.log('알 수 없는 에러:', error)
        }
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
          {REVIEW_REPORT_LIST.map((list) => (
            <ReportRadio
              key={list.id}
              text={list.text}
              id={list.id}
              name={list.name}
              isChecked={selectedId === list.id}
              onChange={() => handleChange(list.id)}
            />
          ))}
          {selectedId === '6' && (
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
