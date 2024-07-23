import accessGoogle from '@/shared/utils/accessGoogle';
import { ReactNode } from 'react';

interface GoogleButtonProps {
  children: ReactNode;
  nickname?: string;
}
const GoogleButton = ({ children, nickname }: GoogleButtonProps) => {
  return (
    <button
      type="button"
      className="flex size-[56px] cursor-pointer items-center justify-center rounded-[50%] border border-var-black3"
      onClick={() => (nickname ? accessGoogle(nickname) : accessGoogle())}
    >
      {children}
    </button>
  );
};

export default GoogleButton;
