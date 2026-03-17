'use client'

import LinkIcon from '@/shared/components/icons/LinkIcon'
import Checkbox from '@/shared/components/inputs/Checkbox'
import Flex from '@/shared/components/layout/Flex'
import Link from 'next/link'

interface AgreementItemProps {
  id: string
  checked: boolean
  label: string
  onChange: (checked: boolean) => void
  link?: string
}

export default function AgreementItem({ id, checked, label, onChange, link }: AgreementItemProps) {
  return (
    <Flex className="w-full pl-16" justify="between" align="center">
      <label htmlFor={id} className="flex cursor-pointer items-center gap-12 text-gray-500 font-body1_m">
        <Checkbox id={id} checked={checked} onChange={onChange} />
        {label}
      </label>
      {link && (
        <Link href={link}>
          <LinkIcon />
        </Link>
      )}
    </Flex>
  )
}
