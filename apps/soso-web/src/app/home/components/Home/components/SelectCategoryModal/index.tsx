import { useEffect, useState } from 'react';
import Button from '@/shared/components/button/Button';
import ModalCloseButton from '@/shared/components/button/MocalCloseButton';
import SellProduct from '@/shared/components/card/SellProduct';
import Flex from '@/shared/components/layout/Flex';
import BottomModal from '@/shared/components/modal/BottomModal';
import BottomModalTitle from '@/shared/components/text/BottomModalTitle';
import { PRODUCT_LIST } from '@/shared/constant/Product';
import { ProductType } from '@/shared/types/shopType';

interface SelectCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryIdList: number[];
  onSubmit: (idList: number[]) => void;
}

export const DEFAULT_CATEGORY_ID_LIST = PRODUCT_LIST.map((item) => item.id);

export default function SelectCategoryModal({
  isOpen,
  onClose,
  categoryIdList: initList,
  onSubmit,
}: SelectCategoryModalProps) {
  const [idList, setIdList] = useState<number[]>([]);

  const toggleCategory = (id: number) => {
    const isProductInList = idList.some((prevId) => prevId === id);
    const updatedList = isProductInList ? idList.filter((prevId) => prevId !== id) : [...idList, id];
    setIdList(updatedList);
  };

  const onClickSubmit = () => {
    onSubmit(idList);
    handleCloseModal();
  };

  useEffect(() => {
    if (!isOpen) return;
  }, [isOpen]);

  const handleCloseModal = () => {
    onClose();
  };

  useEffect(() => {
    const isDefault = initList.length === 0;
    setIdList(isDefault ? DEFAULT_CATEGORY_ID_LIST : initList);
  }, [initList]);

  return (
    <BottomModal isOpen={isOpen} onClose={handleCloseModal}>
      <Flex direction="col" gap={18}>
        <Flex className="w-full" justify="between" align="center">
          <BottomModalTitle title="판매상품" />
          <ModalCloseButton onClick={handleCloseModal} />
        </Flex>
        <Flex direction="col" gap={38} align="center">
          <Flex align="center" wrap gap={16}>
            {PRODUCT_LIST.map((category: ProductType) => (
              <SellProduct
                key={category.id}
                product={category}
                checkbox
                onClick={() => toggleCategory(category.id)}
                isCheck={idList.some((id) => id === category.id)}
                isModal
              />
            ))}
          </Flex>
          <Flex className="w-full" direction="row" gap={9} align="center">
            <Button
              width={'120px'}
              bgColor={'white'}
              textColor={'black'}
              borderColor={'var(--gray-100)'}
              onClick={() => setIdList(DEFAULT_CATEGORY_ID_LIST)}
              title="초기화"
            />
            <Button onClick={onClickSubmit} title="선택하기" disabled={!idList.length} />
          </Flex>
        </Flex>
      </Flex>
    </BottomModal>
  );
}
