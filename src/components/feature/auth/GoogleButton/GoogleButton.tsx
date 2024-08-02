import { PropsWithChildren } from 'react';
import accessGoogle from '@/lib/auth/accessGoogle';

const GoogleButton = ({ children }: PropsWithChildren) => {
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
