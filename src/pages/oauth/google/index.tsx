import { useEffect } from 'react';
import Button from '@/shared/components/Button/Button';
import NicknameInput from '@/shared/components/Input/NicknameInput';
import Spinner from '@/shared/components/Spinner/Spinner';
import useGoogleSignIn from '@/shared/models/auth/useGoogleSignIn';
import useGoogleSignUp from '@/shared/models/auth/useGoogleSignUp';
import useGoogleFlow from '@/shared/models/auth/useGoogleFlow';
import { validateArray } from '@/shared/utils/validateArray';
import { getCookie } from '@/shared/utils/cookie';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
import useEnvironmentVariable from '@/shared/hooks/useEnvironmentVariable';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { IAuthForm } from '@/pages/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import OAuthSignUp, { oAuthSchema } from '..';

const GoogleAuth = () => {
  const idToken = getCookie('idToken');
  const [redirectUri, clientId, clientSecret] =
    useEnvironmentVariable('google');
  const { currentQuery } = useChangeRouter();
  const { mutate: signInGoogle, error: signInError } = useGoogleSignIn();
  const { mutate: signUpGoogle } = useGoogleSignUp();
  const { mutate: flowGoogleAuth } = useGoogleFlow();
  const { code: token } = currentQuery;
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
    signUpGoogle(
      {
        nickname: data.nickname,
        token: idToken,
        redirectUri,
      },
      {
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            setError('nickname', {
              type: 'validateError',
              message: error?.response?.data.message,
            });
          }
        },
      },
    );
  };

  useEffect(() => {
    if (token) {
      flowGoogleAuth({
        redirectUri,
        clientId,
        clientSecret,
        token: validateArray(token),
      });
    }
  }, [token]);

  useEffect(() => {
    if (idToken) {
      signInGoogle({ token: idToken, redirectUri });
    }
  }, [idToken]);

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
        <Spinner isLoading />
      )}
    </OAuthSignUp>
  );
};

export default GoogleAuth;
