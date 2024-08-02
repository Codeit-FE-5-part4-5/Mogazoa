import useChangeRouter from '@/hooks/useChangeRouter';
import axios from '@/lib/axios';
import { setCookie } from '@/lib/cookie';
import { useMutation } from '@tanstack/react-query';

const signInRequest = (params: { email: string; password: string }) => {
  return axios.post(`auth/signIn`, params);
};

const useSignIn = () => {
  const { handleRedirect } = useChangeRouter();

  return useMutation({
    mutationFn: signInRequest,
    onSuccess: (data) => {
      setCookie('accessToken', data.data.accessToken, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      });
      handleRedirect('/');
    },
  });
};

export default useSignIn;
