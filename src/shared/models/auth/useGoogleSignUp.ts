import useChangeRouter from '@/shared/hooks/useChangeRouter';
import axios from '@/shared/utils/axios';
import { setCookie } from '@/shared/utils/cookie';
import { useMutation } from '@tanstack/react-query';

const googleSignUpRequest = (params: {
  nickname: string;
  redirectUri: string;
  token: string;
}) => {
  return axios.post(`auth/signUp/google`, params);
};

const useGoogleSignUp = () => {
  const { handleRedirect } = useChangeRouter();

  return useMutation({
    mutationFn: googleSignUpRequest,
    onSuccess: (data) => {
      setCookie('accessToken', data.data.accessToken, {
        secure: process.env.NODE_ENV === 'production',
      });
      handleRedirect('/');
    },
  });
};

export default useGoogleSignUp;
