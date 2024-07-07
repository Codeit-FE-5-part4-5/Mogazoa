import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LogoIcon from '@/../../public/images/logo.svg';
import MenuIcon from '@/../../public/images/menu.svg';
import searchIcon from '@/../../public/images/search.svg';
import closedIcon from '@/../../public/images/closedIcon.svg';
import Button from '../Button/Button';
import { removeCookie } from '@/shared/utils/cookie';
import { useRouter } from 'next/router';

interface HeaderProps {
  me?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ me }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // 테스트를 위한 함수
  const logout = () => {
    removeCookie('accessToken');
    router.reload();
  };

  return (
    <div className="sticky flex w-full flex-col items-start gap-[10px] bg-[#1C1C22] stroke-[#252530] stroke-[1px] px-[20px] py-[23px] md:px-[30px] xl:px-[120px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-4 md:hidden">
          <Image src={MenuIcon} alt="MenuIcon" width={24} height={24} />
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image src={LogoIcon} alt="LogoIcon" width={166} height={28} />
          </Link>
        </div>
        <div className="hidden items-center md:flex md:gap-[30px] xl:gap-[60px]">
          <input
            type="text"
            placeholder="상품 이름을 검색해 보세요"
            className="flex h-[50px] w-[300px] flex-col items-start justify-center gap-[10px] rounded-[28px] bg-[#252530] p-[16px_20px] text-white xl:w-[400px]"
          />
          <Link
            href={me ? '/compare' : '/signin'}
            className="text-right font-sans text-[16px] font-normal text-white"
          >
            {me ? '비교하기' : '로그인'}
          </Link>
          <Link
            href={me ? '/mypage' : '/signup'}
            className="text-right font-sans text-[16px] font-normal text-white"
          >
            {me ? '내 프로필' : '회원가입'}
          </Link>
          {me && (
            <div className="w-[150px]">
              <Button text="로그아웃" onClick={logout} />
            </div>
          )}
        </div>
        <div className="flex md:hidden">
          <button onClick={handleSearchClick}>
            {isSearchOpen ? (
              <Image src={closedIcon} alt="closedIcon" width={24} height={24} />
            ) : (
              <Image src={searchIcon} alt="searchIcon" width={24} height={24} />
            )}
          </button>
        </div>
      </div>
      {isSearchOpen && (
        <div className="mt-4 w-full md:hidden">
          <input
            type="text"
            placeholder="상품 이름을 검색해 보세요"
            className="w-full rounded bg-gray-800 px-4 py-2 text-white"
          />
        </div>
      )}
    </div>
  );
};
