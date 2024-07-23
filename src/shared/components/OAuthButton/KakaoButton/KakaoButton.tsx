import accessKakao from '@/shared/utils/accessKakao';
import { ReactNode } from 'react';

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
