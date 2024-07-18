import useChangeRouter from '@/shared/hooks/useChangeRouter';
import axios from '@/shared/utils/axios';
import { setCookie } from '@/shared/utils/cookie';
import { useMutation } from '@tanstack/react-query';

const kakaoSignUpRequest = (params: {
  nickname: string;
  token: string;
  redirectUri: string;
}) => {
  return axios.post(`auth/signUp/kakao`, params);
};

const useKakaoSignUp = () => {
  const { handleRedirect } = useChangeRouter();

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

export default useKakaoSignUp;
