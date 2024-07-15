import useChangeRouter from '@/shared/hooks/useChangeRouter';
import axios from '@/shared/utils/axios';
import { setCookie } from '@/shared/utils/cookie';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

const useAuthKakaoSignUp = () => {
  const { currentQuery, handleRedirect } = useChangeRouter();
  const { code: token } = currentQuery;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  const kakaoSignUpRequest = useCallback(
    (nickname: string) => {
      return axios.post(`auth/signup/kakao`, { nickname, redirectUri, token });
    },
    [token],
  );

  return useMutation({
    mutationFn: kakaoSignUpRequest,
    onSuccess: (data) => {
      setCookie('accessToken', data.data.accessToken, {
        secure: process.env.NODE_ENV === 'production',
      });
      handleRedirect('/');
    },
  });
};

export default useAuthKakaoSignUp;
