import useChangeRouter from '@/shared/hooks/useChangeRouter';
import axios from '@/shared/utils/axios';
import { setCookie } from '@/shared/utils/cookie';
import { useMutation } from '@tanstack/react-query';

const kakaoSignInRequest = (params: { token: string; redirectUri: string }) => {
  return axios.post(`auth/signIn/kakao`, params);
};

const useKakaoSignIn = () => {
  const { handleRedirect } = useChangeRouter();

  return useMutation({
    mutationFn: kakaoSignInRequest,
    onSuccess: (data) => {
      setCookie('accessToken', data.data.accessToken, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      });
      handleRedirect('/');
    },
  });
};

export default useKakaoSignIn;
