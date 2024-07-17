import MogazoaLayout from '@/shared/components/App/MogazoaLayout';
import Button from '@/shared/components/Button/Button';
import NicknameInput from '@/shared/components/Input/NicknameInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IAuthForm } from './signup';
import { z } from 'zod';
import useKakaoSignUp from '@/shared/models/auth/useKakaoSignUp';
import { useEffect } from 'react';
import useKakaoSignIn from '@/shared/models/auth/useKakaoSignIn';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
import useGoogleSignIn from '@/shared/models/auth/useGoogleSignIn';
import axios from 'axios';

const oAuthSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임을 입력해 주세요.')
    .max(10, '닉네임은 최대 10자 까지 가능합니다.'),
});

const OAuthSignUp = () => {
  const redirectUri = process.env.NEXT_PUBLIC_DEVELOPMENT_URL;
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<IAuthForm, 'nickname'>>({
    resolver: zodResolver(oAuthSchema),
    mode: 'onBlur',
  });
  const { mutate: signUpKakao } = useKakaoSignUp();
  const { mutate: signInKakao } = useKakaoSignIn();
  const { mutate: signInGoogle } = useGoogleSignIn();
  const {
    currentQuery: { code },
  } = useChangeRouter();

  const handleSubmitSignUp = (data: Pick<IAuthForm, 'nickname'>) => {
    signUpKakao(data.nickname);
  };

  const googleSignInRequest = () => {
    return axios.post(
      `https://oauth2.googleapis.com/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirectUri}`,
    );
  };

  const handleSubmitSignIn = () => {
    // signInKakao();
    // signInGoogle();
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
            text="토큰받아오기"
            type="button"
            className="mt-[20px]"
            onClick={googleSignInRequest}
          />
        </form>
      </div>
    </MogazoaLayout>
  );
};

export default OAuthSignUp;
