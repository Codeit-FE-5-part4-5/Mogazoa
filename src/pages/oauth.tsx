import MogazoaLayout from '@/shared/components/App/MogazoaLayout';
import Button from '@/shared/components/Button/Button';
import NicknameInput from '@/shared/components/Input/NicknameInput';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { IAuthForm } from './signup';
import { z } from 'zod';
import useAuthKakaoSignUp from '@/shared/models/auth/useAuthKakaoSignUp';
import { useEffect } from 'react';
import { getCookie } from '@/shared/utils/cookie';
import useAuthKakaoSignIn from '@/shared/models/auth/useAuthKakaoSignIn';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
/**
 *
 * @TODO
 * 1. 카카오 인가 코드 받기
 * 2. 그걸로 코드잇 서버에 토큰 받아오기
 * 3. 끗
 */

const oauthSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임을 입력해 주세요.')
    .max(10, '닉네임은 최대 10자 까지 가능합니다.'),
});

const OAuthSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<IAuthForm, 'nickname'>>({
    resolver: zodResolver(oauthSchema),
    mode: 'onBlur',
  });
  const { mutate: signUpKakao } = useAuthKakaoSignUp();
  const { mutate: signInKakao } = useAuthKakaoSignIn();
  const {
    currentQuery: { code },
  } = useChangeRouter();

  const handleSubmitSignUp = (data: Pick<IAuthForm, 'nickname'>) => {
    signUpKakao(data.nickname);
  };

  const handleSubmitSignIn = () => {
    signInKakao();
  };

  useEffect(() => {
    if (code) {
      handleSubmitSignIn();
    }
  }, [code]);

  return (
    <MogazoaLayout>
      <div className="flex items-center justify-center px-[20px] py-[80px]">
        <form
          onSubmit={handleSubmit(handleSubmitSignUp)}
          className="flex w-full flex-col gap-[40px] md:w-[440px] xl:w-[640px]"
        >
          <NicknameInput
            register={register('nickname')}
            error={errors.nickname}
            placeholder="닉네임을 입력해 주세요"
          />
          <Button text="가입하기" type="submit" className="mt-[20px]" />
          <Button
            text="로그인하기"
            type="button"
            onClick={() => signInKakao()}
            className="mt-[20px]"
          />
        </form>
      </div>
    </MogazoaLayout>
  );
};

export default OAuthSignUp;
