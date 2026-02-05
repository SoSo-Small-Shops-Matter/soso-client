'use client'

import { useAddShopProductMutation } from '@/app/shop/components/ShopProducts/hooks/useAddShopProductMutation'
import IconButton from '@/shared/components/button/IconButton'
import SellProduct from '@/shared/components/card/SellProduct'
import ProposalIcon from '@/shared/components/icons/ProposalIcon'
import ContentBox from '@/shared/components/layout/ContentBox'
import Flex from '@/shared/components/layout/Flex'
import AddProductModal from '@/shared/components/modal/AddProductModal'
import ContentTitle from '@/shared/components/text/ContentTitle'
import EmptyData from '@/shared/components/ui/EmptyData'
import { useDialog } from '@/shared/context/DialogContext'
import { useAuthStore } from '@/shared/store/useAuthStore'
import useProductListStore from '@/shared/store/useProductListStore'
import { ProductType } from '@/shared/types/shopType'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

interface ShopProductsProps {
  productData: ProductType[] | undefined
}
export default function ShopProducts({ productData }: ShopProductsProps) {
  const [isBottomModal, setIsBottomModal] = useState(false)
  const { productList, clearProductList } = useProductListStore()
  const { id } = useParams()
  const { token } = useAuthStore()
  const { openDialog, closeDialog } = useDialog()

  const router = useRouter()

  const { mutate: addShopProductMutate } = useAddShopProductMutation()

  const confirm = () => {
    router.push('/login')
    closeDialog()
  }

  const handleToggleBottomModal = () => {
    if (!token) {
      openDialog({
        type: 'alert',
        title: '',
        message: '로그인이 필요한 서비스입니다.',
        rightLabel: '로그인/회원가입하기',
        onConfirm: () => confirm(),
        onCancel: () => closeDialog(),
      })

      return
    }

    setIsBottomModal((prev) => !prev)
  }

  const handleAddProduct = () => {
    const data = {
      shopId: Number(id),
      products: productList.map((el) => {
        return { id: el.id }
      }),
    }

    addShopProductMutate(data, {
      onSuccess: () => {
        clearProductList()
        setIsBottomModal(false)
        openDialog({
          type: 'alert',
          title: '제안 완료',
          message: (
            <span>
              소중한 유저님이 등록해주신 정보는
              <br />
              확인 후 업데이트 될 예정입니다.
            </span>
          ),
        })
      },
    })
  }

  return (
    <ContentBox>
      <Flex justify="between" align="center" className="w-full">
        <ContentTitle title="판매 상품" />
        <IconButton label="추가하기" icon={<ProposalIcon />} onClick={handleToggleBottomModal} />
      </Flex>
      {productData && productData?.length > 0 ? (
        <Flex align="center" wrap gap={8} className="w-full">
          {productData?.map((product) => (
            <SellProduct key={product.id} product={product} />
          ))}
        </Flex>
      ) : (
        <EmptyData text="등록된 상품이 없습니다." />
      )}

      <AddProductModal onClick={handleAddProduct} isOpen={isBottomModal} onClose={handleToggleBottomModal} />
    </ContentBox>
  )
}
