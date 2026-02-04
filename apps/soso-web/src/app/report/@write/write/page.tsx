'use client'

import { usePostReportMutation } from '@/app/report/hooks/usePostReportMutation'
import { useReportStore } from '@/app/report/store/useReportStore'
import Button from '@/shared/components/button/Button'
import TimePickerButton from '@/shared/components/button/TimePickerButton'
import SellProduct from '@/shared/components/card/SellProduct'
import Input from '@/shared/components/inputs/Input'
import TimePicker from '@/shared/components/inputs/TimePicker'
import DayOfWeekCheckbox from '@/shared/components/inputs/DayOfWeekCheckbox'
import Flex from '@/shared/components/layout/Flex'
import Header from '@/shared/components/layout/Header'
import NaverMap from '@/shared/components/layout/NaverMap'
import AddProductModal from '@/shared/components/modal/AddProductModal'
import AlertModal from '@/shared/components/modal/AlertModal'
import BottomModal from '@/shared/components/modal/BottomModal'
import ModalPortal from '@/shared/components/modal/ModalPortal'
import useInput from '@/shared/hooks/useInput'
import { useTimePicker } from '@/shared/hooks/useTimePicker'
import useProductListStore from '@/shared/store/useProductListStore'
import { DAYS_MAP } from '@/shared/constant/days'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

export default function ReportWrite() {
  const [isDeclareModal, setIsDeclareModal] = useState(false)
  const [isAddProductModal, setIsAddProductModal] = useState(false)
  const [isShopLocationAlertModal, setIsShopLocationAlertModal] = useState(false)

  const { value: shopName, onChange: handleChangeShopName } = useInput('')
  const { value: phoneNumber, onChange: handleChangePhoneNumber } = useInput('')

  const {
    openTime,
    closeTime,
    isTimePicker,
    timePickerType,
    handleCloseTimePicker,
    handleOpenTimePicker,
    handleTimePicker,
  } = useTimePicker()
  const { productList } = useProductListStore()
  const { shop, setShop, operatingHours, setOperatingHours, products, setProduct } = useReportStore()

  const { mutate: postReportMutate } = usePostReportMutation()

  const router = useRouter()

  const handleChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target as HTMLInputElement
    const dayValue = id as any

    const newDays = operatingHours.daysOfWeek.includes(dayValue)
      ? operatingHours.daysOfWeek.filter((d) => d !== dayValue)
      : [...operatingHours.daysOfWeek, dayValue]

    setOperatingHours({ ...operatingHours, daysOfWeek: newDays })
  }

  const handleToggleTimeSettingModal = () => {
    setIsDeclareModal((prev) => !prev)
  }

  const handleShopLocationAlertModal = () => {
    setIsShopLocationAlertModal((prev) => !prev)
  }

  const handleToggleAddProductModal = () => {
    setIsAddProductModal((prev) => !prev)
  }

  const handleSubmitReport = () => {
    const data = {
      shop,
      operatingHours,
      products,
    }

    if (!shop.location.startsWith('서울') && !shop.location.startsWith('제주')) {
      setIsShopLocationAlertModal(true)
      return
    }

    postReportMutate(data)
  }

  useEffect(() => {
    if (!shop.location) {
      router.back()
    }
  }, [shop])

  const convertTimeFormat = (timeString: string): string => {
    const [period, time] = timeString.split(' ')
    const [hour, minute] = time.split(':').map(Number)

    if (period === '오전') {
      return time
    } else if (period === '오후') {
      const convertedHour = hour === 12 ? 12 : hour + 12
      return `${convertedHour}:${minute.toString().padStart(2, '0')}`
    }

    return timeString
  }

  useEffect(() => {
    setShop({ ...shop, name: shopName })
    setOperatingHours({
      ...operatingHours,
      phoneNumber: phoneNumber || null,
      startTime: convertTimeFormat(openTime),
      endTime: convertTimeFormat(closeTime),
    })

    const customProducts = productList.map((el) => {
      return { id: el.id, name: el.name }
    })
    setProduct(customProducts)
  }, [shopName, openTime, closeTime, phoneNumber, productList])

  return (
    <form className="flex flex-col modal-page">
      <Header type="back" title="소품샵 등록하기" />
      <Flex direction="col" gap={28} className="w-full overflow-y-auto px-16 pt-76">
        <Flex direction="col" gap={8} className="w-full">
          <h3 className="text-gray-800 font-title4_semi">상점 이름</h3>
          <Input placeholder="상점 이름을 입력해 주세요." value={shopName} onChange={handleChangeShopName} />
        </Flex>

        <Flex direction="col" gap={8} className="w-full">
          <h3 className="text-gray-800 font-title4_semi">상점 위치</h3>
          <Flex direction="col" gap={8} className="w-full">
            <div className="h-[185px] w-full overflow-hidden rounded-16">
              <NaverMap width="100%" height="100%" />
            </div>
            <div className="flex h-52 w-full items-center rounded-14 bg-gray-100 px-16 text-gray-400 font-body1_m">
              {shop.location}
            </div>
          </Flex>
        </Flex>

        <Flex direction="col" gap={8} className="w-full">
          <h3 className="text-gray-800 font-title4_semi">운영 정보</h3>
          <Flex direction="col" className="w-full" gap={20}>
            <Flex direction="col" gap={8} className="w-full">
              <h5 className="text-gray-500 font-body1_m">운영 요일을 선택해주세요.</h5>
              <div className="flex w-full max-w-[375px] items-center justify-between">
                {DAYS_MAP.map((item) => (
                  <DayOfWeekCheckbox
                    key={item.value}
                    id={item.value}
                    label={item.label}
                    checked={operatingHours.daysOfWeek.includes(item.value)}
                    onChange={handleChangeCheckBox}
                  />
                ))}
              </div>
            </Flex>
            <Flex direction="col" gap={8} className="w-full">
              <h5 className="text-gray-500 font-body1_m">운영 시간을 선택해주세요.</h5>
              <Flex justify="between" align="center" className="w-full" gap={20}>
                <Flex className="flex-1" justify="between" align="center" gap={12}>
                  <p className="text-gray-600 font-body1_m">open</p>
                  <TimePickerButton label={openTime} onClick={() => handleOpenTimePicker('open')} />
                </Flex>
                <Flex className="flex-1" justify="between" align="center" gap={12}>
                  <p className="text-gray-600 font-body1_m">close</p>
                  <TimePickerButton label={closeTime} onClick={() => handleOpenTimePicker('close')} />
                </Flex>
              </Flex>
            </Flex>
            <Flex direction="col" gap={8} className="w-full">
              <h3 className="text-gray-500 font-body1_m">전화번호</h3>
              <Input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="전화번호를 입력해 주세요."
                value={phoneNumber}
                onChange={handleChangePhoneNumber}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="col" gap={8} className="w-full">
          <h3 className="text-gray-800 font-title4_semi">판매상품</h3>
          <Flex align="start" wrap gap={8} className="w-full">
            {productList &&
              productList?.length > 0 &&
              productList?.map((product) => <SellProduct key={product.id} product={product} />)}

            <button
              type="button"
              onClick={handleToggleAddProductModal}
              className="flex aspect-square w-[calc(25%-6px)] cursor-pointer items-center justify-center rounded-12 bg-gray-50"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1V21" stroke="#C9CDD2" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M21 11L1 11" stroke="#C9CDD2" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
          </Flex>
        </Flex>
        <div className="w-full">
          <Button height="56px" type="button" title="등록하기" onClick={handleSubmitReport} disabled={!shopName} />
        </div>
      </Flex>
      <BottomModal isOpen={isDeclareModal} onClose={handleToggleTimeSettingModal}>
        운영 시간 모달
      </BottomModal>
      <ModalPortal isOpen={isTimePicker} onClose={handleCloseTimePicker}>
        <TimePicker
          onConfirm={handleTimePicker}
          onCancel={handleCloseTimePicker}
          value={timePickerType === 'open' ? openTime : closeTime}
        />
      </ModalPortal>
      <AlertModal isOpen={isShopLocationAlertModal} onClose={handleShopLocationAlertModal} title={''}>
        {'현재 서울, 제주에 있는 소품샵만 등록이 가능합니다'}
      </AlertModal>
      <AddProductModal isOpen={isAddProductModal} onClose={handleToggleAddProductModal} />
    </form>
  )
}
