import React, { useState } from 'react';
import { cn } from '@/lib/cn';

import useGetMe from '@/models/queries/auth/useGetMe';
import useAnimation from '@/hooks/useAnimation';

import useSticky from '@/hooks/useSticky';

import { Portal } from '@/components/shared';
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import NavAuthSection from './NavAuthSection';
import NavMenuSection from './NavMenuSection';

const Nav = () => {
  const { data: me } = useGetMe();
  const [isOpenSideBarMenu, setOpenSideBarMenu] = useState(false);
  const [shouldOpenMenu, animationOpenMenu, handleOpenMenuEnd] =
    useAnimation(isOpenSideBarMenu);
  const isSticky = useSticky();

  return (
    <>
      {shouldOpenMenu && (
        <Portal portalName="sideBar">
          <SideBarMenu
            setOpenMenu={setOpenSideBarMenu}
            animationOpenMenu={animationOpenMenu}
            handleOpenMenuEnd={handleOpenMenuEnd}
          />
        </Portal>
      )}
      <nav
        className={cn(
          'fixed flex w-full flex-col items-start gap-[10px] border-b border-b-[#1c1c22] bg-[#1C1C22]/90 px-[20px] py-[4px] backdrop-blur-xl transition-all duration-300 md:px-[30px] xl:px-[120px]',
          isSticky && 'z-50 border-b-var-black3',
          isSticky && 'bg-[#1c1c22]/80',
        )}
      >
        <div className="flex h-[66px] w-full items-center justify-between py-[20px]">
          <NavMenuSection
            me={me?.id}
            key={me?.id}
            setOpenSideBarMenu={setOpenSideBarMenu}
          />
          <NavAuthSection me={me?.id} key={me?.id} />
        </div>
      </nav>
    </>
  );
};

export default Nav;
