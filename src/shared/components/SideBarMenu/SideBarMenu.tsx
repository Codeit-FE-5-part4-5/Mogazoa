import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

interface SideBarMenuProps {
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
  animationTrigger: boolean | ((arg: boolean) => void);
  handleAnimationEnd: () => void;
}

export default function SideBarMenu({
  setOpenMenu,
  logout,
  animationTrigger,
  handleAnimationEnd,
}: SideBarMenuProps) {
  return (
    <div className={`fixed left-0 top-0 h-screen w-full`}>
      <div
        onAnimationEnd={handleAnimationEnd}
        className={`${animationTrigger ? 'animate-slideRight' : 'animate-slideLeft'} bg-dark-gradient-custom size-full`}
      >
        <button
          onClick={() => setOpenMenu(false)}
          className="absolute right-0 top-0 flex size-[80px] items-center justify-center"
        >
          <Image src="/close.svg" alt="닫기 버튼" width={28} height={28} />
        </button>
        <div className="flex size-full flex-col justify-between px-[48px] pb-[30px] pt-[150px] text-[28px] font-semibold text-var-gray1">
          <div className="flex flex-col gap-[40px]">
            <Link href="/compare">
              <button type="button" className="cursor-pointer">
                비교하기
              </button>
            </Link>
            <Link href="/mypage">
              <button
                type="button"
                className="cursor-pointer bg-gradient-custom bg-clip-text text-transparent"
              >
                내 프로필
              </button>
            </Link>
            <button onClick={logout} className="w-fit cursor-pointer">
              로그아웃
            </button>
          </div>
          <Link href="/">
            <Image
              src={'/images/logo.svg'}
              alt="LogoIcon"
              width={166}
              height={28}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
