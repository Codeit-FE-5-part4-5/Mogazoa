import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

interface SideBarMenuProps {
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
  animationOpenMenu: boolean | ((arg: boolean) => void);
  handleOpenMenuEnd: () => void;
}

const SideBarMenu = ({
  setOpenMenu,
  logout,
  animationOpenMenu,
  handleOpenMenuEnd,
}: SideBarMenuProps) => {
  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-full">
      <div
        onAnimationEnd={handleOpenMenuEnd}
        className={`${animationOpenMenu ? 'animate-slideRight' : 'animate-slideLeft'} size-full bg-dark-gradient-custom`}
      >
        <button
          type="button"
          onClick={() => setOpenMenu(false)}
          className="absolute right-0 top-0 flex size-[80px] items-center justify-center"
        >
          <Image src="/close.svg" alt="닫기 버튼" width={28} height={28} />
        </button>
        <div className="flex size-full flex-col justify-between px-[48px] pb-[30px] pt-[150px] text-[28px] font-semibold text-var-gray1">
          <div className="flex flex-col gap-[40px]">
            <Link href="/compare">
              <button
                type="button"
                className="cursor-pointer transition-colors duration-300 hover:text-var-indigo"
              >
                비교하기
              </button>
            </Link>
            <Link href="/mypage">
              <button
                type="button"
                className="cursor-pointer bg-gradient-custom bg-clip-text text-transparent transition-colors duration-300 hover:text-var-gray2"
              >
                내 프로필
              </button>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="w-fit cursor-pointer transition-colors duration-300 hover:text-var-indigo"
            >
              로그아웃
            </button>
          </div>
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="LogoIcon"
              width={166}
              height={28}
            />
            <div className="mt-[10px] flex flex-col gap-[10px] text-[12px]">
              <h3>Made by SPRINT FE5 TEAM5</h3>
              <div className="flex gap-[8px] text-var-gray2">
                <p>김한샘</p>
                <p>박준영</p>
                <p>유호민</p>
                <p>임상훈</p>
                <p>이진욱</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBarMenu;
