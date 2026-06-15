'use client'

import AgreementItem from '@/app/login/@login/agree-view/components/AgreementItem'
import { useAgreementStore } from '@/app/login/store/useAgreementStore'
import Button from '@/shared/components/button/Button'
import Checkbox from '@/shared/components/inputs/Checkbox'
import Flex from '@/shared/components/layout/Flex'
import Header from '@/shared/components/layout/Header'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AgreeView() {
  const { agreements, setAgreement, setAllAgreements } = useAgreementStore()

  const router = useRouter()

  useEffect(() => {
    const { agree14, service, privacy, location } = agreements
    const allChecked = agree14 && service && privacy && location
    setAgreement('all', allChecked)
  }, [agreements.agree14, agreements.service, agreements.privacy, agreements.location, setAgreement])

  const handleCheck = (id: string, value: boolean) => {
    if (id === 'all') {
      setAllAgreements(value)
    } else {
      setAgreement(id, value)
    }
  }

  const handleNext = () => {
    router.push('/login/setting')
  }

  return (
    <div className="modal-page">
      <Header />
      <Flex direction="col" gap={38} className="px-20 pt-56">
        <h2 className="text-[#191919] font-title_m">
          소소 서비스 이용약관에
          <br /> 동의해 주세요.
        </h2>
        <Flex direction="col" gap={20} className="w-full">
          <label
            htmlFor="all-check"
            className="flex w-full cursor-pointer items-center gap-12 rounded-14 bg-gray-50 p-16"
          >
            <Checkbox id="all-check" checked={agreements.all} onChange={(value) => handleCheck('all', value)} />
            <span className="font-subtitle_l">전체 동의</span>
          </label>
          <Flex direction="col" gap={20} className="w-full">
            <AgreementItem
              id="agree14"
              checked={agreements.agree14}
              label="[필수] 만 14세 이상입니다."
              onChange={(value) => handleCheck('agree14', value)}
            />
            <AgreementItem
              id="service"
              checked={agreements.service}
              label="[필수] 서비스 이용약관"
              onChange={(value) => handleCheck('service', value)}
              link="/login/agree-view/service"
            />
            <AgreementItem
              id="privacy"
              checked={agreements.privacy}
              label="[필수] 개인정보 수집 및 이용 동의"
              onChange={(value) => handleCheck('privacy', value)}
              link="/policy/personal-information"
            />
            <AgreementItem
              id="location"
              checked={agreements.location}
              label="[선택] 위치서비스 이용 동의"
              onChange={(value) => handleCheck('location', value)}
              link="/policy/location"
            />
          </Flex>
        </Flex>
      </Flex>
      <div className="bottom-button">
        <Button
          onClick={handleNext}
          title="동의하기"
          disabled={!(agreements.agree14 && agreements.service && agreements.privacy)}
        />
      </div>
    </div>
  )
}
