import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { cn } from '@/lib/cn';
import { Me } from '@/types/user/user';
import castArray from '@/utils/castArray';
import useChangeRouter from '@/hooks/useChangeRouter';
import useSearchRouter from '@/hooks/useSearchRouter';
import { SearchInput } from '@/components/shared';

interface NavAuthSectionProps {
  me?: Me;
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
}

const NavAuthSection = ({
  me,
  isSearchOpen,
  setIsSearchOpen,
}: NavAuthSectionProps) => {
  const { currentPath, currentQuery } = useChangeRouter();
  const { onChangeSearchKeyword, initKeyword, searchKeyword, searchQuery } =
    useSearchRouter();
  const linkStyle = 'transition-colors duration-300 hover:text-var-gray2';

  return (
    <div
      className={cn(
        'flex justify-end gap-[30px] xl:gap-[60px]',
        isSearchOpen && 'flex-1',
      )}
    >
      {currentPath.includes('signin') ||
      currentPath.includes('signup') ||
      currentPath.includes('mypage') ||
      currentPath.includes('compare') ? null : (
        <SearchInput
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
        <Link href={me ? '/compare' : '/signup'} className={linkStyle}>
          {me ? '비교하기' : '회원가입'}
        </Link>
        <Link href={me ? '/mypage' : '/signin'} className={linkStyle}>
          {me ? '내 프로필' : '로그인'}
        </Link>
      </div>
    </div>
  );
};

export default NavAuthSection;
