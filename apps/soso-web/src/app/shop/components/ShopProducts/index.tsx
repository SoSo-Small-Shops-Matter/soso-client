'use client';

import { useAddShopProductMutation } from '@/app/shop/components/ShopProducts/hooks/useAddShopProductMutation';
import IconButton from '@/shared/components/button/IconButton';
import SellProduct from '@/shared/components/card/SellProduct';
import ProposalIcon from '@/shared/components/icons/ProposalIcon';
import ContentBox from '@/shared/components/layout/ContentBox';
import Flex from '@/shared/components/layout/Flex';
import AddProductModal from '@/shared/components/modal/AddProductModal';
import ContentTitle from '@/shared/components/text/ContentTitle';
import EmptyData from '@/shared/components/ui/EmptyData';
import { PRODUCT_LIST } from '@/shared/constant/Product';
import useProductListStore from '@/shared/store/useProductListStore';
import { ProductType } from '@/shared/types/shopType';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface ShopProductsProps {
  productData: ProductType[] | undefined;
}
export default function ShopProducts({ productData }: ShopProductsProps) {
  const [isBottomModal, setIsBottomModal] = useState(false);
  const { selectedProducts } = useProductListStore();
  const { id } = useParams();

  const { mutate: addShopProductMutate } = useAddShopProductMutation();

  const handleToggleBottomModal = () => {
    setIsBottomModal((prev) => !prev);
  };

  const handleAddProduct = () => {
    const data = {
      shopId: Number(id),
      products: selectedProducts.map((el) => {
        return { id: el.id, name: el.name };
      }),
    };

    addShopProductMutate(data);
  };

  return (
    <ContentBox>
      <Flex justify="between" align="center" className="w-full">
        <ContentTitle title="판매 상품" />
        <IconButton label="추가하기" icon={<ProposalIcon />} onClick={handleToggleBottomModal} />
      </Flex>
      {productData && productData?.length > 0 ? (
        <Flex align="center" wrap gap={8} className="w-full">
          {productData?.map((product) => <SellProduct key={product.id} product={product} />)}
        </Flex>
      ) : (
        <EmptyData text="등록된 상품이 없습니다." />
      )}

      <AddProductModal isEdit onClick={handleAddProduct} isOpen={isBottomModal} onClose={handleToggleBottomModal} />
    </ContentBox>
  );
}
