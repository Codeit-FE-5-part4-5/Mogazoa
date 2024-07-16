import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LogoIcon from '@/../../public/images/logo.svg';
import MenuIcon from '@/../../public/images/menu.svg';
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import { Portal } from '@/shared/providers/portal-provider';
import useAnimation from '@/shared/hooks/useAnimation';
import useMe from '@/shared/store/use-me';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
import SearchInput from '../Input/SearchInput';
import useClickOutside from '@/shared/hooks/useClickOutside';
import useSearchRouter from '@/shared/hooks/useSearchRouter';

export const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const { isLoggedIn, logout } = useMe();
  const { currentPath } = useChangeRouter();
  const { onChangeSearchKeyword, initKeyword, searchKeyword } =
    useSearchRouter();
  const [shouldOpenMenu, animationOpenMenu, handleOpenMenuEnd] =
    useAnimation(isOpenMenu);
  const searchBarRef = useClickOutside<HTMLDivElement>(setIsSearchOpen);

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
      <div
        ref={searchBarRef}
        className="sticky flex w-full flex-col items-start gap-[10px] bg-[#1C1C22] stroke-[#252530] stroke-[1px] px-[20px] py-[23px] md:border-b md:border-var-black3 md:px-[30px] xl:px-[120px]"
      >
        <div className="flex w-full items-center justify-between py-[20px]">
          {isLoggedIn ? (
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="flex cursor-pointer items-center space-x-4 md:hidden"
            >
              <Image src={MenuIcon} alt="MenuIcon" width={24} height={24} />
            </button>
          ) : (
            <Link href="/signin" className="flex h-[42px] md:hidden">
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
          <div
            className={`${isSearchOpen && 'flex-1'} flex justify-end gap-[30px] xl:gap-[60px]`}
          >
            {currentPath.includes('signin') ||
            currentPath.includes('signup') ? null : (
              <SearchInput
                value={searchKeyword}
                type="text"
                onChange={onChangeSearchKeyword}
                initKeyword={initKeyword}
                isOpen={isSearchOpen}
                setOpen={setIsSearchOpen}
                placeholder="상품 이름을 검색해 보세요"
              />
            )}
            <div className="hidden flex-shrink-0 items-center text-right font-sans text-[16px] font-normal text-var-gray1 md:flex md:gap-[30px] xl:gap-[60px]">
              <Link
                href={isLoggedIn ? '/compare' : '/signin'}
                className="transition-colors duration-300 hover:text-var-gray2"
              >
                {isLoggedIn ? '비교하기' : '로그인'}
              </Link>
              <Link
                href={isLoggedIn ? '/mypage' : '/signup'}
                className="transition-colors duration-300 hover:text-var-gray2"
              >
                {isLoggedIn ? '내 프로필' : '회원가입'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
