import { useEffect, useState } from 'react'
import Button from '@/shared/components/button/Button'
import ModalCloseButton from '@/shared/components/button/MocalCloseButton'
import SellProduct from '@/shared/components/card/SellProduct'
import Flex from '@/shared/components/layout/Flex'
import BottomModal from '@/shared/components/modal/BottomModal'
import BottomModalTitle from '@/shared/components/text/BottomModalTitle'
import { PRODUCT_LIST } from '@/shared/constant/Product'
import { ProductType } from '@/shared/types/shopType'
import CheckIcon from '@/shared/components/icons/CheckIcon'

interface SelectCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  categoryIdList: number[]
  onSubmit: (idList: number[]) => void
}

export const DEFAULT_CATEGORY_ID_LIST = []
const ALL_CATEGORY_ID_LIST = PRODUCT_LIST.map((item) => item.id)

export default function SelectCategoryModal({
  isOpen,
  onClose,
  categoryIdList: initList,
  onSubmit,
}: SelectCategoryModalProps) {
  const [idList, setIdList] = useState<number[]>([])
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)

  const toggleCategory = (product: ProductType) => {
    const isProductInList = idList.some((prevId) => prevId === product.id)
    const updatedList = isProductInList ? idList.filter((prevId) => prevId !== product.id) : [...idList, product.id]
    setIdList(updatedList)
  }

  const onClickSubmit = () => {
    onSubmit(idList)
    handleCloseModal()
  }

  const handleCloseModal = () => {
    onClose()
  }

  const togglekSelectAll = () => {
    if (isSelectedAll) {
      setIdList([])
    } else {
      setIdList(ALL_CATEGORY_ID_LIST)
    }
  }

  useEffect(() => {
    if (ALL_CATEGORY_ID_LIST.every((id) => idList.includes(id))) {
      setIsSelectedAll(true)
    } else {
      setIsSelectedAll(false)
    }
  }, [idList])

  useEffect(() => {
    const isDefault = initList.length === 0
    setIdList(isDefault ? DEFAULT_CATEGORY_ID_LIST : initList)
  }, [initList])

  return (
    <BottomModal isOpen={isOpen} onClose={handleCloseModal}>
      <Flex direction="col" gap={18}>
        <Flex className="w-full" justify="between" align="center">
          <Flex direction="col">
            <BottomModalTitle title="카테고리" />
            <div className="text-gray-500 font-body2_m">원하는 카테고리를 선택해 주세요.</div>
            <div className="row mt-20 flex items-center" onClick={togglekSelectAll}>
              {isSelectedAll ? (
                <div className="h-24 w-24 rounded-4 border-main bg-main">
                  <CheckIcon fill={'white'} />
                </div>
              ) : (
                <div className="h-24 w-24 rounded-4 border-2 border-gray-200"></div>
              )}
              <span className="ml-4 text-black font-body2_m">전체 선택</span>
            </div>
          </Flex>
          <ModalCloseButton onClick={handleCloseModal} />
        </Flex>
        <Flex direction="col" gap={38} align="center">
          <Flex align="center" wrap gap={16}>
            {PRODUCT_LIST.map((category: ProductType) => (
              <SellProduct
                key={category.id}
                product={category}
                checkbox
                onClick={toggleCategory}
                isCheck={idList.some((id) => id === category.id)}
                isModal
              />
            ))}
          </Flex>
          <Flex className="w-full" direction="row" gap={9} align="center">
            <Button onClick={onClickSubmit} title="선택하기" disabled={!idList.length} />
          </Flex>
        </Flex>
      </Flex>
    </BottomModal>
  )
}
