import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

import Portal from '@/shared/components/Portal/Portal';
import useGetMe from '@/models/auth/useGetMe';
import useAnimation from '@/shared/hooks/useAnimation';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
import useClickOutside from '@/shared/hooks/useClickOutside';
import useSearchRouter from '@/shared/hooks/useSearchRouter';
import castArray from '@/shared/utils/castArray';
import SearchInput from '../Input/SearchInput';
import SideBarMenu from '../SideBarMenu/SideBarMenu';

const Header = () => {
  const { data: me } = useGetMe();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const { currentPath, currentQuery } = useChangeRouter();
  const { onChangeSearchKeyword, initKeyword, searchKeyword, searchQuery } =
    useSearchRouter();
  const [shouldOpenMenu, animationOpenMenu, handleOpenMenuEnd] =
    useAnimation(isOpenMenu);
  const searchBarRef = useClickOutside<HTMLDivElement>(setIsSearchOpen);

  return (
    <>
      {shouldOpenMenu && (
        <Portal portalName="sideBar">
          <SideBarMenu
            setOpenMenu={setOpenMenu}
            animationOpenMenu={animationOpenMenu}
            handleOpenMenuEnd={handleOpenMenuEnd}
          />
        </Portal>
      )}
      <div
        ref={searchBarRef}
        className="sticky flex w-full flex-col items-start gap-[10px] bg-[#1C1C22] stroke-[#252530] stroke-[1px] px-[20px] py-[23px] md:border-b md:border-var-black3 md:px-[30px] xl:px-[120px]"
      >
        <div className="flex h-[66px] w-full items-center justify-between py-[20px]">
          {me ? (
            <button
              type="button"
              onClick={() => setOpenMenu((prev) => !prev)}
              className="flex cursor-pointer items-center space-x-4 md:hidden"
            >
              <Image
                src="/images/menu.svg"
                alt="MenuIcon"
                width={24}
                height={24}
              />
            </button>
          ) : (
            <Link href="/signin" className="flex h-[42px] md:hidden">
              <button
                type="button"
                className="text-var-gray2 hover:text-var-white"
              >
                <Image src="/me.svg" alt="로그인" width={24} height={24} />
              </button>
            </Link>
          )}
          <div
            className={cn(
              'absolute left-[50%] -translate-x-1/2 md:relative md:left-0 md:flex md:-translate-x-0',
              isSearchOpen ? 'hidden' : 'flex',
            )}
          >
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="LogoIcon"
                width={166}
                height={28}
              />
            </Link>
          </div>
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
              <Link
                href={me ? '/compare' : '/signin'}
                className="transition-colors duration-300 hover:text-var-gray2"
              >
                {me ? '비교하기' : '로그인'}
              </Link>
              <Link
                href={me ? '/mypage' : '/signup'}
                className="transition-colors duration-300 hover:text-var-gray2"
              >
                {me ? '내 프로필' : '회원가입'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
