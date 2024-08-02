import { PropsWithChildren } from 'react';
import accessKakao from '@/lib/auth/accessKakao';

interface Props {
  nickname?: string;
}

const KakaoButton = ({ children, nickname }: PropsWithChildren<Props>) => {
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
