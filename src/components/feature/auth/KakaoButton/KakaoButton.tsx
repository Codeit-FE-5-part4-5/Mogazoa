import { ReactNode } from 'react';
import accessKakao from '@/utils/accessKakao';

interface KakaoButtonProps {
  children: ReactNode;
  nickname?: string;
}

const KakaoButton = ({ children, nickname }: KakaoButtonProps) => {
  return (
    <button
      type="button"
      className="flex size-[56px] cursor-pointer items-center justify-center rounded-[50%] border border-var-black3"
      onClick={() => (nickname ? accessKakao(nickname) : accessKakao())}
    >
      {children}
    </button>
  );
};

export default KakaoButton;
