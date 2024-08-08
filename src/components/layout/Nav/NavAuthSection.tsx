import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import useChangeRouter from '@/hooks/useChangeRouter';
import { Search } from '@/components/shared';

interface NavAuthSectionProps {
  me?: number;
}

const nonRenderedPaths = ['signin', 'signup'];

const NavAuthSection = ({ me }: NavAuthSectionProps) => {
  const [isLoggedIn] = useState(!!me);
  const { currentPath } = useChangeRouter();

  return (
    <div className={cn('flex justify-end gap-[30px] xl:gap-[60px]')}>
      {nonRenderedPaths.find((path) => currentPath.includes(path)) ? null : (
        <Search />
      )}
      <div className="hidden flex-shrink-0 items-center text-right font-sans text-[16px] font-semibold text-var-gray1 md:flex md:gap-[30px] xl:gap-[60px]">
        <Link
          href={isLoggedIn ? '/compare' : '/signup'}
          className={cn(
            'transition-colors duration-300 hover:text-var-white',
            currentPath.includes('compare') && 'text-var-white',
          )}
        >
          {isLoggedIn ? '비교하기' : '회원가입'}
        </Link>
        <Link
          href={isLoggedIn ? '/mypage' : '/signin'}
          className={cn(
            'transition-colors duration-300 hover:text-var-white',
            currentPath.includes('mypage') && 'text-var-white',
          )}
        >
          {isLoggedIn ? '내 프로필' : '로그인'}
        </Link>
      </div>
    </div>
  );
};

export default NavAuthSection;
