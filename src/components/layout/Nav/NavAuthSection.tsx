import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import castArray from '@/utils/castArray';
import useChangeRouter from '@/hooks/useChangeRouter';
import useSearchRouter from '@/hooks/useSearchRouter';
import { Search } from '@/components/shared';

interface NavAuthSectionProps {
  me?: number;
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
}

const linkStyle = 'transition-colors duration-300 hover:text-var-gray2';

const nonRenderedPaths = [
  'signin',
  'signup',
  'mypage',
  'detail',
  'compare',
  'user',
];

const NavAuthSection = ({
  me,
  isSearchOpen,
  setIsSearchOpen,
}: NavAuthSectionProps) => {
  const [isLoggedIn] = useState(!!me);
  const { currentPath, currentQuery } = useChangeRouter();
  const { onChangeSearchKeyword, initKeyword, searchKeyword, searchQuery } =
    useSearchRouter();

  useEffect(() => {
    if (!searchQuery) initKeyword();
  }, [isSearchOpen, currentQuery]);

  return (
    <div
      className={cn(
        'flex justify-end gap-[30px] xl:gap-[60px]',
        isSearchOpen && 'flex-1',
      )}
    >
      {nonRenderedPaths.find((path) => currentPath.includes(path)) ? null : (
        <Search
          value={searchKeyword}
          type="text"
          onChange={onChangeSearchKeyword}
          searchQuery={searchQuery}
          currentQuery={castArray(currentQuery)}
          initKeyword={initKeyword}
          isOpen={isSearchOpen}
          setOpen={setIsSearchOpen}
          placeholder="상품 이름을 검색해 보세요"
        />
      )}
      <div className="hidden flex-shrink-0 items-center text-right font-sans text-[16px] font-semibold text-var-gray1 md:flex md:gap-[30px] xl:gap-[60px]">
        <Link href={isLoggedIn ? '/compare' : '/signup'} className={linkStyle}>
          {isLoggedIn ? '비교하기' : '회원가입'}
        </Link>
        <Link href={isLoggedIn ? '/mypage' : '/signin'} className={linkStyle}>
          {isLoggedIn ? '내 프로필' : '로그인'}
        </Link>
      </div>
    </div>
  );
};

export default NavAuthSection;
