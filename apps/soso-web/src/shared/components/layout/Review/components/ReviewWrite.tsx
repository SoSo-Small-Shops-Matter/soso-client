'use client'

import { useGetShopDetailQuery } from '@/app/shop/hooks/useGetShopDetailQuery'
import Button from '@/shared/components/button/Button'
import ModalCloseButton from '@/shared/components/button/MocalCloseButton'
import Textarea from '@/shared/components/inputs/Textarea'
import Flex from '@/shared/components/layout/Flex'
import InputContent from '@/shared/components/layout/InputContent'
import { usePatchReviewMutation } from '@/shared/components/layout/Review/components/ReviewWrite/hooks/usePatchReviewMutation'
import { usePostReviewMutation } from '@/shared/components/layout/Review/components/ReviewWrite/hooks/usePostReviewMutation'
import {
  PatchReviewRequestType,
  ReviewRequestType,
} from '@/shared/components/layout/Review/components/ReviewWrite/types'
import Loading from '@/shared/components/loading/Loading'
import BottomModal from '@/shared/components/modal/BottomModal'
import BottomModalTitle from '@/shared/components/text/BottomModalTitle'
import AddFileUi from '@/shared/components/ui/AddFileUi'
import { useToast } from '@/shared/context/ToastContext'
import { useFileUpload } from '@/shared/hooks/useFileUpload'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

interface ReviewWriteProps {
  isOpen: boolean
  isEdit?: boolean
  onClose: () => void
}

export default function ReviewWrite({ isOpen, onClose, isEdit }: ReviewWriteProps) {
  const [content, setContent] = useState('')
  const [lengthError, setLengthError] = useState(false)
  const [prevImages, setPrevImages] = useState<{ id: number; url: string }[]>([])
  const [deleteFiles, setDeleteFiles] = useState<number[]>([])

  const { id } = useParams()
  const { openToast } = useToast()

  const { mutate: postReviewMutate, isPending: postReviewPending } = usePostReviewMutation()
  const { mutate: patchReviewMutate, isPending: patchReviewPending } = usePatchReviewMutation()
  const { data: detailData, refetch: detailRefetch } = useGetShopDetailQuery(String(id))
  const { files, previews, resetFiles, addFiles, removeFile } = useFileUpload(10, prevImages.length)

  const handleImageDelete = (index: number) => {
    const imageToDelete = prevImages[index].id

    if (imageToDelete) {
      setDeleteFiles((prev) => [...prev, imageToDelete])
    }

    const newImages = [...prevImages]
    newImages.splice(index, 1)

    setPrevImages(newImages)
  }

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  useEffect(() => {
    if (content.length > 100) {
      setLengthError(true)
    } else {
      setLengthError(false)
    }
  }, [content])

  const handleSubmitReview = () => {
    if (!detailData) return

    if (isEdit) {
      const data: PatchReviewRequestType = {
        shopId: detailData.shop.id,
        reviewId: Number(detailData.userReviews[0].id),
        content,
        deleteReviewImages: deleteFiles,
        newReviewImages: files,
      }
      patchReviewMutate(data, {
        onSuccess: () => {
          detailRefetch()
          onClose()
          openToast({
            message: '리뷰가 수정되었습니다.',
          })
        },
      })
    } else {
      const data: ReviewRequestType = {
        shopId: Number(id),
        content,
        reviewImages: files,
      }
      postReviewMutate(data, {
        onSuccess: () => {
          detailRefetch()
          onClose()
          openToast({
            message: '리뷰가 등록되었습니다.',
          })
        },
      })
    }
  }

  useEffect(() => {
    if (!detailData || !isEdit) return
    setPrevImages(detailData?.userReviews[0]?.images || [])
    setContent(detailData?.userReviews[0].content)
  }, [detailData, isOpen, isEdit])

  useEffect(() => {
    setLengthError(false)
    setDeleteFiles([])
    resetFiles()
  }, [isOpen])

  return (
    <BottomModal isOpen={isOpen} onClose={onClose}>
      <Flex direction="col" gap={18} className="w-full">
        <Flex justify="between" align="center" className="w-full">
          <BottomModalTitle title={isEdit ? '후기 수정' : '후기 작성'} />
          <ModalCloseButton onClick={onClose} />
        </Flex>
        <Flex direction="col" gap={38} className="w-full">
          <InputContent label="텍스트" className="relative">
            <Textarea
              maxLength={100}
              lengthError={lengthError}
              value={content || ''}
              onChange={handleChangeContent}
              placeholder={`💭 어떤 소품을 구매하셨나요?
💕 소품샵 방문 후 가장 좋았던 점이 있나요?`}
            />
          </InputContent>
          <InputContent label="사진">
            <Flex direction="col" gap={8} className="w-full">
              <AddFileUi
                previewArr={previews}
                images={prevImages}
                addFiles={addFiles}
                removeFile={removeFile}
                removePrevFile={handleImageDelete}
                maxLength={10}
              />
              <p className="text-gray-400 font-body2_m">사진은 최대 10장까지 등록가능합니다.</p>
            </Flex>
          </InputContent>
        </Flex>
        <Button
          onClick={handleSubmitReview}
          disabled={(isEdit ? !content.length : !content.length) || lengthError}
          title={isEdit ? '후기 수정' : '후기 작성'}
        />
      </Flex>

      {(postReviewPending || patchReviewPending) && <Loading />}
    </BottomModal>
  )
}
