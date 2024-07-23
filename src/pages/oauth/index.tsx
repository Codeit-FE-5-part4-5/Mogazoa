import { ReactNode } from 'react';
import MogazoaLayout from '@/shared/components/App/MogazoaLayout';
import { z } from 'zod';

export const oAuthSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임을 입력해 주세요.')
    .max(20, '닉네임은 최대 20자 까지 가능합니다.'),
});

interface OAuthSignUpProps {
  children: ReactNode;
}

const OAuthSignUp = ({ children }: OAuthSignUpProps) => {
  return (
    <MogazoaLayout>
      <div className="flex items-center justify-center px-[20px] py-[80px]">
        {children}
      </div>
    </MogazoaLayout>
  );
};

export default OAuthSignUp;
