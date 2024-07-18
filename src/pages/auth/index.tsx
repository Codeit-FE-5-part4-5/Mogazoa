import MogazoaLayout from '@/shared/components/App/MogazoaLayout';
import { z } from 'zod';
import { ReactNode } from 'react';

export const oAuthSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임을 입력해 주세요.')
    .max(10, '닉네임은 최대 10자 까지 가능합니다.'),
});

interface OAuthSignUp {
  children: ReactNode;
}

const OAuthSignUp = ({ children }: OAuthSignUp) => {
  return (
    <MogazoaLayout>
      <div className="flex items-center justify-center px-[20px] py-[80px]">
        {children}
      </div>
    </MogazoaLayout>
  );
};

export default OAuthSignUp;
