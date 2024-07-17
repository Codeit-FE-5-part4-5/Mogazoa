import useChangeRouter from '@/shared/hooks/useChangeRouter';
import axios from '@/shared/utils/axios';
import { setCookie } from '@/shared/utils/cookie';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

const useKakaoSignIn = () => {
  const { currentQuery, handleRedirect } = useChangeRouter();
  const { code: token } = currentQuery;
  const redirectUri = process.env.NEXT_PUBLIC_DEVELOPMENT_URL;

  const kakaoSignInRequest = useCallback(() => {
    return axios.post(`auth/signIn/kakao`, { redirectUri, token });
  }, [token]);

  return useMutation({
    mutationFn: kakaoSignInRequest,
    onSuccess: (data) => {
      setCookie('accessToken', data.data.accessToken, {
        secure: process.env.NODE_ENV === 'production',
      });
      handleRedirect('/');
    },
  });
};

export default useKakaoSignIn;
