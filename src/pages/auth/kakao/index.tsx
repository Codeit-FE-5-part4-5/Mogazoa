import Button from '@/shared/components/Button/Button';
import NicknameInput from '@/shared/components/Input/NicknameInput';
import useKakaoSignIn from '@/shared/models/auth/useKakaoSignIn';
import useKakaoSignUp from '@/shared/models/auth/useKakaoSignUp';
import OAuthSignUp, { oAuthSchema } from '..';
import { useForm } from 'react-hook-form';
import { IAuthForm } from '@/pages/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
import { validateArray } from '@/shared/utils/validateArray';
import useEnvironmentVariable from '@/shared/hooks/useEnvironmentVariable';

const KakaoAuth = () => {
  const [redirectUri] = useEnvironmentVariable('kakao');
  const { currentQuery } = useChangeRouter();
  const { mutate: signUpKakao } = useKakaoSignUp();
  const { mutate: signInKakao } = useKakaoSignIn();
  const { code } = currentQuery;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<IAuthForm, 'nickname'>>({
    resolver: zodResolver(oAuthSchema),
    mode: 'onBlur',
  });

  const handleSubmitSignUp = (data: Pick<IAuthForm, 'nickname'>) => {
    signUpKakao({
      nickname: data.nickname,
      token: validateArray(code),
      redirectUri,
    });
  };

  useEffect(() => {
    if (code) {
      signInKakao({ token: validateArray(code), redirectUri });
    }
  }, [code]);

  return (
    <OAuthSignUp>
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
      </form>
    </OAuthSignUp>
  );
};

export default KakaoAuth;
