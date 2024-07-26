import accessGoogle from '@/shared/utils/accessGoogle';
import { ReactNode } from 'react';

interface GoogleButtonProps {
  children: ReactNode;
}

const GoogleButton = ({ children }: GoogleButtonProps) => {
  return (
    <button
      type="button"
      className="flex size-[56px] cursor-pointer items-center justify-center rounded-[50%] border border-var-black3"
      onClick={() => accessGoogle()}
    >
      {children}
    </button>
  );
};

export default GoogleButton;
