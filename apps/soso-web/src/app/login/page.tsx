import Flex from '@/shared/components/layout/Flex';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Flex justify="center" align="center" className="h-screen w-full">
      <Link
        href={'/login/agree-view'}
        className="flex h-56 w-full items-center justify-center rounded-16 bg-gray-50 font-body1_m"
      >
        구글 로그인
      </Link>
    </Flex>
  );
}
