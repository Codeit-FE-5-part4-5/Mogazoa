import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { cn } from '@/lib/cn';

import { useIsMobile } from '@/hooks';
import { Me } from '@/types/user/user';

interface Props {
  me?: Me;
  isSearchOpen: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}

const NavMenuSection = ({ me, isSearchOpen, setOpenMenu }: Props) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && me ? (
        <button
          type="button"
          onClick={() => setOpenMenu((prev) => !prev)}
          className="flex cursor-pointer items-center space-x-4 md:hidden"
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
