import React, { useState } from 'react';

import useGetMe from '@/models/queries/auth/useGetMe';
import useAnimation from '@/hooks/useAnimation';
import useClickOutside from '@/hooks/useClickOutside';

import { Portal } from '@/components/shared';
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import NavAuthSection from './NavAuthSection';
import NavMenuSection from './NavMenuSection';

const Nav = () => {
  const { data: me } = useGetMe();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const searchBarRef = useClickOutside<HTMLDivElement>(setIsSearchOpen);
  const [shouldOpenMenu, animationOpenMenu, handleOpenMenuEnd] =
    useAnimation(isOpenMenu);

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
        className="sticky flex w-full flex-col items-start gap-[10px] bg-[#1C1C22] stroke-[#252530] stroke-[1px] px-[20px] py-[23px] md:border-b md:border-var-black3 md:px-[30px] xl:px-[120px]"
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
