import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LogoIcon from '@/../../public/images/logo.svg';
import MenuIcon from '@/../../public/images/menu.svg';
import searchIcon from '@/../../public/images/search.svg';
import closedIcon from '@/../../public/images/closedIcon.svg';
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import { Portal } from '@/shared/providers/portal-provider';
import { useAnimation } from '@/shared/hooks/useAnimation';
import useMe from '@/shared/hooks/use-me';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
import SearchInput from '../Input/SearchInput';
import useIsMobile from '@/shared/hooks/useIsMobile';

export const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const isMobileSize = useIsMobile();
  const { isLoggedIn, logout } = useMe();
  const { changeSearchKeyword, searchInputValue } = useChangeRouter();
  const [shouldOpenMenu, animationOpenMenu, handleOpenMenuEnd] =
    useAnimation(isOpenMenu);
  const [shouldSearchOpen, animationSearchOpen, handleSearchOpenEnd] =
    useAnimation(isSearchOpen);

  useEffect(() => {
    setIsSearchOpen(!isMobileSize);
  }, [isMobileSize]);

  return (
    <>
      {shouldOpenMenu && (
        <Portal>
          <SideBarMenu
            setOpenMenu={setOpenMenu}
            logout={logout}
            animationOpenMenu={animationOpenMenu}
            handleOpenMenuEnd={handleOpenMenuEnd}
          />
        </Portal>
      )}
      <div className="sticky flex w-full flex-col items-start gap-[10px] bg-[#1C1C22] stroke-[#252530] stroke-[1px] px-[20px] py-[23px] md:px-[30px] xl:px-[120px]">
        <div className="flex w-full items-center justify-between py-[20px]">
          {isLoggedIn ? (
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="flex cursor-pointer items-center space-x-4 md:hidden"
            >
              <Image src={MenuIcon} alt="MenuIcon" width={24} height={24} />
            </button>
          ) : (
            <Link href="/signin" className="flex md:hidden">
              <button className="text-var-gray2 hover:text-var-white">
                <Image src="/me.svg" alt="로그인" width={24} height={24} />
              </button>
            </Link>
          )}
          <div
            className={`absolute left-[50%] ${isSearchOpen ? 'hidden' : 'flex'} -translate-x-1/2 md:relative md:left-0 md:flex md:-translate-x-0`}
          >
            <Link href="/">
              <Image src={LogoIcon} alt="LogoIcon" width={166} height={28} />
            </Link>
          </div>
          <div className="flex">
            <div
              className={`${shouldSearchOpen ? 'flex' : 'hidden'} absolute left-[50%] top-[50%] w-[70%] -translate-x-1/2 -translate-y-1/2 md:relative md:left-0 md:mr-[30px] md:-translate-x-0 md:-translate-y-0`}
            >
              <div
                onAnimationEnd={handleSearchOpenEnd}
                className={`w-full ${animationSearchOpen ? 'animate-slideDown' : 'animate-slideUp'}`}
              >
                <SearchInput
                  value={searchInputValue}
                  type="text"
                  onChange={changeSearchKeyword}
                  placeholder="상품 이름을 검색해 보세요"
                />
              </div>
            </div>
            <div className="hidden flex-shrink-0 items-center md:flex md:gap-[30px] xl:gap-[60px]">
              <Link
                href={isLoggedIn ? '/compare' : '/signin'}
                className="text-right font-sans text-[16px] font-normal text-white"
              >
                {isLoggedIn ? '비교하기' : '로그인'}
              </Link>
              <Link
                href={isLoggedIn ? '/mypage' : '/signup'}
                className="text-right font-sans text-[16px] font-normal text-white"
              >
                {isLoggedIn ? '내 프로필' : '회원가입'}
              </Link>
            </div>
          </div>
          <div className="flex md:hidden">
            <button onClick={() => setIsSearchOpen((prev) => !prev)}>
              <Image
                src={isSearchOpen ? closedIcon : searchIcon}
                alt={isSearchOpen ? 'closedIcon' : 'searchIcon'}
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
