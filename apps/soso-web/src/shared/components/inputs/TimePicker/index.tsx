'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import './swiper.css'
import XIcon from '@/shared/components/icons/XIcon'
interface TimePickerProps {
  onConfirm: (time: string) => void
  onCancel: () => void
  value?: string // 기본값
}

const TimePicker: React.FC<TimePickerProps> = ({ onConfirm, onCancel, value }) => {
  const [selectedAMPM, setSelectedAMPM] = useState('오전')
  const [selectedHour, setSelectedHour] = useState(10)
  const [selectedMinute, setSelectedMinute] = useState(0)

  const ampmSwiperRef = useRef<SwiperCore | null>(null)
  const hourSwiperRef = useRef<SwiperCore | null>(null)
  const minuteSwiperRef = useRef<SwiperCore | null>(null)

  useEffect(() => {
    if (value) {
      const [ampm, time] = value.split(' ')
      const [hour, minute] = time.split(':').map(Number)

      setSelectedAMPM(ampm)
      setSelectedHour(hour)
      setSelectedMinute(minute)

      if (ampmSwiperRef.current) {
        ampmSwiperRef.current.slideTo(ampm === '오전' ? 0 : 1, 0)
      }
      if (hourSwiperRef.current) {
        hourSwiperRef.current.slideTo(hour - 1, 0)
      }
      if (minuteSwiperRef.current) {
        minuteSwiperRef.current.slideTo(minute / 5, 0)
      }
    }
  }, [value])

  const handleConfirm = () => {
    const time = `${selectedAMPM} ${selectedHour < 10 ? '0' : ''}${selectedHour}:${
      selectedMinute < 10 ? '0' : ''
    }${selectedMinute}`
    onConfirm(time)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[320px] rounded-[16px] bg-white p-[20px] shadow-lg">
        <div className="mb-[16px] flex items-center justify-end">
          <button onClick={onCancel} className="font-body_l text-black focus:outline-none">
            <XIcon />
          </button>
        </div>

        <div className="relative flex items-center justify-center px-30">
          {/* AM/PM Swiper */}
          <Swiper
            direction="vertical"
            slidesPerView={3}
            centeredSlides
            slideToClickedSlide={true}
            onSwiper={(swiper) => (ampmSwiperRef.current = swiper)}
            onSlideChange={(swiper) => setSelectedAMPM(swiper.realIndex === 0 ? '오전' : '오후')}
            className="h-[120px] w-[40px]"
          >
            <SwiperSlide className="flex cursor-pointer items-center justify-center font-body_l opacity-25">
              오전
            </SwiperSlide>
            <SwiperSlide className="flex cursor-pointer items-center justify-center font-body_l opacity-25">
              오후
            </SwiperSlide>
          </Swiper>

          {/* Hour Swiper */}
          <Swiper
            direction="vertical"
            slidesPerView={3}
            loop={false}
            centeredSlides
            slideToClickedSlide={true}
            onSwiper={(swiper) => (hourSwiperRef.current = swiper)}
            onSlideChange={(swiper) => setSelectedHour(swiper.activeIndex + 1)}
            className="h-[120px] w-[40px]"
          >
            {[...Array(12).keys()].map((hour) => (
              <SwiperSlide
                key={hour}
                className="flex cursor-pointer items-center justify-center font-body_l opacity-25"
              >
                {hour + 1}시
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Minute Swiper */}
          <Swiper
            direction="vertical"
            slidesPerView={3}
            loop={false}
            centeredSlides
            slideToClickedSlide={true}
            onSwiper={(swiper) => (minuteSwiperRef.current = swiper)}
            onSlideChange={(swiper) => setSelectedMinute(swiper.activeIndex * 5)}
            className="h-[120px] w-[40px]"
          >
            {[...Array(12).keys()].map((minute) => (
              <SwiperSlide
                key={minute}
                className="flex cursor-pointer items-center justify-center font-body_l opacity-25"
              >
                {minute * 5}분
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute left-0 right-0 top-[45%] mx-auto h-[40px] -translate-y-1/2 transform rounded-lg bg-gray-200 bg-opacity-20"></div>
        </div>

        <button
          onClick={handleConfirm}
          className="mt-[20px] w-full rounded-[12px] bg-main py-[12px] font-body_l text-white"
        >
          시간 설정
        </button>
      </div>
    </div>
  )
}

export default TimePicker
