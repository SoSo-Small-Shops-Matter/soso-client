'use client';

import BackIcon from '@/shared/components/icons/BackIcon';
import XIcon from '@/shared/components/icons/XIcon';
import Flex from '@/shared/components/layout/Flex';
import useBack from '@/shared/hooks/useBack';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface HeaderProps {
  type?: 'close' | 'back' | 'customBack' | 'customBtn';
  title?: string;
  customBtn?: ReactNode;
  top?: string;
}

export default function Header({ type, title, customBtn, top }: HeaderProps) {
  const { handleBack } = useBack();
  const pathname = usePathname();

  return (
    <div
      style={{
        top: top || '0',
      }}
      className={`fixed left-0 top-0 z-sticky h-56 w-full px-20 layout-center ${pathname === '/' ? 'bg-transparent' : 'bg-white'}`}
    >
      {!type && (
        <Flex align="center" className="h-full w-full">
          <h1 className="font-title3_bold">{title}</h1>
        </Flex>
      )}

      {type && type !== 'customBtn' && (
        <Flex justify="between" align="center" className="relative h-full w-full">
          <div>
            <button type="button">{type === 'close' && <XIcon />}</button>
            <button type="button" onClick={handleBack}>
              {type === 'back' && <BackIcon />}
            </button>
          </div>
          <h2 className="min-w-[200px] text-center font-title4_semi position-center">{title}</h2>
          <div>{customBtn}</div>
        </Flex>
      )}
      {type === 'customBtn' && (
        <Flex justify="between" align="center" className="h-full w-full">
          <h1 className="font-title3_bold">{title}</h1>
          <div>{customBtn}</div>
        </Flex>
      )}
    </div>
  );
}
