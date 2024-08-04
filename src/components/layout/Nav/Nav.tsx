import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

import useGetMe from '@/models/queries/auth/useGetMe';
import useAnimation from '@/hooks/useAnimation';
import useClickOutside from '@/hooks/useClickOutside';

import { Portal } from '@/components/shared';
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import NavAuthSection from './NavAuthSection';
import NavMenuSection from './NavMenuSection';

const Nav = () => {
  const { pathname } = useRouter();
  const { data: me } = useGetMe();
  const [isSticky, setSticky] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const searchBarRef = useClickOutside<HTMLDivElement>(setIsSearchOpen);
  const [shouldOpenMenu, animationOpenMenu, handleOpenMenuEnd] =
    useAnimation(isOpenMenu);

  const handleNavigation = () => {
    setSticky(window.scrollY > 3);
  };

  useEffect(() => {
    const scrollEvent = setInterval(() => {
      window.addEventListener('scroll', handleNavigation);
    }, 100);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(scrollEvent);
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [pathname]);
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
      <nav
        ref={searchBarRef}
        className={cn(
          'fixed z-50 flex w-full flex-col items-start gap-[10px] border-b border-b-[#1c1c22] bg-[#1C1C22] px-[20px] py-[4px] transition-all duration-300 md:px-[30px] xl:px-[120px]',
          isSticky && 'border-b-var-black3',
        )}
      >
        <div className="flex h-[66px] w-full items-center justify-between py-[20px]">
          <NavMenuSection
            me={me}
            isSearchOpen={isSearchOpen}
            setOpenMenu={setOpenMenu}
          />
          <NavAuthSection
            me={me}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
          />
        </div>
      </nav>
    </>
  );
};

export default Nav;
