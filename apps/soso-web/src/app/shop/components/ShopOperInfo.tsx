'use client'

import { usePostShopOperatingMutation } from '@/shared/api/shops/queries'
import Button from '@/shared/components/button/Button'
import IconButton from '@/shared/components/button/IconButton'
import ModalCloseButton from '@/shared/components/button/MocalCloseButton'
import TimePickerButton from '@/shared/components/button/TimePickerButton'
import Divider from '@/shared/components/divider/Divider'
import ProposalIcon from '@/shared/components/icons/ProposalIcon'
import Input from '@/shared/components/inputs/Input'
import TimePicker from '@/shared/components/inputs/TimePicker'
import DayOfWeekCheckbox from '@/shared/components/inputs/DayOfWeekCheckbox'
import ContentBox from '@/shared/components/layout/ContentBox'
import Flex from '@/shared/components/layout/Flex'
import InputContent from '@/shared/components/layout/InputContent'
import BottomModal from '@/shared/components/modal/BottomModal'
import ModalPortal from '@/shared/components/modal/ModalPortal'
import BottomModalTitle from '@/shared/components/text/BottomModalTitle'
import ContentSubTitle from '@/shared/components/text/ContentSubTitle'
import ContentTitle from '@/shared/components/text/ContentTitle'
import EmptyData from '@/shared/components/ui/EmptyData'
import { useDialog } from '@/shared/context/DialogContext'
import useInput from '@/shared/hooks/useInput'
import { useTimePicker } from '@/shared/hooks/useTimePicker'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { DAYS_MAP } from '@/shared/constant/days'
import type { OperatingHourType } from '@/shared/types/shopType'
import { useParams, useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { DayOfWeek } from '@repo/utils'

interface ShopOperInfoProps {
  operData: OperatingHourType[] | undefined
}

export default function ShopOperInfo({ operData }: ShopOperInfoProps) {
  const [isFormChanged, setIsFormChanged] = useState(false)
  const [status, setStatus] = useState({
    isDayOfWeekData: false,
    isTimeData: false,
    isPhoneData: false,
  })
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([])
  const { token } = useAuthStore()
  const [isBottomModal, setIsBottomModal] = useState(false)
  const { id } = useParams()

  const router = useRouter()

  const {
    openTime,
    closeTime,
    isTimePicker,
    timePickerType,
    setOpenTime,
    setCloseTime,
    handleCloseTimePicker,
    handleOpenTimePicker,
    handleTimePicker,
  } = useTimePicker()

  const { value: phoneNumber, onChange: handleChangePhoneNumber, setValue: setPhoneNumber } = useInput('')
  const { openDialog, closeDialog } = useDialog()

  const { mutate: postOperatingMutate } = usePostShopOperatingMutation()

  const handleChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target as HTMLInputElement
    const dayValue = id as DayOfWeek

    setSelectedDays((prev) => (prev.includes(dayValue) ? prev.filter((d) => d !== dayValue) : [...prev, dayValue]))
  }

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

  const handleSubmitOperating = () => {
    const data = {
      shopId: Number(id),
      operatingHours: {
        phoneNumber: phoneNumber || null,
        daysOfWeek: selectedDays,
        startTime: openTime.split(' ')[1],
        endTime: closeTime.split(' ')[1],
      },
    }

    postOperatingMutate(data, {
      onSuccess: () => {
        handleToggleBottomModal()
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

  useEffect(() => {
    const daysOfWeek = operData?.[0]?.daysOfWeek || []
    setSelectedDays(daysOfWeek)

    setOpenTime(operData?.[0]?.startTime || '')
    setCloseTime(operData?.[0]?.endTime || '')
    setPhoneNumber(operData?.[0]?.phoneNumber || '')
  }, [operData, isBottomModal])

  useEffect(() => {
    const originalDays = operData?.[0]?.daysOfWeek || []

    // 운영요일 변경 확인
    const isDayOfWeekChanged =
      selectedDays.length !== originalDays.length || selectedDays.some((day) => !originalDays.includes(day))

    // 운영시간 변경 확인
    const isTimeChanged = openTime !== (operData?.[0]?.startTime || '') || closeTime !== (operData?.[0]?.endTime || '')

    // 전화번호 변경 확인
    const isPhoneChanged = phoneNumber !== (operData?.[0]?.phoneNumber || '')

    // 하나라도 변경되었으면 폼이 변경된 것으로 판단
    setIsFormChanged(isDayOfWeekChanged || isTimeChanged || isPhoneChanged)
  }, [selectedDays, openTime, closeTime, phoneNumber, operData])

  useEffect(() => {
    if (operData && operData.length > 0) {
      const dayOfWeekExists = operData[0].daysOfWeek && operData[0].daysOfWeek.length > 0
      const timeExists = !!operData[0].startTime && !!operData[0].endTime

      setStatus({
        isDayOfWeekData: dayOfWeekExists,
        isTimeData: timeExists,
        isPhoneData: !!operData[0]?.phoneNumber,
      })
    }
  }, [operData])

  return (
    <ContentBox>
      <Flex justify="between" align="center" className="w-full">
        <ContentTitle title="운영 정보" />
        <IconButton onClick={handleToggleBottomModal} label="제안하기" icon={<ProposalIcon />} />
      </Flex>
      <Flex direction="col" gap={24} className="w-full">
        <Flex direction="col" gap={8} className="w-full">
          <ContentSubTitle title="운영 요일" />
          {status.isDayOfWeekData ? (
            <Flex justify="between" align="center" className="w-full max-w-[375px]">
              {DAYS_MAP.map((item) => (
                <DayOfWeekCheckbox
                  key={item.value}
                  id={`day-of-week-checkbox-item-${item.value}`}
                  label={item.label}
                  checked={(operData?.[0]?.daysOfWeek || []).includes(item.value)}
                  disabled
                />
              ))}
            </Flex>
          ) : (
            <EmptyData text="등록된 운영 요일이 없습니다." />
          )}
        </Flex>
        <Flex direction="col" gap={8} className="w-full">
          <ContentSubTitle title="운영 시간" />
          {status.isTimeData ? (
            <Flex justify="center" align="center" gap={40} className="w-full rounded-12 bg-gray-50 py-16">
              <Flex align="center" gap={12} className="font-body_m">
                <span className="text-gray-400">open</span>
                <span className="text-gray-800">{operData?.[0]?.startTime || '-'}</span>
              </Flex>
              <Divider width="1px" height="12px" bgColor="#C9CDD2" />
              <Flex align="center" gap={12} className="font-body_m">
                <span className="text-gray-400">closed</span>
                <span className="text-gray-800">{operData?.[0]?.endTime || '-'}</span>
              </Flex>
            </Flex>
          ) : (
            <EmptyData text="등록된 운영 시간이 없습니다." />
          )}
        </Flex>
        <Flex direction="col" gap={8} className="w-full">
          <ContentSubTitle title="전화번호" />
          {status.isPhoneData ? (
            <p className="text-gray-800 font-body_m">{operData?.[0]?.phoneNumber || '-'}</p>
          ) : (
            <EmptyData text="등록된 전화번호가 없습니다." />
          )}
        </Flex>
      </Flex>
      <BottomModal isOpen={isBottomModal} onClose={handleToggleBottomModal}>
        <Flex direction="col" gap={18} className="w-full">
          <Flex justify="between" align="center" className="w-full">
            <BottomModalTitle title="운영 정보" />
            <ModalCloseButton onClick={handleToggleBottomModal} />
          </Flex>
          <Flex direction="col" gap={38} align="center" className="w-full">
            <Flex direction="col" className="w-full" gap={20}>
              <InputContent label="운영 요일을 선택해주세요.">
                <div className="flex w-full max-w-[375px] items-center justify-between">
                  {DAYS_MAP.map((item) => (
                    <DayOfWeekCheckbox
                      key={item.value}
                      id={item.value}
                      label={item.label}
                      checked={selectedDays.includes(item.value)}
                      onChange={handleChangeCheckBox}
                    />
                  ))}
                </div>
              </InputContent>
              <InputContent label="운영 시간을 선택해주세요.">
                <Flex justify="between" align="center" className="w-full" gap={20}>
                  <Flex className="flex-1" justify="between" align="center" gap={12}>
                    <p className="text-gray-600 font-body_m">open</p>
                    <TimePickerButton label={openTime} onClick={() => handleOpenTimePicker('open')} />
                  </Flex>
                  <Flex className="flex-1" justify="between" align="center" gap={12}>
                    <p className="text-gray-600 font-body_m">close</p>
                    <TimePickerButton label={closeTime} onClick={() => handleOpenTimePicker('close')} />
                  </Flex>
                </Flex>
              </InputContent>
              <InputContent label="전화번호">
                <Input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="전화번호를 입력해 주세요."
                  value={phoneNumber}
                  onChange={handleChangePhoneNumber}
                />
              </InputContent>
            </Flex>
            <Button title="제안하기" type="button" disabled={!isFormChanged} onClick={handleSubmitOperating} />
          </Flex>
        </Flex>
      </BottomModal>
      <ModalPortal isOpen={isTimePicker} onClose={handleCloseTimePicker}>
        <TimePicker
          onConfirm={handleTimePicker}
          onCancel={handleCloseTimePicker}
          value={timePickerType === 'open' ? openTime : closeTime}
        />
      </ModalPortal>
    </ContentBox>
  )
}
