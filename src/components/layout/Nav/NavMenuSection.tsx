import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import { cn } from '@/lib/cn';

interface Props {
  me?: number;
  isSearchOpen: boolean;
  setOpenSideBarMenu: Dispatch<SetStateAction<boolean>>;
}

const NavMenuSection = ({ me, isSearchOpen, setOpenSideBarMenu }: Props) => {
  const [isLoggedIn] = useState(!!me);
  return (
    <>
      {isLoggedIn ? (
        <button
          type="button"
          onClick={() => setOpenSideBarMenu((prev) => !prev)}
          className="flex items-center space-x-4 md:hidden"
        >
          <Image src="/images/menu.svg" alt="MenuIcon" width={24} height={24} />
        </button>
      ) : (
        <button
          type="button"
          className="flex text-var-gray2 hover:text-var-white md:hidden"
          onClick={() => {
            window.location.href = '/signin';
          }}
        >
          <Image src="/me.svg" alt="로그인" width={24} height={24} />
        </button>
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
    </>
  );
};

export default NavMenuSection;