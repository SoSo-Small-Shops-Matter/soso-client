import ListIcon from '@/shared/components/icons/ListIcon';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface CategoryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isActive: boolean;
}

export default function CategoryButton({ className, isActive, ...props }: CategoryButtonProps) {
  return (
    <button
      className={clsx(
        'flex items-center justify-center gap-4 rounded-full border bg-white px-10 py-6 shadow-button',
        isActive ? 'border-main' : 'border-gray-100',
        className
      )}
      {...props}
    >
      <ListIcon fill={isActive ? 'var(--main-color)' : '#191919'} />
      <span
        className={clsx('text-black font-body2_m', isActive ? 'border-main text-main' : 'border-gray-100 text-black')}
      >
        카테고리
      </span>
    </button>
  );
}
