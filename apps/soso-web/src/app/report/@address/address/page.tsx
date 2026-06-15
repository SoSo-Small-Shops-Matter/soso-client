'use client'

import { useReportStore } from '@/app/report/store/useReportStore'
import Divider from '@/shared/components/divider/Divider'
import Input from '@/shared/components/inputs/Input'
import Flex from '@/shared/components/layout/Flex'
import Header from '@/shared/components/layout/Header'
import { useAddressSearch } from '@/shared/hooks/useAddressSearch'
import useDebounce from '@/shared/hooks/useDebounce'
import { AddressType } from '@/shared/types/addressType'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

export default function FindAddress() {
  const [address, setAddress] = useState('')

  const router = useRouter()

  const debounceAddressValue = useDebounce(address, 250)

  const { data: searchData } = useAddressSearch(debounceAddressValue)
  const { shop, setShop } = useReportStore()

  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const handleSelectAddress = (data: AddressType) => {
    setShop({
      ...shop,
      location: data.road_address_name || data.address_name,
      lat: Number(data.y),
      lng: Number(data.x),
    })
    router.back()
  }

  return (
    <div className="layout-center modal-page">
      <Header title="주소" type="back" />
      <Flex direction="col" gap={10} className="h-full w-full px-8 pb-20 pt-76">
        <div className="w-full px-12">
          <Input
            onChange={handleChangeAddress}
            placeholder="검색어를 입력해주세요."
            height="42px"
            className="border border-[#E5E7F1] bg-white"
          />
        </div>
        <Divider height="1px" />
        <Flex direction="col" className="w-full flex-1 overflow-y-auto">
          {!searchData?.length ? (
            <p className="mt-20 w-full text-center font-body_s text-[#27282C]">
              검색어에 해당하는 주소가 존재하지 않습니다.
            </p>
          ) : (
            searchData?.map((data) => (
              <div
                key={data.id}
                onClick={() => handleSelectAddress(data)}
                className="flex w-full cursor-pointer flex-col gap-10 border-b border-[#F5F7F9] px-12 py-10 hover:bg-black/5"
              >
                <p className="font-body_s text-[#120CE8]">{data.place_name || data.address_name || '-'}</p>
                <Flex align="center" gap={8}>
                  <span className="bg-[#F5F7F9] px-4 py-2 font-caption text-[#5E6267]">도로명</span>
                  <p className="font-caption text-[#27282C]">{data.road_address_name || '-'}</p>
                </Flex>
                <Flex align="center" gap={8}>
                  <span className="bg-[#F5F7F9] px-4 py-2 font-caption text-[#5E6267]">지번</span>
                  <p className="font-caption text-[#27282C]">{data.address_name || '-'}</p>
                </Flex>
              </div>
            ))
          )}
        </Flex>
      </Flex>
    </div>
  )
}
