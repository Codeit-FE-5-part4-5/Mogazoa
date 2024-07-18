import { useEffect } from 'react';
import Button from '@/shared/components/Button/Button';
import NicknameInput from '@/shared/components/Input/NicknameInput';
import Spinner from '@/shared/components/Spinner/Spinner';
import useKakaoSignIn from '@/shared/models/auth/useKakaoSignIn';
import useKakaoSignUp from '@/shared/models/auth/useKakaoSignUp';
import { validateArray } from '@/shared/utils/validateArray';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
import useEnvironmentVariable from '@/shared/hooks/useEnvironmentVariable';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { IAuthForm } from '@/pages/signup';
import OAuthSignUp, { oAuthSchema } from '..';

const KakaoAuth = () => {
  const [redirectUri] = useEnvironmentVariable('kakao');
  const { currentQuery } = useChangeRouter();
  const { mutate: signInKakao, error: signInError } = useKakaoSignIn();
  const { mutate: signUpKakao, error: signUpError } = useKakaoSignUp();
  const { code } = currentQuery;
  const {
    register,
    handleSubmit,
    setError,
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

  useEffect(() => {
    if (axios.isAxiosError(signUpError))
      setError('nickname', {
        type: 'validateError',
        message: signUpError?.response?.data?.message,
      });
  }, [signUpError]);

  return (
    <OAuthSignUp>
      {axios.isAxiosError(signInError) &&
      signInError?.response?.status === 403 ? (
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
      ) : (
        <Spinner isLoading isTimeout={false} />
      )}
    </OAuthSignUp>
  );
};

export default KakaoAuth;
