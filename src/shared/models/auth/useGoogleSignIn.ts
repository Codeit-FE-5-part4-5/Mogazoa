import useChangeRouter from '@/shared/hooks/useChangeRouter';
import axios from '@/shared/utils/axios';
import { removeCookie, setCookie } from '@/shared/utils/cookie';
import { useMutation } from '@tanstack/react-query';

const googleSignInRequest = (params: {
  redirectUri: string;
  token: string;
}) => {
  return axios.post(`auth/signIn/google`, params);
};

const useGoogleSignIn = () => {
  const { handleRedirect } = useChangeRouter();

  return useMutation({
    mutationFn: googleSignInRequest,
    onSuccess: (data) => {
      setCookie('accessToken', data.data.accessToken, {
        secure: process.env.NODE_ENV === 'production',
      });
      removeCookie('idToken');
      handleRedirect('/');
    },
  });
};

export default useGoogleSignIn;
