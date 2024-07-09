import { useHexToRgb } from '@/shared/hooks/useHexToRgb';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

interface SideBarMenuProps {
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
}

export default function SideBarMenu({ setOpenMenu, logout }: SideBarMenuProps) {
  const [r, g, b] = useHexToRgb('#000000');
  return (
    <div
      className="fixed left-0 top-0 h-svh w-full animate-fadeIn bg-var-black1"
      style={{ backgroundColor: `rgba(${r},${g},${b}, 0.4)` }}
    >
      <div className="animate-slideRight size-full bg-var-black3">
        <button
          onClick={() => setOpenMenu(false)}
          className="absolute right-0 top-0 flex size-[80px] items-center justify-center"
        >
          <Image src="/close.svg" alt="닫기 버튼" width={28} height={28} />
        </button>
        <div className="flex flex-col gap-[40px] px-[48px] py-[150px] text-[28px] font-semibold text-var-gray1">
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
      </div>
    </div>
  );
}
