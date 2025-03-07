'use client';

import ReportModal from '@/app/shop/components/ShopTopInfo/components/ReportModal';
import { useToggleWishMutation } from '@/app/shop/hooks/useToggleWishMutation';
import MapButton from '@/shared/components/button/RoadFindButton/components/MapButton';
import Divider from '@/shared/components/divider/Divider';
import LoadFindIcon from '@/shared/components/icons/LoadFindIcon';
import ReportIcon from '@/shared/components/icons/ReportIcon';
import WishIcon from '@/shared/components/icons/WishIcon';
import XIcon from '@/shared/components/icons/XIcon';
import ContentBox from '@/shared/components/layout/ContentBox';
import Flex from '@/shared/components/layout/Flex';
import AlertModal from '@/shared/components/modal/AlertModal';
import BottomModal from '@/shared/components/modal/BottomModal';
import { ShopDetailType } from '@/shared/types/shopType';
import { kakaoFindUrl, naverFindUrl } from '@/shared/utils/findShop';
import { useState } from 'react';

interface ShopTopInfoProps {
  shopData: ShopDetailType | undefined;
}

export default function ShopTopInfo({ shopData }: ShopTopInfoProps) {
  const [isFindModal, setIsFindModal] = useState(false);
  const [isReportModal, setIsReportModal] = useState(false);
  const { mutate: toggleWishMutate } = useToggleWishMutation(Number(shopData?.shop.id));

  const handleOpenFindModal = () => {
    setIsFindModal((prev) => !prev);
  };
  const handleCloseFindModal = () => {
    setIsFindModal((prev) => !prev);
  };

  const handleToggleReportModal = () => {
    setIsReportModal((prev) => !prev);
  };

  const handleWishClick = () => {
    if (!shopData?.shop.id) return;

    toggleWishMutate(shopData?.shop.id);
  };

  return (
    <ContentBox gap={32}>
      <h2 className="w-full text-center text-black font-title1">{shopData?.shop.name}</h2>
      <Flex justify="between" align="center" className="w-full">
        <button onClick={handleWishClick} className="flex flex-1 flex-col items-center justify-center gap-2">
          <WishIcon isActive={shopData?.wishlist} />
          <span className="text-gray-500 font-body2_m">찜</span>
        </button>
        <Divider width="1px" height="56px" bgColor="#E8EBED" />
        <button onClick={handleOpenFindModal} className="flex flex-1 flex-col items-center justify-center gap-2">
          <LoadFindIcon />
          <span className="text-gray-500 font-body2_m">길찾기</span>
        </button>
        <Divider width="1px" height="56px" bgColor="#E8EBED" />
        <button onClick={handleToggleReportModal} className="flex flex-1 flex-col items-center justify-center gap-2">
          <ReportIcon />
          <span className="text-gray-500 font-body2_m">신고</span>
        </button>
      </Flex>
      <BottomModal isOpen={isFindModal} onClose={handleCloseFindModal}>
        <Flex direction="col" gap={18} className="relative w-full">
          <Flex justify="between" align="center" className="w-full">
            <h4 className="font-title3_bold">길찾기</h4>
            <button onClick={handleCloseFindModal} className="">
              <XIcon />
            </button>
          </Flex>

          <Flex direction="col" gap={12} className="w-full">
            <MapButton
              title="네이버 지도"
              onClick={() =>
                window.open(naverFindUrl(shopData?.shop.name || '', shopData?.shop.lat, shopData?.shop.lng), '_blank')
              }
            />
            <MapButton
              title="카카오 지도"
              onClick={() =>
                window.open(kakaoFindUrl(shopData?.shop.name || '', shopData?.shop.lat, shopData?.shop.lng), '_blank')
              }
            />
            <MapButton title="apple 지도" />
          </Flex>
        </Flex>
      </BottomModal>

      <ReportModal isReportModal={isReportModal} handleToggleReportModal={handleToggleReportModal} />
      <AlertModal isOpen={false} onClose={() => {}} title="신고완료">
        소중한 정보 감사합니다.
        <br />
        확인 후 해당 장소는 삭제될 예정입니다.
      </AlertModal>
    </ContentBox>
  );
}
