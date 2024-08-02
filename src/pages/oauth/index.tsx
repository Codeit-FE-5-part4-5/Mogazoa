import { PropsWithChildren } from 'react';
import MogazoaLayout from '@/components/layout/App/MogazoaLayout';

const OAuthSignUp = ({ children }: PropsWithChildren) => {
  return (
    <MogazoaLayout>
      <div className="flex items-center justify-center px-[20px] py-[80px]">
        {children}
      </div>
    </MogazoaLayout>
  );
};

export default OAuthSignUp;
